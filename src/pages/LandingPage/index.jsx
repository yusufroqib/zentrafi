"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Rocket,
  ArrowRight,
  Zap,
  Repeat,
  ChevronRight,
  ExternalLink,
  BarChart3,
  Lock,
  Shield,
  Layers,
  Globe,
  Twitter,
  Github,
  Linkedin,
  X,
  LinkIcon,
  DockIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import LandingLayout from "./Layout";
import { ZentraLogoAnimated } from "@/components/ZentraLogoAnimated";
import ConnectWallet from "@/components/ui/ConnectButton";

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeProduct, setActiveProduct] = useState("launchpad");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate mouse position as percentage of window
      const x = (clientX / windowWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / windowHeight - 0.5) * 2; // -1 to 1

      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animated gradient background
  const [gradientPosition, setGradientPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const updateGradientPosition = () => {
      setGradientPosition({
        x: 50 + mousePosition.x * 10,
        y: 50 + mousePosition.y * 10,
      });
    };

    updateGradientPosition();
  }, [mousePosition]);

  // Floating elements for hero
  const floatingElements = [
    { id: 1, icon: <Rocket size={16} />, text: "Launch", delay: 0 },
    { id: 2, icon: <Repeat size={16} />, text: "Swap", delay: 0.1 },
    { id: 3, icon: <Lock size={16} />, text: "Secure", delay: 0.2 },
    { id: 4, icon: <BarChart3 size={16} />, text: "Track", delay: 0.3 },
    { id: 5, icon: <Zap size={16} />, text: "Trade", delay: 0.4 },
    { id: 6, icon: <Shield size={16} />, text: "Protect", delay: 0.5 },
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Yusuf Roqib",
      role: "Blockchain Engineer & Auditor",
      bio: "Blockchain enthusiast with expertise in smart contract development and DeFi architecture",
      img: "/Roqib.jpg",
      socials: {
        twitter: "https://x.com/rocco4real",
        github: "https://github.com/yusufroqib",
        linkedin: "https://www.linkedin.com/in/roqib-yusuf",
      },
    },
    {
      name: "Muhammed Musa",
      role: "Blockchain Engineer",
      bio: "Specialized in blockchain infrastructure and backend systems. Passionate about creating secure and scalable DeFi solutions.",
      img: "/Muhammed.png",
      socials: {
        twitter: "https://x.com/hola_officia",
        github: "https://github.com/hola-official",
        linkedin: "https://www.linkedin.com/in/hola-officia",
      },
    },
  ];

  return (
    <LandingLayout>
      <div
        className="relative bg-[#0a0f1a] text-white overflow-hidden"
        style={{
          backgroundimg: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(1,138,189,0.15) 0%, transparent 50%)`,
        }}
      >
        {/* Mobile Menu */}
        <div className="md:hidden">
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 z-50 bg-[#0a0f1a]/95 backdrop-blur-md"
              >
                <div className="flex flex-col h-full p-6">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full blur opacity-70"></div>
                        <div className="relative bg-[#0a0f1a] rounded-full p-1.5">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                              fill="url(#paint0_linear)"
                            />
                            <path
                              d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                              fill="url(#paint1_linear)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear"
                                x1="2"
                                y1="12"
                                x2="22"
                                y2="12"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#004581" />
                                <stop offset="1" stopColor="#018ABD" />
                              </linearGradient>
                              <linearGradient
                                id="paint1_linear"
                                x1="7"
                                y1="12"
                                x2="17"
                                y2="12"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stopColor="#004581" />
                                <stop offset="1" stopColor="#018ABD" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <span className="text-white font-bold">Zentra</span>
                        <span className="text-xs text-[#97CBDC] block leading-tight">
                          on Pharos Network
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-full cursor-pointer bg-[#1D2538]/60 hover:bg-[#1D2538]"
                    >
                      <X className="h-5 w-5 text-[#97CBDC]" />
                    </button>
                  </div>

                  <nav className="flex flex-col gap-6 mt-8">
                    {[
                      "Home",
                      "Launchpad",
                      "Zentra Swap",
                      "Pharos Network",
                      "Team",
                      "Docs",
                    ].map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase().replace(" ", "-")}`}
                        className="text-xl text-[#97CBDC] hover:text-white transition-colors py-3 border-b border-[#475B74]/30"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item}
                      </a>
                    ))}
                  </nav>

                  <div className="mt-auto flex flex-col gap-4">
                    <Button
                      onClick={() => navigate("/launchpad")}
                      className="bg-gradient-to-r cursor-pointer from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl h-12 w-full shadow-lg shadow-[#004581]/20 transition-all duration-200"
                    >
                      Launch App
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <ConnectWallet />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hero Section with Parallax Effect */}
        <section
          id="home"
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-full h-full">
              {/* Grid lines */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full border-[0.5px] border-[#018ABD]/20 [background-size:50px_50px] [background-img:linear-gradient(to_right,#018ABD10_1px,transparent_1px),linear-gradient(to_bottom,#018ABD10_1px,transparent_1px)]"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute inset-0">
                {floatingElements.map((element) => (
                  <motion.div
                    key={element.id}
                    className="absolute bg-[#1D2538]/60 backdrop-blur-sm border border-[#475B74]/50 rounded-lg px-3 py-1.5 text-xs font-medium text-[#97CBDC] flex items-center gap-1.5"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0.8, 1, 1, 0.8],
                      x: [0, -20, 20, 0],
                      y: [0, -30, -60, -100],
                    }}
                    transition={{
                      duration: 15,
                      times: [0, 0.1, 0.9, 1],
                      repeat: Number.POSITIVE_INFINITY,
                      delay: element.delay * 5,
                      ease: "easeInOut",
                    }}
                    style={{
                      left: `${30 + Math.random() * 40}%`,
                      top: `${70 + Math.random() * 20}%`,
                    }}
                  >
                    {element.icon}
                    <span>{element.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero content with parallax effect */}
          <motion.div
            className="container mx-auto px-4 relative z-10 flex flex-col items-center"
            style={{
              scale: heroScale,
              opacity: heroOpacity,
              y: heroY,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="mb-6 inline-block"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full blur-lg opacity-70 animate-pulse"></div>
                  <ZentraLogoAnimated size="xl" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#97CBDC]">
                  Welcome to Zentra
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl text-[#97CBDC] mb-10 max-w-3xl mx-auto px-4"
              >
                The ultimate DeFi platform for token launches, trading, and
                liquidity management
                {/* <span className="block mt-2 text-[#018ABD] font-medium">
                  Exclusively on Pharos Network
                </span> */}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              >
                <Button
                  onClick={() => navigate("/launchpad")}
                  className="bg-gradient-to-r cursor-pointer from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl h-14 px-8 shadow-lg shadow-[#004581]/20 transition-all duration-200 text-lg font-medium"
                >
                  Launch App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button className="border-[#475B74] text-center border bg-inherit cursor-pointer text-white hover:bg-black/50 rounded-xl h-14 px-8 transition-all duration-200 text-lg font-medium">
                  <Link
                    to={"https://swap-swap-liart.vercel.app/#/?intro=true"}
                    target="_blank"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    Zentra Swap
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* 3D-like platform preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 1,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="mt-16 relative w-full max-w-5xl perspective px-4"
              style={{
                transform: `perspective(1000px) rotateX(${
                  mousePosition.y * -5
                }deg) rotateY(${mousePosition.x * 5}deg)`,
              }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-3xl blur opacity-30"></div>
              <div className="relative bg-[#1D2538]/40 backdrop-blur-sm border border-[#475B74]/50 rounded-3xl overflow-hidden shadow-2xl transform-style-3d">
                <div className="h-[200px] sm:h-[300px] md:h-[400px] w-full relative">
                  <img
                    src="/Launchpad.png"
                    alt="Zentra Dashboard"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] to-transparent opacity-60"></div>
                </div>
              </div>

              {/* Floating stats cards - only show on larger screens */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute -bottom-6 -left-6 bg-[#1D2538]/80 backdrop-blur-md border border-[#475B74]/50 rounded-xl p-4 shadow-xl hidden sm:flex"
                style={{
                  transform: `translateZ(20px) translateX(${
                    mousePosition.x * -10
                  }px) translateY(${mousePosition.y * -10}px)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#018ABD]/20 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-[#018ABD]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#97CBDC]">
                      Total Value Locked
                    </div>
                    <div className="text-xl font-bold">$42.5M+</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="absolute -top-6 -right-6 bg-[#1D2538]/80 backdrop-blur-md border border-[#475B74]/50 rounded-xl p-4 shadow-xl hidden sm:flex"
                style={{
                  transform: `translateZ(20px) translateX(${
                    mousePosition.x * 10
                  }px) translateY(${mousePosition.y * 10}px)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#018ABD]/20 p-2 rounded-lg">
                    <Rocket className="h-6 w-6 text-[#018ABD]" />
                  </div>
                  <div>
                    <div className="text-sm text-[#97CBDC]">
                      Successful Launches
                    </div>
                    <div className="text-xl font-bold">1,250+</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center"
            >
              <div className="text-[#97CBDC] text-sm mb-2">
                Scroll to explore
              </div>
              <div className="w-6 h-10 border-2 border-[#97CBDC] rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-1.5 h-1.5 bg-[#97CBDC] rounded-full mt-2"
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Product Showcase Section */}
        <section id="products" className="py-16 md:py-20 px-4 relative">
          <div className="container mx-auto max-w-7xl">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
            >
              <div className="inline-flex items-center justify-center gap-2 mb-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#018ABD]"></div>
                <div className="text-[#018ABD] font-medium">Our Products</div>
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#018ABD] to-transparent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#97CBDC]">
                Comprehensive DeFi Ecosystem
              </h2>
              <p className="text-base md:text-lg text-[#97CBDC]">
                Powerful tools for the entire token lifecycle
              </p>
            </motion.div>

            {/* Product selector */}
            <div className="flex justify-center mb-12 md:mb-16">
              <div className="bg-[#1D2538]/80 border border-[#475B74] p-1 rounded-xl inline-flex flex-col sm:flex-row">
                <Button
                  variant="ghost"
                  className={cn(
                    "rounded-lg px-4 cursor-pointer sm:px-8 py-3 h-auto text-base sm:text-lg",
                    activeProduct === "launchpad"
                      ? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
                      : "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
                  )}
                  onClick={() => setActiveProduct("launchpad")}
                >
                  Launchpad
                </Button>
                <Button
                  variant="ghost"
                  className={cn(
                    "rounded-lg px-4 cursor-pointer sm:px-8 py-3 h-auto text-base sm:text-lg",
                    activeProduct === "zentraswap"
                      ? "bg-gradient-to-r from-[#004581] to-[#018ABD] text-white shadow-lg shadow-[#004581]/20"
                      : "bg-transparent text-[#97CBDC] hover:text-white hover:bg-[#1D2538]"
                  )}
                  onClick={() => setActiveProduct("zentraswap")}
                >
                  Zentra Swap
                </Button>
              </div>
            </div>

            {/* Product content */}
            <AnimatePresence mode="wait">
              {activeProduct === "launchpad" && (
                <motion.div
                  key="launchpad"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  <div>
                    <div className="bg-[#018ABD]/10 text-[#018ABD] px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium mb-6">
                      <Rocket className="h-4 w-4" />
                      <span>Token Launchpad</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      Launch Your Token with Confidence
                    </h3>
                    <p className="text-base md:text-lg text-[#97CBDC] mb-8">
                      Our launchpad provides everything you need to create,
                      launch, and manage your token with transparent
                      distribution and maximum returns.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
                      <motion.div
                        className="bg-[#1D2538]/60 rounded-xl p-4 md:p-5 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-all duration-300"
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
                          background: "rgba(29, 37, 56, 0.8)",
                        }}
                      >
                        <h4 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                          <div className="bg-[#018ABD]/20 p-1.5 rounded-lg">
                            <Rocket className="h-5 w-5 text-[#018ABD]" />
                          </div>
                          Fair Launch
                        </h4>
                        <p className="text-sm md:text-base text-[#97CBDC]">
                          Equal opportunity for all participants with
                          transparent distribution
                        </p>
                      </motion.div>

                      <motion.div
                        className="bg-[#1D2538]/60 rounded-xl p-4 md:p-5 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-all duration-300"
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
                          background: "rgba(29, 37, 56, 0.8)",
                        }}
                      >
                        <h4 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                          <div className="bg-[#018ABD]/20 p-1.5 rounded-lg">
                            <BarChart3 className="h-5 w-5 text-[#018ABD]" />
                          </div>
                          Pump Sales
                        </h4>
                        <p className="text-sm md:text-base text-[#97CBDC]">
                          Maximize price impact and rapid growth with strategic
                          liquidity
                        </p>
                      </motion.div>

                      <motion.div
                        className="bg-[#1D2538]/60 rounded-xl p-4 md:p-5 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-all duration-300"
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
                          background: "rgba(29, 37, 56, 0.8)",
                        }}
                      >
                        <h4 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                          <div className="bg-[#018ABD]/20 p-1.5 rounded-lg">
                            <Lock className="h-5 w-5 text-[#018ABD]" />
                          </div>
                          Token Lock
                        </h4>
                        <p className="text-sm md:text-base text-[#97CBDC]">
                          Secure token liquidity with time-locked smart
                          contracts
                        </p>
                      </motion.div>

                      <motion.div
                        className="bg-[#1D2538]/60 rounded-xl p-4 md:p-5 border border-[#475B74]/50 hover:border-[#018ABD]/50 transition-all duration-300"
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
                          background: "rgba(29, 37, 56, 0.8)",
                        }}
                      >
                        <h4 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                          <div className="bg-[#018ABD]/20 p-1.5 rounded-lg">
                            <Shield className="h-5 w-5 text-[#018ABD]" />
                          </div>
                          Token Vesting
                        </h4>
                        <p className="text-sm md:text-base text-[#97CBDC]">
                          Create custom vesting schedules for team tokens and
                          investors
                        </p>
                      </motion.div>
                    </div>

                    <Button
                      onClick={() => navigate("/token")}
                      className="bg-gradient-to-r cursor-pointer from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl h-12 px-6 shadow-lg shadow-[#004581]/20 transition-all duration-200 font-medium"
                    >
                      Launch Your Token
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="relative z-10"
                      style={{
                        transform: `perspective(1000px) rotateX(${
                          mousePosition.y * -3
                        }deg) rotateY(${mousePosition.x * 3}deg)`,
                      }}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-2xl blur opacity-30"></div>
                      <div className="relative bg-[#1D2538]/40 backdrop-blur-sm border border-[#475B74]/50 rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src="/FairLaunch.png"
                          alt="Zentra Launchpad"
                          width={600}
                          height={500}
                          className="w-full h-auto"
                        />
                      </div>
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(1,138,189,0.15),transparent_50%)]"></div>

                    <motion.div
                      initial={{ opacity: 0, x: 50, y: -50 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="absolute top-0 right-0 -mt-10 -mr-10 hidden md:block"
                      style={{
                        transform: `translateZ(30px) translateX(${
                          mousePosition.x * 15
                        }px) translateY(${mousePosition.y * 15}px)`,
                      }}
                    >
                      <div className="bg-[#1D2538]/80 backdrop-blur-md border border-[#475B74]/50 rounded-xl p-4 shadow-xl">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#018ABD]/20 p-2 rounded-lg">
                            <Rocket className="h-6 w-6 text-[#018ABD]" />
                          </div>
                          <div>
                            <div className="text-sm text-[#97CBDC]">
                              Launch Types
                            </div>
                            <div className="text-xl font-bold">3+</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeProduct === "zentraswap" && (
                <motion.div
                  key="zentraswap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
                >
                  <div>
                    <div className="bg-[#018ABD]/10 text-[#018ABD] px-4 py-2 rounded-full inline-flex items-center gap-2 font-medium mb-6">
                      <Repeat className="h-4 w-4" />
                      <span>Decentralized Exchange</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      Trade with Zentra Swap DEX
                    </h3>
                    <p className="text-base md:text-lg text-[#97CBDC] mb-8">
                      Our advanced decentralized exchange features both v2 and
                      v3 protocols for optimal trading experience with deep
                      liquidity and low slippage.
                    </p>

                    <div className="space-y-4 md:space-y-6 mb-8">
                      <motion.div
                        className="bg-[#1D2538]/60 rounded-xl p-4 md:p-6 border border-[#475B74]/50"
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
                          background: "rgba(29, 37, 56, 0.8)",
                        }}
                      >
                        <h4 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                          <div className="bg-[#018ABD]/20 p-2 rounded-lg">
                            <Zap className="h-5 w-5 text-[#018ABD]" />
                          </div>
                          Zentra Swap v2
                        </h4>
                        <p className="text-sm md:text-base text-[#97CBDC] mb-4">
                          Traditional AMM with constant product formula, perfect
                          for standard token pairs and deep liquidity.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-[#018ABD] mt-1 shrink-0" />
                            <span className="text-white text-sm md:text-base">
                              Simple liquidity provision
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-[#018ABD] mt-1 shrink-0" />
                            <span className="text-white text-sm md:text-base">
                              Lower gas fees for standard swaps
                            </span>
                          </li>
                        </ul>
                      </motion.div>

                      <motion.div
                        className="bg-[#1D2538]/60 rounded-xl p-4 md:p-6 border border-[#475B74]/50"
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
                          background: "rgba(29, 37, 56, 0.8)",
                        }}
                      >
                        <h4 className="text-lg md:text-xl font-bold text-white mb-2 flex items-center gap-2">
                          <div className="bg-[#018ABD]/20 p-2 rounded-lg">
                            <Zap className="h-5 w-5 text-[#018ABD]" />
                          </div>
                          Zentra Swap v3
                        </h4>
                        <p className="text-sm md:text-base text-[#97CBDC] mb-4">
                          Advanced concentrated liquidity model for capital
                          efficiency and reduced slippage.
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-[#018ABD] mt-1 shrink-0" />
                            <span className="text-white text-sm md:text-base">
                              Concentrated liquidity positions
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="h-4 w-4 text-[#018ABD] mt-1 shrink-0" />
                            <span className="text-white text-sm md:text-base">
                              Multiple fee tiers for different pairs
                            </span>
                          </li>
                        </ul>
                      </motion.div>
                    </div>

                    <Button className="bg-gradient-to-r cursor-pointer from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl h-12 px-6 shadow-lg shadow-[#004581]/20 transition-all duration-200 font-medium">
                      <Link
                        to={"https://swap-swap-liart.vercel.app/#/?intro=true"}
                        target="_blank"
                        className="flex items-center cursor-pointer"
                      >
                        Launch Zentra Swap
                        <ExternalLink className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="relative z-10"
                      style={{
                        transform: `perspective(1000px) rotateX(${
                          mousePosition.y * -3
                        }deg) rotateY(${mousePosition.x * 3}deg)`,
                      }}
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-2xl blur opacity-30"></div>
                      <div className="relative bg-[#1D2538]/40 backdrop-blur-sm border border-[#475B74]/50 rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src="/placeholder.svg?height=500&width=600&text=Zentra+Swap+Interface"
                          alt="Zentra Swap Interface"
                          width={600}
                          height={500}
                          className="w-full h-auto"
                        />
                      </div>
                    </motion.div>

                    {/* Decorative elements */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(1,138,189,0.15),transparent_50%)]"></div>

                    <motion.div
                      initial={{ opacity: 0, x: 50, y: -50 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="absolute top-0 right-0 -mt-10 -mr-10 hidden md:block"
                      style={{
                        transform: `translateZ(30px) translateX(${
                          mousePosition.x * 15
                        }px) translateY(${mousePosition.y * 15}px)`,
                      }}
                    >
                      <div className="bg-[#1D2538]/80 backdrop-blur-md border border-[#475B74]/50 rounded-xl p-4 shadow-xl">
                        <div className="flex items-center gap-3">
                          <div className="bg-[#018ABD]/20 p-2 rounded-lg">
                            <Repeat className="h-6 w-6 text-[#018ABD]" />
                          </div>
                          <div>
                            <div className="text-sm text-[#97CBDC]">
                              24h Volume
                            </div>
                            <div className="text-xl font-bold">$2.8M+</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Pharos Network Section */}
        <section id="pharos-network" className="py-16 px-4 bg-[#0a0f1a]/50">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <div className="inline-flex items-center justify-center gap-2 mb-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#018ABD]"></div>
                <div className="text-[#018ABD] font-medium">Blockchain</div>
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#018ABD] to-transparent"></div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#97CBDC]">
                Built Exclusively on Pharos Network
              </h2>
              <p className="text-[#97CBDC]">
                Zentra is fully deployed and optimized for the Pharos Network
                blockchain
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center">
              {/* Pharos Network - Primary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-[#004581]/30 to-[#018ABD]/30 backdrop-blur-sm border border-[#018ABD]/50 rounded-xl p-6 flex flex-col items-center gap-4 w-full max-w-3xl"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.2)",
                  background:
                    "linear-gradient(to right, rgba(0, 69, 129, 0.4), rgba(1, 138, 189, 0.4))",
                }}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-full blur-lg opacity-70 animate-pulse"></div>
                  <div className="bg-[#018ABD]/20 p-3 rounded-full w-18 h-18 flex items-center justify-center relative">
                    <img
                      src="/Pharos-chain.jpg"
                      className="rounded-full w-full"
                      alt=""
                    />
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-white font-bold text-xl md:text-2xl">
                      Pharos Network
                    </span>
                    <span className="bg-[#018ABD]/20 text-[#018ABD] text-xs px-2 py-0.5 rounded-full">
                      Exclusive
                    </span>
                  </div>
                  <span className="block text-sm text-[#97CBDC] mt-1">
                    Native Blockchain
                  </span>
                  <p className="mt-4 text-[#97CBDC] max-w-2xl">
                    Zentra is fully deployed and operational on the Pharos
                    Network, providing optimal performance, security, and
                    seamless integration. Our platform is specifically designed
                    and optimized for the Pharos Network blockchain
                    architecture, ensuring the best possible experience for
                    users and developers.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Link
                      to={"https://pharosnetwork.xyz/"}
                      target="_blank"
                      className="border-[#018ABD]/50 border cursor-pointer text-[#97CBDC] hover:text-white hover:bg-[#018ABD]/20 rounded-xl px-4 py-2 transition-all duration-200 text-sm"
                    >
                      <LinkIcon className=" h-6 w-6 cursor-pointer" />
                    </Link>
                    {/* <Button
                      variant="outline"
                      className="border-[#018ABD]/50 border cursor-pointer text-[#97CBDC] hover:text-white hover:bg-[#018ABD]/20 rounded-xl px-4 py-2 transition-all duration-200 text-sm"
                    >
                      <DockIcon className="ml-2 h-4 w-4" />
                    </Button> */}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
            >
              <div className="inline-flex items-center justify-center gap-2 mb-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#018ABD]"></div>
                <div className="text-[#018ABD] font-medium">Our Team</div>
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#018ABD] to-transparent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#97CBDC]">
                Meet the Team
              </h2>
              <p className="text-base md:text-lg text-[#97CBDC]">
                The talented teams behind Zentra's creation and ongoing
                development
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-[#1D2538]/60 backdrop-blur-sm border border-[#475B74]/50 rounded-xl overflow-hidden hover:border-[#018ABD]/50 transition-all duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
                    background: "rgba(29, 37, 56, 0.8)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-center p-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6 border-2 border-[#018ABD]/30">
                      <img
                        src={member.img || "/placeholder.svg"}
                        alt={member.name}
                        width={112}
                        height={112}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-[#018ABD] mb-2">{member.role}</p>
                      <p className="text-[#97CBDC] text-sm mb-4">
                        {member.bio}
                      </p>
                      <div className="flex justify-center sm:justify-start gap-4">
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#97CBDC] cursor-pointer hover:text-white transition-colors"
                          aria-label={`${member.name}'s Twitter`}
                        >
                          <Twitter className="h-5 w-5 cursor-pointer" />
                        </a>
                        <a
                          href={member.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#97CBDC] cursor-pointer hover:text-white transition-colors"
                          aria-label={`${member.name}'s GitHub`}
                        >
                          <Github className="h-5 w-5  cursor-pointer" />
                        </a>
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#97CBDC] cursor-pointer hover:text-white transition-colors"
                          aria-label={`${member.name}'s LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5 cursor-pointer" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
            >
              <div className="inline-flex items-center justify-center gap-2 mb-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#018ABD]"></div>
                <div className="text-[#018ABD] font-medium">Key Features</div>
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#018ABD] to-transparent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#97CBDC]">
                Why Choose Zentra
              </h2>
              <p className="text-base md:text-lg text-[#97CBDC]">
                Powerful features designed for the modern DeFi ecosystem
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-[#018ABD]" />,
                  title: "Security First",
                  description:
                    "All smart contracts are audited by leading security firms to ensure your assets are safe",
                },
                {
                  icon: <Zap className="h-8 w-8 text-[#018ABD]" />,
                  title: "Lightning Fast",
                  description:
                    "Optimized contracts and infrastructure for rapid transactions and minimal latency",
                },
                {
                  icon: <Layers className="h-8 w-8 text-[#018ABD]" />,
                  title: "Native Pharos Integration",
                  description:
                    "Built specifically for the Pharos Network for optimal performance and reliability",
                },
                {
                  icon: <Globe className="h-8 w-8 text-[#018ABD]" />,
                  title: "Global Liquidity",
                  description:
                    "Access deep liquidity pools across the DeFi ecosystem for optimal trading",
                },
                {
                  icon: <Lock className="h-8 w-8 text-[#018ABD]" />,
                  title: "Token Locking",
                  description:
                    "Secure token liquidity with time-locked smart contracts for investor confidence",
                },
                {
                  icon: <BarChart3 className="h-8 w-8 text-[#018ABD]" />,
                  title: "Advanced Analytics",
                  description:
                    "Comprehensive data and insights to track performance and make informed decisions",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1D2538]/60 backdrop-blur-sm border border-[#475B74]/50 rounded-xl p-5 md:p-6 hover:border-[#018ABD]/50 transition-all duration-300"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(1, 138, 189, 0.1)",
                    background: "rgba(29, 37, 56, 0.8)",
                  }}
                >
                  <div className="bg-[#0a0f1a] p-3 rounded-xl inline-flex mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#97CBDC]">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pharos Network Integration Section */}
        {/* <section className="py-16 md:py-20 px-4 bg-[#0a0f1a]/80">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
            >
              <div className="inline-flex items-center justify-center gap-2 mb-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#018ABD]"></div>
                <div className="text-[#018ABD] font-medium">Powered By</div>
                <div className="h-[1px] w-12 bg-gradient-to-r from-[#018ABD] to-transparent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#97CBDC]">
                Pharos Network Integration
              </h2>
              <p className="text-base md:text-lg text-[#97CBDC]">
                Zentra is built on and fully integrated with the Pharos Network,
                providing enhanced security, scalability, and interoperability
                for all your DeFi needs
              </p>
            </motion.div>

            <div className="flex item-center gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-[#1D2538]/60 rounded-xl p-5 md:p-6 border border-[#475B74]/50">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <div className="bg-[#018ABD]/20 p-2 rounded-lg">
                        <Shield className="h-5 w-5 text-[#018ABD]" />
                      </div>
                      Enhanced Security
                    </h3>
                    <p className="text-sm md:text-base text-[#97CBDC]">
                      Benefit from Pharos Network's robust security protocols
                      and consensus mechanism, ensuring your assets and
                      transactions are protected at all times.
                    </p>
                  </div>

                  <div className="bg-[#1D2538]/60 rounded-xl p-5 md:p-6 border border-[#475B74]/50">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <div className="bg-[#018ABD]/20 p-2 rounded-lg">
                        <Zap className="h-5 w-5 text-[#018ABD]" />
                      </div>
                      High Performance
                    </h3>
                    <p className="text-sm md:text-base text-[#97CBDC]">
                      Experience lightning-fast transaction speeds and low fees
                      thanks to Pharos Network's optimized blockchain
                      architecture.
                    </p>
                  </div>

                  <div className="bg-[#1D2538]/60 rounded-xl p-5 md:p-6 border border-[#475B74]/50">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                      <div className="bg-[#018ABD]/20 p-2 rounded-lg">
                        <Globe className="h-5 w-5 text-[#018ABD]" />
                      </div>
                      Cross-Chain Compatibility
                    </h3>
                    <p className="text-sm md:text-base text-[#97CBDC]">
                      Seamlessly interact with multiple blockchains through
                      Pharos Network's advanced cross-chain communication
                      protocols.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 float-right bg-gradient-to-r from-[#004581] to-[#018ABD] rounded-2xl blur opacity-30"></div>
                <div className="relative bg-[#1D2538]/40 backdrop-blur-sm border border-[#475B74]/50 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/Pharos-chain.jpg"
                    alt="Pharos Network Integration"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-b from-[#1D2538]/90 to-[#1D2538] rounded-3xl p-6 md:p-12 border border-[#475B74]/50 relative overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#018ABD]/20 rounded-full blur-3xl"></div>
                <div className="absolute -left-24 -bottom-24 w-64 h-64 bg-[#004581]/20 rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#97CBDC]"
                >
                  Ready to Get Started?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-base md:text-lg text-[#97CBDC] mb-8 max-w-2xl"
                >
                  Join thousands of projects using Zentra exclusively on the
                  Pharos Network for token creation, launches, and DeFi services
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    onClick={() => navigate("/launchpad")}
                    className="bg-gradient-to-r cursor-pointer from-[#004581] to-[#018ABD] hover:from-[#003b6e] hover:to-[#0179a3] text-white rounded-xl h-12 md:h-14 px-6 md:px-8 shadow-lg shadow-[#004581]/20 transition-all duration-200 text-base md:text-lg font-medium"
                  >
                    Launch App
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  {/* <Button
                    // onClick={}
                    variant="outline"
                    className="border-[#475B74] cursor-pointer text-white hover:bg-[#1D2538]/50 rounded-xl h-12 md:h-14 px-6 md:px-8 transition-all duration-200 text-base md:text-lg font-medium"
                  >
                    View Documentation
                  </Button> */}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-[#475B74]/50">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <ZentraLogoAnimated size="xs" showTagline={false} />
              </div>

              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                <Link
                  href="#home"
                  className="text-[#97CBDC] hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="#products"
                  className="text-[#97CBDC] hover:text-white transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="#pharos-network"
                  className="text-[#97CBDC] hover:text-white transition-colors"
                >
                  Pharos Network
                </Link>
                <Link
                  href="#team"
                  className="text-[#97CBDC] hover:text-white transition-colors"
                >
                  Team
                </Link>
                <Link
                  href="#"
                  className="text-[#97CBDC] hover:text-white transition-colors"
                >
                  Docs
                </Link>
              </div>

              <div className="flex items-center gap-4">
                {/* <a
                  href="#"
                  className="text-[#97CBDC] hover:text-white transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a> */}
                <Link
                  target="_blank"
                  className="text-[#97CBDC] cursor-pointer hover:text-white transition-colors"
                  to="https://github.com/Zentra-Finance"
                >
                  <Github className="h-5 w-5 cursor-pointer" />
                </Link>
                {/* <a
                  href="#"
                  className="text-[#97CBDC] hover:text-white transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a> */}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#475B74]/50 text-center">
              <p className="text-[#97CBDC]">
                © {new Date().getFullYear()} Zentra. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </LandingLayout>
  );
}
