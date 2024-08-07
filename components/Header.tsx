"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

export default function Header({ label, showBackArrow }: HeaderProps) {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] sticky top-0 bg-black z-[10] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            color="white"
            size={18}
            className="cursor-pointer hover:opacity-70 duration"
          />
        )}
        <h1 className="text-white font-semibold">{label}</h1>
      </div>
    </div>
  );
}
