import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import LoginDialog from "./LoginDialog";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

export default function SidebarItem({
  href,
  label,
  icon: Icon,
  onClick,
  auth,
  alert,
}: SidebarItemProps) {
  const router = useRouter();

  const { data: currentUser } = useCurrentUser();
  const disabled = !currentUser && auth;

  const handleClick = () => {
    if (onClick && !disabled) {
      return onClick();
    }

    if (href && !disabled) {
      router.push(href);
    }
  };

  return (
    <>
      {disabled ? (
        <LoginDialog isFull>
          <div className="flex flex-row items-center justify-center">
            <div
              className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer transition lg:hidden"
              onClick={handleClick}
            >
              <Icon size={18} color="white" />
            </div>
            <div
              className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center w-full transition"
              onClick={handleClick}
            >
              <Icon size={18} color="white" />
              <p className="hidden lg:block text-white">{label}</p>
            </div>
          </div>
        </LoginDialog>
      ) : (
        <div className="flex flex-row items-center justify-center">
          <div
            className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer transition lg:hidden"
            onClick={handleClick}
          >
            <Icon size={18} color="white" />
            {alert ? (
              <BsDot
                className="text-sky-500 absolute -top-4 left-4"
                size={50}
              />
            ) : null}
          </div>
          <div
            className="relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer items-center w-full transition"
            onClick={handleClick}
          >
            <Icon size={18} color="white" />
            <p className="hidden lg:block text-white">{label}</p>
            {alert ? (
              <BsDot
                className="text-sky-500 absolute -top-4 left-1"
                size={60}
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
