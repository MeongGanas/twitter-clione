import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import toast from "react-hot-toast";
import axios from "axios";

export default function useLike({
  userId,
  postId,
}: {
  userId?: string;
  postId: string;
}) {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser.id);
  }, [currentUser, fetchedPost?.likedIds]);

  const toggleLike = useCallback(async () => {
    try {
      let request;

      if (hasLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      if (hasLiked) {
        toast.success("Unliked");
      } else {
        toast.success("Liked");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  }, [currentUser, postId, hasLiked, mutateFetchedPost, mutateFetchedPosts]);

  return {
    hasLiked,
    toggleLike,
  };
}
