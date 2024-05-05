import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface UserAvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

export default function UserAvatar({
  userId,
  isLarge,
  hasBorder,
}: UserAvatarProps) {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;

      router.push(url);
    },
    [router, userId]
  );

  return (
    <Avatar
      className={`hover:opacity-90 cursor-pointer transition ${
        isLarge ? "w-24 h-24" : "w-12 h-12"
      }`}
      onClick={onClick}
    >
      <AvatarImage
        className="rounded-full bg-neutral-400"
        src={fetchedUser?.profileImage}
      />
      <AvatarFallback>
        <Image
          fill
          src={"/images/placeholder.jpg"}
          sizes="auto"
          priority
          alt="Avatar"
        />
      </AvatarFallback>
    </Avatar>
  );
}
