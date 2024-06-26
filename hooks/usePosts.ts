import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function usePosts(userId?: string) {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
