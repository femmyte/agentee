import React from "react";
import Nav from "../Nav";
import Image from "next/image";
import Link from "next/link";

const WhoAreYou = () => {
  return (
    <div className="h-screen bg-[#F8F9FB] overflow-x-hidden">
      <Nav link={"/confirmation"} />
      <section className="flex items-center justify-center py-[3rem]">
        <div className=" w-[40rem]">
          <article className="mb-[1rem]">
            <h1 className="font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center ">
              Who Are You?
            </h1>
          </article>
          <div className="flex justify-center w-full">
            <Image
              src={"/images/illustrations/who_are_you.svg"}
              width={114}
              height={118}
            ></Image>
          </div>
          <div className="flex flex-col md:flex-row gap-y-10 md:gap-y-0 justify-between w-full mt-[4.1rem]">
            <div className="flex flex-col items-center justify-center">
              <div className="h-[12.5rem] w-[187px] relative">
                <Image src={"/images/illustrations/agent.svg"} fill />
              </div>
              <div className="mt-4 flex gap-x-2">
                <input type="radio" name="userType" id="agent" />
                <label htmlFor="agent" className="text-black">
                  Agent
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="h-[12.5rem] w-[187px] relative">
                <Image src={"/images/illustrations/Tenant.svg"} fill />
              </div>
              <div className="mt-4 flex gap-2">
                <input type="radio" name="userType" id="tenant" />
                <label htmlFor="tenant" className="text-black">
                  Tenant
                </label>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="h-[12.5rem] w-[187px] relative">
                <Image src={"/images/illustrations/landlord.svg"} fill />
              </div>
              <div className="mt-4 flex gap-2">
                <input type="radio" name="userType" id="landlord" />
                <label htmlFor="landlord" className="text-black">
                  Landlord
                </label>
              </div>
            </div>
          </div>
          <div className="mt-[3.43rem] flex justify-center md:justify-end gap-x-[0.75rem]">
            <Link
              href={"/welcome"}
              className="flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-transparent border border-[#E9E9EB] text-black"
            >
              Back
            </Link>
            <Link
              href={"#"}
              className="flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white hover:bg-secondaryBlue"
            >
              Next
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoAreYou;
