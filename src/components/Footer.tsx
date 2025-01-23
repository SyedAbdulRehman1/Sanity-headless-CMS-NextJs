import Link from "next/link";
import React from "react";
import FooterContactForm from "./FooterContactForm";
import FooterLearn from "./FooterLearn";
import SocialMedia from "./SocialMedia";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className=" w-full bg-black  mt-12">
      <section className=" px-6 xs:px-8 sm:px-12  lg:px-16 xl:px-24 2xl:px-32 py-2 flex flex-col sm:flex-row justify-between items-center gap-2 ">
        <div className="flex justify-center items-center gap-x-2 text-sm text-light"></div>

        <div>
          <p className="text-xs text-light">©2025 All rights reserved.</p>
        </div>
      </section>
    </footer>
  );
}
