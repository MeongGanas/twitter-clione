import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
export default function UserView() {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="ligthblue" size={40} />
      </div>
    );
  }

  return (
    <div>
      <Header showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </div>
  );
}
