import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall, IoClose } from "react-icons/io5";
import { IoTime } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 57) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      <div className="w-full hidden md:hidden lg:block bg-[#2A3855] text-white py-5">
        <div className="flex max-w-6xl mx-auto items-center justify-between px-4 ">
          <div className="flex items-center gap-5">
            <p className="flex gap-2 items-center font-bold">
              <FaLocationDot className="text-yellow-400" />
              <span className="text-white text-[13px]">
                1010 Avenue, New York, NY 10018 US.
              </span>
            </p>
            <a
              href="tel:2123865575"
              className="flex gap-2 items-center hover:underline font-bold"
            >
              <IoCall className="text-yellow-400" />
              <span className="text-white text-[13px] ">212 386 5575</span>
            </a>
          </div>
          <div>
            <p className="flex gap-2 items-center font-bold">
              <IoTime className="text-yellow-400" />
              <span className="text-white text-[13px] ">
                Mon-Sat: 8.00-18.00. Sunday CLOSED
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Main Navbar */}
      <div
        className={`w-full bg-white  transition-all duration-300 z-50 ${
          isSticky
            ? "fixed top-0 shadow-md backdrop-blur-lg bg-white/70 backdrop-saturate-200 "
            : "relative"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-7">
          <div className="flex items-center gap-5">
            <div>
              <img src="/logo.jpeg" className="h-12" />
            </div>
            <div className="hidden md:hidden lg:flex gap-8 text-[#2A3855] tracking-[1px] font-semibold text-lg">
              <Link to="/">Home</Link>
              <Link to="/pages">Pages</Link>
              <Link to="/news">News</Link>
              <Link to="/elements">Elements</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          {/* Purchase Button */}
          <button className="border-2 hidden md:hidden lg:block font-bold border-[#223058] text-[#223058] px-6 py-1 rounded-full hover:bg-[#223058] hover:text-white transition">
            Purchase
          </button>

          {/* Mobile Menu Icon */}
          <div
            className="lg:hidden text-[#2A3855] text-3xl cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <AnimatePresence mode="wait">
              {openMenu ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <IoClose />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <GiHamburgerMenu />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Slide Down Menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            //transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-14 shadow-2xl rounded-bl-4xl rounded-br-4xl z-55  w-full h-[300px] bg-white/70 backdrop-blur-lg  px-6 py-8"
          >
            {/* Top Row */}
            {/* <div className="flex justify-between items-center mb-8">
              <img src="/logo.jpeg" className="h-12" />
              
              <IoClose
                className="text-4xl text-[#2A3855]"
                onClick={() => setOpenMenu(false)}
              />
            </div> */}

            {/* Mobile Menu Items */}

            <div className="flex flex-col gap-2 text-[#2A3855] font-semibold text-lg">
              <Link onClick={() => setOpenMenu(false)} to="/">
                Home
              </Link>
              <Link onClick={() => setOpenMenu(false)} to="/pages">
                Pages
              </Link>
              <Link onClick={() => setOpenMenu(false)} to="/news">
                News
              </Link>
              <Link onClick={() => setOpenMenu(false)} to="/elements">
                Elements
              </Link>
              <Link onClick={() => setOpenMenu(false)} to="/contact">
                Contact
              </Link>
            </div>
            {/* Purchase Button Bottom */}
            <div className="absolute bottom-5  left-0 w-full px-6">
              <button className="w-full border-2 border-[#223058] text-[#223058] font-semibold py-3 rounded-full">
                Purchase
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
