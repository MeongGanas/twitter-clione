import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import PostForm from "@/components/posts/PostForm";

export default function Home() {
  return (
    <div className="text-white">
      <Header label="Home" />
      <PostForm placeholder="What's happening?" />
      <PostFeed />
    </div>
  );
}
