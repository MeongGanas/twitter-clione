import { useRouter } from "next/navigation";
import UserAvatar from "../UserAvatar";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

export default function CommentItem({ data }: { data: Record<string, any> }) {
  const router = useRouter();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data?.user?.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div className="border-b border-neutral-800 cursor-pointer hover:bg-neutral-800 transition p-5">
      <div className="flex flex-row items-start gap-3">
        <UserAvatar userId={data?.user?.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              className="text-white font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {data?.user?.name}
            </p>
            <span
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
              onClick={goToUser}
            >
              @{data?.user?.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data?.body}</div>
        </div>
      </div>
    </div>
  );
}
