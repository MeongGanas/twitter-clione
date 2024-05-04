import useUser from "@/hooks/useUser";
import Image from "next/image";
import UserAvatar from "../UserAvatar";

export default function UserHero({ userId }: { userId: string }) {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-12 left-4">
          <UserAvatar userId={userId} isLarge />
        </div>
      </div>
    </div>
  );
}
