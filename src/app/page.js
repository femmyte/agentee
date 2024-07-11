import Google from "@/components/common/buttons/Google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Registration = () => {
  return (
    <div className="grid grid-cols-2  py-[3.47rem] px-[2.8rem]  bg-white">
      <div className="col-span-1 w-full flex justify-center items-center">
        <div className="flex flex-col  w-[27.6rem]">
          <div>
            <Image src={"/images/logo.svg"} width={98} height={17}></Image>
          </div>
          <div className="mt-[2.5rem]">
            <h1 className="font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem]">
              Register
            </h1>
            <p className="font-[500] text-[1rem] leading-[140%] text-[#89898A]">
              Making House Renting Hassle-Free
            </p>
          </div>
          <div className="mt-[2.5rem] mb-[1rem]">
            <div className=" mb-[1rem]">
              <label
                htmlFor="full_name"
                className="font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]"
              >
                Full name
              </label>
              <input
                type="text"
                className="border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full"
                placeholder="Enter your full name"
                id="full_name"
              ></input>
            </div>
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
            <div className=" mb-[1rem]">
              <label
                htmlFor="phone_number"
                className="font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]"
              >
                Phone Number
              </label>
              <input
                type="tel"
                className="border border-[#E9E9EB] bg-white rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] text-[#89898A] w-full"
                placeholder="Enter your Phone Number"
                id="phone_number"
              ></input>
            </div>
            <div className=" mb-[1rem]">
              <label
                htmlFor="Password"
                className="font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]"
              >
                Password
              </label>
              <div className="flex justify-between w-full gap-x-2 border border-[#E9E9EB] bg-white">
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
                htmlFor="c_Password"
                className="font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]"
              >
                Password
              </label>
              <div className="flex justify-between w-full gap-x-2 border border-[#E9E9EB] bg-white">
                <input
                  type="password"
                  className="  rounded-[0.375rem] p-[0.75rem] h-[2.375rem] font-[400] text-0.875rem] leading-[1.225rem] w-full text-[#89898A] "
                  placeholder="Enter your Password"
                  id="c_Password"
                />
                <Image
                  src={"/images/icons/eye.svg"}
                  width={20}
                  height={20}
                  className="mr-1"
                />
              </div>
            </div>
            <div className="flex gap-x-2 mt-[2rem]">
              <input
                type="checkbox"
                className="w-4 h-4 border border-[#E9E9EB]"
                id="remember_me"
              />
              <label
                htmlFor="remember_me"
                className="font-[500] text-[0.875rem] leading-[1.225rem] mb-[0.25rem] text-[#202020]"
              >
                Remember me
              </label>
            </div>
            <div className="mt-[1.5rem]">
              <Link
                href={"/signin"}
                className="flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white"
              >
                Sign up
              </Link>
            </div>
            <Google text={"Sign in with Google"} />
          </div>
          <div className="flex justify-center gap-1">
            <span className="font-[500] text-[0.875rem] leading-[1.225rem] text-[#89898A] ">
              Already have an account?
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
      <div className="col-span-1">
        <img src={"/images/house1.png"} alt="house " className=" w-[41rem]" />
      </div>
    </div>
  );
};

export default Registration;
