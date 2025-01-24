"use client";
import Link from "next/link";
import Image from "next/image";
import { startTransition, useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Icons for menu

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state

  const checkLoginStatus = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    setIsLoggedIn(token ? true : false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, [pathname]);

  const router = useRouter();

  const handleNavigation = (link: string) => {
    startTransition(() => {
      router.push(link);
    });
  };

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
      className="fixed top-0 z-[100] left-0 right-0"
    >
      <div className="flex items-center w-full bg-primary-extradark-main py-2 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            <a href="/">
              <Image
                src="/main-logo.png"
                alt="main logo"
                width={40}
                height={28.84}
                className="h-[28.84px] w-[40px]"
              />
            </a>
            <div className="hidden lg:flex gap-8">
              <Link href="/" className="menu-text hover:text-[#499A16]">
                Home
              </Link>
              <Link href="/blog" className="menu-text hover:text-[#499A16]">
                Blogs
              </Link>
              <Link href={`/article?${Date.now()}`} className="menu-text hover:text-[#499A16]">
                News
              </Link>
            </div>
          </div>

          {/* Hamburger Menu */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl"
            >
              {menuOpen ? (
                <Image
                  height={30}
                  width={30}
                  src={"/icons8-cancel-50.png"}
                  alt={"menu"}
                />
              ) : (
                <Image
                  height={30}
                  width={30}
                  src={"/icons8-hamburger-button-50.png"}
                  alt={"menu"}
                />
              )}
            </button>
          </div>

          {/* Authentication Section */}
          {!isLoggedIn ? (
            <div className="hidden lg:flex gap-1 items-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/login?returnUrl=");
                }}
                className="font-gilroyMedium text-sm text-white hover:text-secondary-1 py-2 px-4"
              >
                Log in
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation("/signup");
                }}
                className="green-border-btn1 hover:bg-[#1E5E4B]"
              >
                Sign in
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex">
            <button
              onClick={(e) => {
                e.preventDefault();
                document.cookie =
                  "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                handleNavigation("/login");
              }}
              className="green-border-btn1 hidden lg:flex hover:bg-[#1E5E4B]"
            >
              Logout
            </button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-12 left-0 right-0 bg-primary-extradark-main flex flex-col items-start gap-4 px-4 py-2">
            <Link
              href="/"
              className="menu-text hover:text-[#499A16]"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="menu-text hover:text-[#499A16]"
              onClick={() => setMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link
              href="/article"
              className="menu-text hover:text-[#499A16]"
              onClick={() => setMenuOpen(false)}
            >
              News
            </Link>

            {!isLoggedIn ? (
              <div className="flex gap-1 items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/login?returnUrl=");
                  }}
                  className="font-gilroyMedium text-sm text-white hover:text-secondary-1 py-2 px-4"
                >
                  Log in
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation("/signup");
                  }}
                  className="green-border-btn1 hover:bg-[#1E5E4B]"
                >
                  Sign in
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.cookie =
                    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  handleNavigation("/login");
                }}
                className="green-border-btn1 hover:bg-[#1E5E4B]"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
