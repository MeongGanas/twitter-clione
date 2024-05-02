import { useRouter } from "next/navigation";
import { FaFeather } from "react-icons/fa";

export default function SidebarTweetButton() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="flex items-center justify-center"
    >
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 cursor-pointer transition">
        <FaFeather size={18} color="white" />
      </div>
      <div className="mt-6 hidden lg:block w-full rounded-full px-4 py-3 items-center justify-center bg-sky-500 hover:bg-opacity-80 cursor-pointer transition">
        <p className="hidden lg:block font-semibold text-center text-white">
          Tweet
        </p>
      </div>
    </div>
  );
}
