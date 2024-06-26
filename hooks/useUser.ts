import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function useUser(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/users/${userId}` : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
