"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import DownloadAppModal from "components/DownloadAppModal"
import Image from "next/image"

export default function AboutSection() {
  const [isPhonesHovered, setIsPhonesHovered] = useState(false)
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    tap: { scale: 0.98 },
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  }

  const svgVariants = {
    initial: { x: 0 },
    hover: { x: 3, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { x: 1, transition: { duration: 0.1 } },
  }

  const handleDownloadClick = () => {
    setIsDownloadModalOpen(true)
  }

  return (
    <div className="flex w-full justify-center bg-[#FFFFFF]">
      <div className="flex w-full max-w-[1240px] flex-col  max-md:my-10 max-sm:p-3 md:my-16">
        <DownloadAppModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
        <div className="flex w-full justify-between gap-10">
          <div className="flex w-full justify-between max-md:flex-col max-md:px-0 md:gap-6 ">
            {/* Text Content */}
            <motion.div className="flex max-w-xl flex-col" initial="hidden" animate="visible" variants={fadeInUp}>
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="max-md:flex max-md:justify-center max-sm:w-full"
              >
                <div className="email relative mb-6 flex h-10 w-fit cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 transition-all duration-500 max-sm:h-8 max-sm:px-3 max-sm:py-1 max-sm:text-xs">
                  <Image src="/fire.svg" alt="Enterprise" width={16} height={16} />
                  Enterprise Excellence
                </div>
              </motion.div>
              <motion.h2
                className="text-[46px]  font-bold leading-[1.2] max-md:text-center max-sm:text-2xl"
                variants={fadeInUp}
              >
                Enterprise Excellence: Integrated Systems for <span className="crypto-text">Optimal Performance</span>
              </motion.h2>
            </motion.div>

            <div className="mt-3 flex max-w-md flex-col justify-end">
              {" "}
              <motion.p className="text-center md:text-end" variants={fadeInUp}>
                Move beyond siloed data. Our robust, all-in-one platform is built for utility-grade scale and
                efficiency.
              </motion.p>
              <motion.div
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:items-end md:justify-end"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link
                  href="#"
                  className="button-style flex items-center gap-2 transition-all duration-300 group-hover:gap-3 max-sm:w-fit max-sm:gap-1 max-sm:px-3 max-sm:py-2 max-sm:text-sm"
                >
                  <span>Learn More About Field Tools</span>
                  <motion.svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-20 transition-colors duration-300 max-sm:h-3 max-sm:w-3"
                    variants={svgVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <path
                      d="M9.1497 0.80204C9.26529 3.95101 13.2299 6.51557 16.1451 8.0308L16.1447 9.43036C13.2285 10.7142 9.37889 13.1647 9.37789 16.1971L7.27855 16.1978C7.16304 12.8156 10.6627 10.4818 13.1122 9.66462L0.049716 9.43565L0.0504065 7.33631L13.1129 7.56528C10.5473 6.86634 6.93261 4.18504 7.05036 0.80273L9.1497 0.80204Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="relative col-span-2 flex flex-col items-center gap-6 overflow-hidden rounded-2xl bg-[#008000] p-6 md:flex-row md:gap-2 md:p-0">
            <img
              src="/bg-image.svg"
              alt="Background"
              className="absolute inset-0 h-full w-full object-contain opacity-25 md:hidden"
            />
            <div className="relative z-10 w-full md:w-1/2 md:p-6">
              <h3 className="text-3xl font-bold text-white max-sm:text-2xl">Core Systems Integration:</h3>
              <p className="text-[#FFFFFFCC]">
                ERP & Billing System: A unified Enterprise Resource Planning Software and advanced Billing system for
                accurate financial oversight, revenue assurance, and streamlined processes.
              </p>
            </div>
            <div className="hidden w-full md:block md:w-1/2">
              <img src="/bg-image.svg" alt="Background" className="h-auto w-full object-contain" />
            </div>
          </div>
          <div className="relative z-50 flex flex-col gap-2 rounded-2xl bg-[#EFF0F3] p-6 max-sm:col-span-2">
            <p className="text-xl font-semibold max-sm:text-lg">Asset & Vendor Control</p>
            <p className="text-sm">
              Assets & Vendors: Comprehensive management of all network Assets and a unified Vendors/Vendor Gateway for
              seamless procurement and service management.
            </p>
            <div className="relative mt-2">
              <Image src="/directory.png" alt="Download" className="h-auto w-full" width={600} height={40} />
              <div className="teams-gradient-bottom"></div>
              <div className="teams-gradient-right"></div>
            </div>
          </div>
          <div className="relative z-50 flex  items-start gap-4 rounded-2xl bg-[#EFF0F3] p-6 max-md:col-span-2 md:flex-row md:items-center md:gap-2">
            <div className="w-1/2">
              <p className="text-xl font-semibold max-sm:text-lg">Asset & Vendor Control</p>
              <p className="text-sm">
                Assets & Vendors: Comprehensive management of all network Assets and a unified Vendors/Vendor Gateway
                for seamless procurement and service management.
              </p>
            </div>
            <div className="relative mt-2  w-1/2">
              <Image
                src="/recent-out.png"
                alt="Download"
                className="h-auto w-full md:h-[330px]"
                width={600}
                height={330}
              />
              <div className="teams-gradient-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneImages({
  isPhonesHovered,
  setIsPhonesHovered,
}: {
  isPhonesHovered: boolean
  setIsPhonesHovered: (hovered: boolean) => void
}) {
  const floatAnimation = {
    initial: { y: 0 },
    float: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const leftPhoneVariants = {
    hidden: { opacity: 1, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      rotate: 14,
      y: 20,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const centerPhoneVariants = {
    hidden: { opacity: 1, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
    hover: {
      rotate: 2,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  const rightPhoneVariants = {
    hidden: { opacity: 1, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
    },
    hover: {
      rotate: -10,
      y: -75,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      className="img-card-bg flex w-full items-center justify-center overflow-hidden rounded-2xl p-4 md:h-[400px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <motion.div
        className="relative flex items-end justify-center -space-x-24"
        onHoverStart={() => setIsPhonesHovered(true)}
        onHoverEnd={() => setIsPhonesHovered(false)}
      >
        {/* Left Phone */}
        <motion.div
          className="z-10"
          initial="hidden"
          animate={isPhonesHovered ? "hover" : "visible"}
          variants={leftPhoneVariants}
        >
          <motion.img
            src="/png2.png"
            alt="UltraApp feature 1"
            className="w-full drop-shadow-2xl"
            initial="initial"
            animate={isPhonesHovered ? "initial" : "float"}
            variants={floatAnimation}
          />
        </motion.div>

        {/* Center Phone (Main) */}
        <motion.div
          className="z-20"
          initial="hidden"
          animate={isPhonesHovered ? "hover" : "visible"}
          variants={centerPhoneVariants}
        >
          <motion.img
            src="/png1.png"
            alt="UltraApp main screen"
            className="w-full drop-shadow-2xl"
            initial="initial"
            animate={isPhonesHovered ? "initial" : "float"}
            variants={floatAnimation}
            transition={{ delay: 0.5 }}
          />
        </motion.div>

        {/* Right Phone */}
        <motion.div
          className="z-10"
          initial="hidden"
          animate={isPhonesHovered ? "hover" : "visible"}
          variants={rightPhoneVariants}
        >
          <motion.img
            src="/png3.png"
            alt="UltraApp feature 2"
            className="w-full drop-shadow-2xl"
            initial="initial"
            animate={isPhonesHovered ? "initial" : "float"}
            variants={floatAnimation}
            transition={{ delay: 1 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
