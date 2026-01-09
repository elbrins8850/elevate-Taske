import { Post } from "@/Types/Type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
    post: Post;
};


toast.success("🗑️ Post deleted successfully");
toast.success("✏️ Post updated successfully");
export default function PostCard({ post }: Props) {
    const navigate = useNavigate();
    return (
        <Card className="post-card">
            <CardHeader className="w-full">
                <CardTitle className="text-lg ">
                    {post.title}
                </CardTitle>
            </CardHeader>

        
            <CardContent className="">
                <Button
                    variant="outline"
                    className="self-start bg-sky-500 hover:bg-sky-700"
                    onClick={() => navigate(`/posts/${post.id}`)}
                >
                    Read More
                </Button>
            </CardContent>
          
        </Card>
    );
}
