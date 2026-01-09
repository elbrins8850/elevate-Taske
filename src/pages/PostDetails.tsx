import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "@/api/posts.api";
import { Post } from "@/Types/Type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        getPostById(id).then((res) => {
            setPost(res.data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Button
                variant="ghost"
                className="mb-4"
                onClick={() => navigate(-1)}
            >
                ← Back
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">
                        {post.title}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                        {post.body}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
