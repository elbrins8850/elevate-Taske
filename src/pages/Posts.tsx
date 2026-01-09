import { useState, useEffect } from "react"
import { getPosts } from "@/api/posts.api"
import { Post } from "@/Types/Type";
import PostCard from "@/components/Posts/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";

const POSTS_PER_PAGE = 4;
const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>('');
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getPosts();
            setPosts(response.data.posts);
            setFilteredPosts(response.data.posts);
            setCurrentPage(1);
        } catch (err) {
            setError("Failed to fetch posts. Please try again. " + err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();

    }, [])
    useEffect(() => {
        const filtered = posts.filter(
            (post) =>
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.body.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredPosts(filtered);
        setCurrentPage(1);
    }, [search, posts]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return (
        <div className="p-4 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <Button variant="outline" onClick={fetchPosts}>
                Reload Agin
            </Button>
        </div>
    )
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    return (

        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Posts</h1>
                <div className="icon-btn">

                    <Link to="/posts/create">
                        <Button>Create Post</Button>
                    </Link>
                    <Button variant="outline" onClick={fetchPosts} className="reload">
                        <FiRefreshCw size={20} />
                    </Button>
                </div>
            </div>
            <div className="flex justify-end mb-4">
                <Input
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className=" input-home"
                />

            </div>
            {currentPosts.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">No posts found</p>
            ) : ''}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 posts-container">
                {currentPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2 flex-wrap">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Back
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Posts
