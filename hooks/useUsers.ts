import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function useUsers() {
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
