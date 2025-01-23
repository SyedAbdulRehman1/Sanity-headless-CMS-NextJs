"use client";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  const [isScrolled, setIsScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous) {
      if (latest > previous && latest > 30) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
    setIsScrolled(latest > 320);
  });
  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-200%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0   z-[100] left-0 right-0`}
    >
      <div
        className="flex items-center  w-full "
        // data-aos="fade-down"
        // data-aos-delay="2000"
        // data-aos-duration="1500"
      >
        <div
          className={` py-2 lg:py-[9px]   lg:max-h-[78px]  lg:px-6 justify-between flex flex-wrap items-center px-4   w-full group  shrink-0 transition-colors duration-200 ease-in 
         "bg-primary-extradark-main"
    ${"bg-primary-extradark-main"} border-[rgba(255,255,255,0.1)] navbar-backdrop-filter  `}
        >
          <div className="flex gap-8 items-center">
            <a href={"/"}>
              <Image
                src="/main-logo.png"
                alt="main logo"
                width={40}
                height={28.84}
                className="lg:h-[28.84px] w-[40px] h-[22.6px]"
              />
            </a>
              {/* <Link href={"/"} className={`menu-text hover:text-[#499A16]`}>
                Home
              </Link> */}
            <div className=" block vertical-line-green"></div>

            <div className="items-center justify-between  gap-8 text-black flex">
            <Link href={"/"} className={`menu-text hover:text-[#499A16]`}>
                Home
              </Link>
            </div>
            <div className="items-center justify-between  gap-8 text-black flex">
              <Link href={"/blog"} className={`menu-text hover:text-[#499A16]`}>
                Blogs
              </Link>
            </div>
            <div className="items-center justify-between  gap-8 text-black flex">
              <Link href={"/article"} className={`menu-text hover:text-[#499A16]`}>
                News
              </Link>
            </div>
          </div>

          <div className="items-center  py-1 gap-8 flex">
            <div className="flex gap-5 items-center"></div>
          </div>
        </div>
      </div>
    </motion.div>
    // <header className=" flex items-center justify-between xs:flex-row py-2 border-b-2 border-accentDarkSecondary sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
    //   <nav className=" flex md:flex md:items-center md:justify-center md:gap-x-24 font-bold uppercase">
    //     <Link href={"/"} className="text-3xl text-dark dark:text-light">
    //       DEV<span className="text-3xl text-accentDarkPrimary">LAB</span>
    //     </Link>
    //     {/* <Link href={"/blogs"} className="bg-accentDarkSecondary px-4 py-1 rounded-lg text-dark ">Blogs</Link> */}
    //   </nav>
    //   <SocialMedia />
    //   <ThemeToggle />
    // </header>
  );
}
