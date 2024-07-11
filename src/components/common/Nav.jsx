import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
const Nav = () => {
  return (
    <div className="flex w-screen pt-4 pr-[3.4375rem] pb-4 pl-[0.625rem] justify-between items-start bg-white">
      <div className="flex items-center gap-x-3">
        <FaChevronLeft className=" text-primary" />
        <span className=" text-primary">Back</span>
      </div>
      <div className=" basis-[55%]">
        <Link href={"/"}>
          <Image src={"/images/logo.svg"} width={98} height={17}></Image>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
