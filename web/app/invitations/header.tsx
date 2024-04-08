"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
// types
import { IUser } from "@plane/types";
// assets
import BlackHorizontalLogo from "public/plane-logos/black-horizontal-with-blue-logo.svg";
import WhiteHorizontalLogo from "public/plane-logos/white-horizontal-with-blue-logo.svg";

type InvitationsHeaderProps = {
  currentUser: IUser | null;
};

export const InvitationsHeader = (props: InvitationsHeaderProps) => {
  const { currentUser } = props;
  // next-themes
  const { theme } = useTheme();
  // derived values
  const logo = theme === "light" ? BlackHorizontalLogo : WhiteHorizontalLogo;
  return (
    <div className="relative h-1/6 flex-shrink-0 sm:w-2/12 md:w-3/12 lg:w-1/5">
      <div className="absolute left-0 top-1/2 h-[0.5px] w-full -translate-y-1/2 border-b-[0.5px] border-custom-border-200 sm:left-1/2 sm:top-0 sm:h-screen sm:w-[0.5px] sm:-translate-x-1/2 sm:translate-y-0 sm:border-r-[0.5px] md:left-1/3" />
      <div className="absolute left-5 top-1/2 grid -translate-y-1/2 place-items-center bg-custom-background-100 px-3 sm:left-1/2 sm:top-12 sm:-translate-x-[15px] sm:translate-y-0 sm:px-0 sm:py-5 md:left-1/3">
        <div className="h-[30px] w-[133px]">
          <Image src={logo} alt="Plane white logo" />
        </div>
      </div>
      <div className="absolute right-4 top-1/4 -translate-y-1/2 text-sm text-custom-text-100 sm:fixed sm:right-16 sm:top-12 sm:translate-y-0 sm:py-5">
        {currentUser?.email}
      </div>
    </div>
  );
};
