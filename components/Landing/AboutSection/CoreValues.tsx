"use client"

import { motion } from "framer-motion"
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
    <div className="flex w-full justify-center bg-[#EFF0F3]">
      <div className="flex w-full max-w-[1240px] flex-col  max-sm:p-4 max-sm:py-10 md:my-16">
        <DownloadAppModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
        <div className="flex w-full justify-center gap-10">
          <div className="flex w-full flex-col items-center justify-center max-md:px-0">
            {/* Text Content */}
            <motion.div
              className="email relative mb-6 flex h-10 w-fit cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 transition-all duration-500 max-sm:h-8 max-sm:px-3 max-sm:py-1 max-sm:text-xs"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/fire.svg" alt="Logo" width={12} height={16} />
              tools
            </motion.div>

            <motion.h2
              className="text-center text-4xl font-semibold leading-[1.2] max-sm:text-2xl"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Empowering Your Team <br /> with
              <span className="crypto-text"> Intelligent </span>
              Tools
            </motion.h2>
            <p className="max-w-2xl text-center text-[#666]">
              Give your field agents and sales representatives the power to perform efficiently and deliver exceptional
              service.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="relative col-span-2 flex flex-col items-center gap-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1F2223] to-[#008000] p-6 md:flex-row md:gap-2 md:p-0">
            <img
              src="/pattern.svg"
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover opacity-25 md:hidden"
            />
            <div className="relative z-10 w-full md:w-1/2 md:p-6">
              <h3 className="mb-4 text-3xl font-bold text-white max-sm:text-xl">Sales & Collections Mastery</h3>
              <p className="mb-4 text-[#FFFFFFCC]">
                Sales Rep Mgt: Tools for real-time monitoring, performance tracking, and task assignment for the entire
                Sales Rep Mgt team.
              </p>

              <p className="mb-4 text-[#FFFFFFCC]">
                Payments & Disputes: Secure mobile solutions for collecting Payments and processing on-the-spot Disputes
                resolution in the field.
              </p>
            </div>
            <div className="hidden w-full md:block md:w-1/2">
              <img src="/pattern.svg" alt="Background" className="h-[360px] w-full object-cover" />
            </div>
          </div>
          <div className="relative z-50 flex flex-col gap-2 rounded-2xl bg-[#FFFFFF] p-6 max-sm:col-span-2">
            <div className="relative mt-2">
              <Image
                src="/profile.png"
                alt="Download"
                className="h-auto w-full max-w-[216px]"
                width={600}
                height={40}
              />
            </div>
            <p className="text-xl font-semibold max-sm:text-xl">Data Access Anywhere</p>
            <p className="text-sm">
              Customer Profile: Mobile Customer profile access for accurate service delivery, meter readings, and
              upselling opportunities.
            </p>
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
