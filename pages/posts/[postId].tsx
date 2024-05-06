import Header from "@/components/Header";
import Comments from "@/components/posts/Comments";
import Form from "@/components/posts/Form";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

export default function PostView() {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="lightblue" size={40} />
      </div>
    );
  }

  return (
    <div>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        placeholder="Tweet your reply"
        isComment
      />
      <Comments data={fetchedPost} />
    </div>
  );
}
