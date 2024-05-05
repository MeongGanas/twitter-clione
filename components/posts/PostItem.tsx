import useCurrentUser from "@/hooks/useCurrentUser";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import UserAvatar from "../UserAvatar";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import LoginDialog from "../layout/LoginDialog";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}
export default function PostItem({ data, userId }: PostItemProps) {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const onLike = useCallback((event: any) => {
    event.stopPropagation();
  }, []);

  return (
    <div
      className="border-b border-neutral-800 cursor-pointer hover:bg-neutral-800 transition p-5"
      onClick={goToPost}
    >
      <div className="flex flex-row items-start gap-3">
        <UserAvatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              className="text-white font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {data.user.name}
            </p>
            <span
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
              onClick={goToUser}
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={18} />
              <p>{data.comments?.length || 0}</p>
            </div>

            {!currentUser ? (
              <div onClick={(event) => event.stopPropagation()}>
                <LoginDialog>
                  <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                    <AiOutlineHeart size={18} />
                    <p>{data.likes?.length || 0}</p>
                  </div>
                </LoginDialog>
              </div>
            ) : (
              <div
                className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
                onClick={onLike}
              >
                <AiOutlineHeart size={18} />
                <p>{data.likes?.length || 0}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
