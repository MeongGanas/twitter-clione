import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import Form from "@/components/posts/Form";

export default function Home() {
  return (
    <div className="text-white">
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </div>
  );
}
