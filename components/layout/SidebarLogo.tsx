import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";

export default function SidebarLogo() {
  const router = useRouter();

  return (
    <div className="flex justify-center lg:justify-start">
      <div
        className="rounded-full h-14 w-14 p-4 flex justify-center items-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition"
        onClick={() => router.push("/")}
      >
        <BsTwitter size={28} color="white" />
      </div>
    </div>
  );
}
