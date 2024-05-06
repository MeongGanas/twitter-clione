import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "@/components/layout/SidebarLogo";
import SidebarItem from "@/components/layout/SidebarItem";
import SidebarTweetButton from "@/components/layout/SidebarTweetButton";
import LoginDialog from "./LoginDialog";
import { signOut } from "next-auth/react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Sidebar() {
  const { data: user } = useCurrentUser();

  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
    },
    {
      label: "Profile",
      href: user ? `/users/${user.id}` : "",
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full px-4 md:px-6">
      <div className="flex flex-col items-end sticky top-0">
        <div className="space-y-2 w-full">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              auth={item.auth}
            />
          ))}

          {!user && (
            <LoginDialog isFull>
              <SidebarItem onClick={() => {}} icon={BiLogIn} label="Login" />
            </LoginDialog>
          )}

          {user && (
            <>
              <SidebarItem label={"Logout"} icon={BiLogOut} onClick={signOut} />
              <SidebarTweetButton />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
