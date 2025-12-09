import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // useLocation ஐ இறக்குமதி செய்யவும்
import { FaLocationDot } from "react-icons/fa6";
import { IoCall, IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";

// Active Link-க்கு ஒரு தனிப்பயன் component
const ActiveLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [isHover, setIsHover] = useState(false);

  // Active மற்றும் Hover நிலையில் உள்ள Border-க்கு பொதுவான Tailwind classes
  const baseClasses =
    "relative transition-colors duration-300 font-bold hover:text-[#0f264f]";

  // Active/Hover-க்கான Curved Bottom Line Component
  const BorderLine = () => (
    <motion.div
      layoutId="active-nav-link" // Framer Motion மூலம் Smooth Transition கிடைக்கும்
      className="absolute -bottom-2.5 left-0 right-0 h-[3px] bg-[#2A3855]"
      initial={{ borderRadius: 0 }}
      animate={{ borderRadius: "0 0 10px 10px" }} // Bottom corners-க்கு Curve Shape
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );

  return (
    <Link
      to={to}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={baseClasses}
    >
      {children}

      {/* Active Link-க்கு மட்டும் Border Line */}
      {isActive && <BorderLine />}

      {/* Hover Effect-க்கு ஒரு தனிப்பட்ட Border Line (isActive-ஆக இல்லை என்றால் மட்டும்) */}
      {!isActive && (
        <AnimatePresence>
          {isHover && (
            <motion.div
              className="absolute -bottom-2.5 left-0 right-0 h-[3px] bg-[#2A3855]"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ borderRadius: "0 0 10px 10px" }}
            />
          )}
        </AnimatePresence>
      )}
    </Link>
  );
};

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

  // உங்கள் Link விவரங்கள்
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/service" },
    { name: "Solutions", path: "/solution" },
    // { name: "Case Studies", path: "/case" },
    { name: "Careers", path: "/careers" },
    //{ name: "Elements", path: "/elements" },
    { name: "Contact", path: "/contact" },

    // { name: "FAQs", path: "/faq" },
  ];

  return (
    <>
      {/* Top Info Bar (Without changes) */}
      {/* ... (உங்கள் பழைய கோட்) ... */}
      <div className="w-full hidden md:hidden lg:block bg-[#2A3855] text-white py-5">
        <div className="flex max-w-6xl mx-auto items-center justify-between px-4 ">
          <div className="flex items-center gap-5">
            <p className="flex gap-2 items-center font-bold">
              <FaLocationDot className="text-yellow-400" />
              <span className="text-white text-[13px]"> India (South)</span>
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
            {/* <p className="flex gap-2 items-center font-bold">
              <IoTime className="text-yellow-400" />
              <span className="text-white text-[13px] ">
                Mon-Sat: 8.00-18.00. Sunday CLOSED
              </span>
            </p> */}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full bg-white transition-all duration-300 z-50 ${
          isSticky
            ? "fixed top-0 shadow-md backdrop-blur-lg bg-white/70 backdrop-saturate-200 "
            : "relative"
        }`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-7">
          <div className="flex items-center gap-5">
            <Link to="/">
              <img
                src="/logo3.png"
                // style={{
                //   filter:
                //     "invert(54%) sepia(94%) saturate(500%) hue-rotate(10deg) brightness(95%) contrast(90%)",
                // }}
                className=" object-cover h-[50px] w-[100px] "
              />
            </Link>
            {/* Desktop Navigation Links */}
            <div className="hidden md:hidden lg:flex gap-8 text-[#2A3855] tracking-[1px] font-semibold ">
              {/* ActiveLink Component-ஐப் பயன்படுத்துதல் */}
              <nav className="flex gap-8 text-[#2A3855] tracking-[1px] font-semibold text-[15px]">
                {navItems.map((item) => (
                  <ActiveLink key={item.path} to={item.path}>
                    {item.name}
                  </ActiveLink>
                ))}
              </nav>
            </div>
          </div>

          {/* Purchase Button (Without changes) */}
          {/* <button className="border-2 hidden md:hidden lg:block font-bold border-[#223058] text-[#223058] px-6 py-1 rounded-full hover:bg-[#223058] hover:text-white transition">
            Purchase
          </button> */}

          {/* Mobile Menu Icon (Without changes) */}
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

      {/* Mobile Slide Down Menu (Without changes) */}
      {/* ... (உங்கள் பழைய கோட்) ... */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            className="fixed top-16 shadow-2xl rounded-bl-4xl rounded-br-4xl z-50 w-full h-[400px] bg-white/70 backdrop-blur-lg  py-8"
          >
            <div className="flex flex-col items-center gap-2 text-[#2A3855] font-semibold text-md md:text-lg">
              <Link
                className={` w-full text-center py-3  ${
                  location.pathname === "/"
                    ? "bg-[#2A3855] text-white"
                    : "text-[#2A3855]"
                } `}
                onClick={() => setOpenMenu(false)}
                to="/"
              >
                Home
              </Link>
              <Link
                className={` w-full text-center py-3  ${
                  location.pathname === "/about"
                    ? "bg-[#2A3855] text-white"
                    : "text-[#2A3855]"
                } `}
                onClick={() => setOpenMenu(false)}
                to="/about"
              >
                About
              </Link>
              <Link
                className={` w-full text-center py-3  ${
                  location.pathname === "/service"
                    ? "bg-[#2A3855] text-white"
                    : "text-[#2A3855]"
                } `}
                onClick={() => setOpenMenu(false)}
                to="/service"
              >
                Service
              </Link>
              <Link
                className={` w-full text-center py-3  ${
                  location.pathname === "/capabilities"
                    ? "bg-[#2A3855] text-white"
                    : "text-[#2A3855]"
                } `}
                onClick={() => setOpenMenu(false)}
                to="/solution"
              >
                Solutions
              </Link>
              {/* <Link
                className=" w-full text-center py-1 border-b border-gray-200"
                onClick={() => setOpenMenu(false)}
                to="/case"
              >
                Case Studies
              </Link> */}
              <Link
                className={` w-full text-center py-3  ${
                  location.pathname === "/careers"
                    ? "bg-[#2A3855] text-white"
                    : "text-[#2A3855]"
                } `}
                onClick={() => setOpenMenu(false)}
                to="/careers"
              >
                Careers
              </Link>
              {/* <Link onClick={() => setOpenMenu(false)} to="/elements">
                Elements
              </Link> */}
              <Link
                className={` w-full text-center py-3  ${
                  location.pathname === "/contact"
                    ? "bg-[#2A3855] text-white"
                    : "text-[#2A3855]"
                } `}
                onClick={() => setOpenMenu(false)}
                to="/contact"
              >
                Contact
              </Link>

              {/* <Link
                className=" w-full text-center py-1 "
                onClick={() => setOpenMenu(false)}
                to="/faq"
              >
                FAQs
              </Link> */}
            </div>
            {/* <div className="absolute bottom-5 left-0 w-full px-6">
              <button className="w-full border-2 border-[#223058] text-[#223058] font-semibold py-3 rounded-full">
                Purchase
              </button>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
