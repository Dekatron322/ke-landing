import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const FeatureSection = () => {
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

  const imageVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.1,
      y: -10,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const svgVariants = {
    initial: { x: 0 },
    hover: { x: 3, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { x: 1, transition: { duration: 0.1 } },
  }

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  // Container animation for staggered effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#EFF0F3] px-3 py-10 md:py-16">
      <motion.div
        className="email relative mb-6 flex h-10 w-fit cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 transition-all duration-500 max-sm:h-8 max-sm:px-3 max-sm:py-1 max-sm:text-xs"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image src="/fire.svg" alt="Logo" width={12} height={16} />
        Features
      </motion.div>

      <motion.h2
        className="text-center text-2xl font-semibold leading-[1.2] sm:text-4xl"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Seamless Service &{" "}
        <span className="crypto-text">
          <br />
          Control at Your Fingertips
        </span>
      </motion.h2>
      <p className="mb-10 max-w-2xl text-center text-[#666]">
        We are committed to making your power experience simple and convenient. Access all your needs in one secure
        place.
      </p>

      <motion.div
        className="grid w-full max-w-[1240px] gap-5  md:grid-cols-3 "
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Card 1 */}
        <motion.div
          className="border-style card2-bg relative flex cursor-pointer flex-col overflow-hidden rounded-2xl px-6 pb-0 pr-0 pt-6"
          variants={cardVariants}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <motion.h3
            className="text-2xl font-bold max-sm:text-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            Quick Payments & Vending:
          </motion.h3>

          <motion.p
            className="mt-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            transition={{ delay: 0.1 }}
          >
            <strong>Secure Payments:</strong> Easily pay bills and resolve Disputes online.
          </motion.p>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            <strong>STS Compliant Vending:</strong> Get your energy tokens instantly through our certified STS compliant
            Vending system.
          </motion.p>

          <div className="relative z-0 flex w-full items-end justify-end">
            <motion.div
              variants={imageVariants}
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
              className="overflow-hidden rounded-lg"
            >
              <img src="/left.png" alt="Download" className="relative z-0 w-full max-w-[434px]" />
            </motion.div>
          </div>
          <div className="teams-gradient-bottom"></div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="border-style card-bg relative flex cursor-pointer flex-col gap-1 overflow-hidden rounded-2xl p-6"
          variants={cardVariants}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative z-0 mt-auto flex w-full items-end justify-center">
            <motion.div
              variants={imageVariants}
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
            >
              <img src="/mddle.png" alt="Download" className="relative z-0 w-full max-w-[444px]" />
            </motion.div>
          </div>

          <motion.h3
            className="z-50 mt-4 text-2xl font-medium text-white max-sm:text-lg md:-mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
          >
            Real-Time Status:
          </motion.h3>

          <motion.p
            className="z-50 text-white max-sm:text-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            transition={{ delay: 0.1 }}
          >
            <b>Outage Management:</b> View real-time Outage management updates and estimated restoration times for your
            area. Know before you call.
          </motion.p>

          <motion.p
            className="z-50 text-white max-sm:text-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            <b>Live Consumption:</b> Monitor your energy usage in real-time with detailed analytics and forecasts.
          </motion.p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="border-style card2-bg relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl pb-0 pl-0 pr-6 pt-6"
          variants={cardVariants}
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
        >
          <div className="px-6">
            <motion.h3
              className="text-2xl font-medium max-sm:text-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
            >
              Support & Transparency:
            </motion.h3>

            <motion.p
              className="mt-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={textVariants}
              transition={{ delay: 0.1 }}
            >
              Direct access to our CRM for logging and tracking complaints, ensuring quick resolution.
            </motion.p>
          </div>

          <div className="relative z-0 mt-auto flex w-full items-end justify-start">
            <motion.div
              variants={imageVariants}
              initial="initial"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
            >
              <img src="/right.png" alt="Download" className="relative z-0 w-full max-w-[444px]" />
            </motion.div>
          </div>
          <div className="teams-gradient-bottom"></div>
        </motion.div>
      </motion.div>

      <motion.div
        className="group mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        whileHover="hover"
        whileTap="tap"
      >
        <Link
          href="#"
          className="button-style flex items-center gap-2 transition-all duration-300 group-hover:gap-3 max-sm:w-fit max-sm:gap-1 max-sm:px-3 max-sm:py-2 max-sm:text-sm"
        >
          <span>Learn More</span>
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
  )
}

export default FeatureSection
