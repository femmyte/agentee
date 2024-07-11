import Image from "next/image";
import Link from "next/link";
import React from "react";

const Google = ({ text }) => {
  return (
    <div className="mt-[1rem]">
      <Link
        href={"/signin"}
        className="flex items-center gap-2 justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] border border-[#E9E9EB] text-[#202020]"
      >
        <Image src={"/images/icons/google.svg"} width={18} height={18} />{" "}
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default Google;
