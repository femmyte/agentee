import Nav from "@/components/common/Nav";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Confirmation = () => {
  return (
    <div className="h-screen bg-[#F8F9FB] ">
      <Nav />
      <div className="flex justify-center bg-[#F8F9FB]  items-center h-[90vh] overflow-y-hidden">
        <div
          className="flex flex-col  w-[27.625rem] p-8  rounded-[1rem] bg-white "
          style={{
            boxShadow:
              "0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 6px 0px rgba(0, 0, 0, 0.10);",
          }}
        >
          <div className="flex justify-center w-full">
            <Image
              src={"/images/illustrations/envelope.svg"}
              width={200}
              height={131}
            ></Image>
          </div>
          <div className="mt-[4rem]">
            <h1 className="font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center">
              Security link has been sent to your mail
            </h1>
            <p className="font-[500] text-[1rem] leading-[140%] text-[#89898A] text-center">
              Hurry up! This link is valid for 30 minutes
            </p>
          </div>
          <div className="mt-[2.5rem] ">
            <div className="mt-[1.5rem]">
              <Link
                href={"/signin"}
                className="flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white"
              >
                Back to log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
