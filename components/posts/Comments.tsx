import CommentItem from "./CommentItem";

export default function Comments({ data }: { data: Record<string, any> }) {
  return (
    <>
      {data?.comments.map((comment: Record<string, any>) => (
        <CommentItem data={comment} key={comment.id} />
      ))}
    </>
  );
}
