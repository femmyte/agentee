import Nav from "@/components/common/Nav";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ResetPassword = () => {
  return (
    <div className="h-screen bg-[#F8F9FB] ">
      <Nav />
      <div className="flex justify-center bg-[#F8F9FB] h-[90vh] items-center">
        <div
          className="flex flex-col  w-[27.625rem] p-8  rounded-[1rem] bg-white "
          style={{
            boxShadow:
              "0px 2px 4px 0px rgba(0, 0, 0, 0.06), 0px 4px 6px 0px rgba(0, 0, 0, 0.10);",
          }}
        >
          <div className="flex justify-center w-full">
            <Image
              src={"/images/illustrations/forgot_password.svg"}
              width={200}
              height={131}
            ></Image>
          </div>
          <div className="mt-[4rem]">
            <h1 className="font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center">
              Reset your password
            </h1>
            <p className="font-[500] text-[1rem] leading-[140%] text-[#89898A] text-center">
              We will send a link to your email to reset the password to your
              account
            </p>
          </div>
          <div className="mt-[2.5rem] mb-[1rem]">
            <div className=" mb-[1rem]">
              <label
                htmlFor="email"
                className="font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]"
              >
                Email
              </label>
              <input
                type="email"
                className="border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full"
                placeholder="Enter your email"
                id="email"
              ></input>
            </div>

            <div className="mt-[1.5rem]">
              <Link
                href={"/confirmation"}
                className="flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white"
              >
                Reset Password
              </Link>
            </div>
            <div className="flex justify-center gap-1 mt-4">
              <span className="font-[500] text-[0.875rem] leading-[1.225rem] text-[#89898A] ">
                Remembered your account?
              </span>
              {"  "}
              <Link
                href={"/signin"}
                className="font-[500] text-[0.875rem] leading-[1.225rem] text-primary "
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
