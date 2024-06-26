import React from "react";
import FollowBar from "./FollowBar";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black">
      <div className="container h-full">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="min-h-screen col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
}
