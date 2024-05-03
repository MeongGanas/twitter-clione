"use client";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "@/components/layout/SidebarLogo";
import SidebarItem from "@/components/layout/SidebarItem";
import SidebarTweetButton from "@/components/layout/SidebarTweetButton";
import LoginDialog from "./LoginDialog";
import { signOut, useSession } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";

export default function Sidebar() {
  const user = useSession();

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
    },
    {
      label: "Profile",
      href: "/user/123",
      icon: FaUser,
    },
  ];

  return (
    <div className="col-span-1 h-full px-4 md:px-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 w-full">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
            />
          ))}

          {!user.data && <LoginDialog />}

          {user.data && (
            <SidebarItem label={"Logout"} icon={BiLogOut} onClick={signOut} />
          )}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
}
