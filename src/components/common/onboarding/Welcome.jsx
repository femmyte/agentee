import React from "react";
import Nav from "../Nav";
import Image from "next/image";
import Link from "next/link";

const Welcome = () => {
  return (
    <div className=" bg-[#F8F9FB] overflow-x-hidden">
      <Nav link={"/signin"} />
      <section className="flex items-center justify-center py-[3rem]">
        <div className=" w-[40rem]">
          <article className="mb-[2.84rem] px-3">
            <h1 className="font-[500] text-[1.75rem] leading-[2.45rem] text-[#202020] mb-[0.5rem] text-center ">
              Welcome
            </h1>
            <p className="font-[500] text-[1rem] leading-[140%] text-[#202020] text-center">
              Connecting Agents and Tenants Seamlessly
            </p>
            <p className="font-[500] text-[1rem] leading-[140%] text-[#89898A] text-center mt-[0.96rem]">
              Welcome to XYZ, the ultimate platform designed to connect agents
              with tenants seeking their perfect home. Our website simplifies
              the rental process by providing an easy-to-use interface where
              tenants can browse listings, view property videos, and schedule
              inspections, all in one place. XYZ makes the experience
              hassle-free and efficient, bringing you one step closer to finding
              or renting out the perfect home.
            </p>
          </article>
          <div className="flex justify-center w-full">
            <Image
              src={"/images/illustrations/welcome-big.svg"}
              width={510}
              height={300}
            ></Image>
          </div>
          <div className="mt-[3.22rem] flex justify-end">
            <Link
              href={"/who-are-you"}
              className="flex items-center justify-center py-[0.625rem] px-[1.25rem] rounded-[0.375rem] bg-[#2C71F6] text-white  hover:bg-secondaryBlue"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
