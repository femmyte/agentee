import Nav from "@/components/common/Nav";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ChangePassword = () => {
  return (
    <div className="h-screen bg-[#F8F9FB] ">
      <Nav />
      <div className="flex justify-center  h-[90%] items-center">
        <div
          className="flex flex-col  w-[27.625rem] p-8  rounded-[1rem] bg-white "
          style={{
            boxShadow:
              "0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 6px 0px rgba(0, 0, 0, 0.10);",
          }}
        >
          <div className="flex justify-center w-full">
            <Image
              src={"/images/illustrations/signup.svg"}
              width={200}
              height={131}
            ></Image>
          </div>
          <div className="mt-[4rem]">
            <h1 className="font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center">
              Change Password
            </h1>
            <p className="font-[500] text-[1rem] leading-[140%] text-[#89898A] text-center">
              Enter a new Password below to change password
            </p>
          </div>
          <div className="mt-[2.5rem] mb-[1rem]">
            <div className=" mb-[1rem]">
              <label
                htmlFor="Password"
                className="font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]"
              >
                Password
              </label>
              <div className="flex justify-between w-full gap-x-2 border border-[#E9E9EB] bg-white rounded-[0.375rem]">
                <input
                  type="password"
                  className="  rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] w-full text-[#89898A] "
                  placeholder="Enter your Password"
                  id="Password"
                />
                <Image
                  src={"/images/icons/eye.svg"}
                  width={20}
                  height={20}
                  className="mr-1"
                />
              </div>
            </div>
            <div className=" mb-[1rem]">
              <label
                htmlFor="c_password"
                className="font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]"
              >
                Confirm Password
              </label>
              <div className="flex justify-between w-full gap-x-2 border border-[#E9E9EB] bg-white rounded-[0.375rem]">
                <input
                  type="password"
                  className="  rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] w-full text-[#89898A] "
                  placeholder="Enter your Confirm Password"
                  id="c_password"
                />
                <Image
                  src={"/images/icons/eye.svg"}
                  width={20}
                  height={20}
                  className="mr-1"
                />
              </div>
            </div>

            <div className="mt-[1.5rem]">
              <Link
                href={"/signin"}
                className="flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
