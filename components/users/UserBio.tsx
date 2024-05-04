import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useMemo } from "react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { BiCalendar } from "react-icons/bi";
import EditDialog from "./EditDialog";

export default function UserBio({ userId }: { userId: string }) {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="border-b border-b-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <EditDialog />
        ) : (
          <Button className="rounded-full w-20" onClick={() => {}}>
            Follow
          </Button>
        )}
      </div>
      <div className="mt-4 px-4">
        <div className="flex flex-col">
          <p className="text-white text-xl font-semibold">
            {fetchedUser?.name}
          </p>
          <p className="text-neutral-500">@{fetchedUser?.username}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-400">
            <BiCalendar />
            <p>Joined {createdAt}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center mt-4 gap-6 px-4">
        <div className="flex flex-row items-center gap-1">
          <p>{fetchedUser?.followingIds?.length}</p>
          <p className="text-neutral-500">Following</p>
        </div>
        <div className="flex flex-row items-center gap-1">
          <p>{fetchedUser?.followersCount || 0}</p>
          <p className="text-neutral-500">Followers</p>
        </div>
      </div>
    </div>
  );
}
