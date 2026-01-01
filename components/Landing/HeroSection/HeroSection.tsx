"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import dynamic from "next/dynamic"

const DownloadAppModal = dynamic(() => import("components/DownloadAppModal"), {
  ssr: false,
  loading: () => null,
})

export default function HeroSection() {
  const [typedLetters, setTypedLetters] = useState<Set<string>>(new Set())
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [showCoins, setShowCoins] = useState(false)
  const animationStarted = useRef(false)

  const fullText = "Powering Progress. Connected. Efficient. Transparent."
  const words = fullText.split(" ")

  useEffect(() => {
    if (animationStarted.current) return

    animationStarted.current = true
    let currentIndex = 0
    const totalLetters = fullText.length

    const typeText = () => {
      if (currentIndex <= totalLetters) {
        const currentText = fullText.substring(0, currentIndex)
        const lettersArray = currentText.split("")
        const newTypedLetters = new Set<string>()

        lettersArray.forEach((letter, index) => {
          newTypedLetters.add(`${index}-${letter}`)
        })

        setTypedLetters(newTypedLetters)
        currentIndex++
        setTimeout(typeText, 50)
      }
    }

    typeText()
  }, [fullText])

  // Show coins after a delay to ensure they load last
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCoins(true)
    }, 1000) // 1 second delay to ensure other content loads first

    return () => clearTimeout(timer)
  }, [])

  const isLetterTyped = (positionIndex: number, letter: string) => {
    return typedLetters.has(`${positionIndex}-${letter}`)
  }

  const svgVariants = {
    initial: { x: 0 },
    hover: { x: 3, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { x: 1, transition: { duration: 0.1 } },
  }

  const badgeVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.05 },
    },
    float: {
      y: [0, -4, 0],
      transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: {
      scale: 0.99,
      transition: { duration: 0.1, ease: "easeOut" },
    },
  }

  let positionIndex = 0
  const renderAnimatedText = () => {
    return words.map((word, wordIndex) => {
      const letters = word.split("")
      const isCryptoWord = word === "Connected."

      const wordElement = (
        <span key={`word-${wordIndex}`} className={`word ${isCryptoWord ? "crypto-text" : ""}`}>
          {letters.map((letter, letterIndex) => {
            const currentPosition = positionIndex++
            const isTyped = isLetterTyped(currentPosition, letter)
            return (
              <span key={`letter-${wordIndex}-${letterIndex}`} className={`letter ${isTyped ? "typed" : ""}`}>
                {letter}
              </span>
            )
          })}
        </span>
      )

      if (wordIndex < words.length - 1) {
        const spacePosition = positionIndex++
        const isSpaceTyped = isLetterTyped(spacePosition, " ")
        return (
          <span key={`word-space-${wordIndex}`}>
            {wordElement}
            <span className={`word-space ${isSpaceTyped ? "typed" : ""}`}> </span>
          </span>
        )
      }

      return wordElement
    })
  }

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 pt-16 sm:px-6 md:max-w-[1240px] md:px-0 md:pt-0">
      <div className="absolute inset-0 bg-white/5"></div>

      <div className="large-text relative z-10 mx-auto mb-10 mt-10 flex w-full flex-col items-center justify-between gap-8 md:mt-36 md:flex-row md:items-start">
        <div className="w-full md:w-auto">
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate={["visible", "float"]}
            whileHover="hover"
            whileTap="tap"
            className="max-md:flex max-md:justify-center max-sm:w-full"
          >
            <div className="email relative mb-2 flex h-8 w-fit max-w-[260px] cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 text-sm transition-all duration-500 max-sm:text-xs">
              <Image src="/fire.svg" alt="Fire" width={12} height={24} />
              Kaduna Electric Bussiness suite
            </div>
          </motion.div>
          <motion.div
            className="max-w-2xl text-center text-4xl font-bold leading-tight sm:text-5xl md:text-left md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="min-h-[1.2em] max-sm:text-3xl">{renderAnimatedText()}</h1>
            <div className="flex gap-4">
              <a
                href="https://sandbox.blumenos.com/customer-portal/auth"
                target="_blank"
                rel="noopener noreferrer"
                className="button-style mx-auto mt-3 flex items-center justify-center gap-2 px-4 py-1 text-sm transition-all duration-300 group-hover:gap-3 max-sm:w-fit max-sm:gap-1 max-sm:px-3 max-sm:py-2 max-sm:text-sm md:mx-0 md:justify-start md:text-sm"
              >
                <span>Customer Login</span>
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
              </a>

              <button
                onClick={() => setIsDownloadModalOpen(true)}
                className="button-style4 mx-auto mt-3 flex items-center justify-center gap-2 px-4 py-1 text-sm transition-all duration-300 group-hover:gap-3 max-sm:w-fit max-sm:gap-1 max-sm:px-3 max-sm:py-2 max-sm:text-sm md:mx-0 md:justify-start md:text-sm"
              >
                <span>Buy Electricity</span>
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
              </button>
            </div>
          </motion.div>
        </div>

        <div className="flex w-full flex-col items-center justify-end md:w-auto md:items-end">
          <motion.p
            className="small-text max-w-md text-center text-lg max-sm:text-base md:text-end md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            The integrated digital platform driving operational excellence and enhanced customer experience across the
            Kaduna Electric franchise.
          </motion.p>
          <motion.div
            className="mt-4 flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Image src="/clients.svg" alt="Hero icon" width={100} height={100} />
          </motion.div>
          <motion.p
            className="mt-2 text-sm font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="text-[#6CAE27]">120k+</span> Active Users
          </motion.p>
        </div>
      </div>

      <HeroImages />

      <TextAnimationStyles />

      <DownloadAppModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />
    </motion.div>
  )
}

function CoinsSection() {
  const coinVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }
}

function HeroImages() {
  return (
    <motion.div
      className="relative mt-auto flex items-center justify-center gap-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <motion.img
        src="/clear-bg.png"
        alt="decorative line"
        className="max-w-full max-md:px-4 "
        loading="eager"
        decoding="async"
        fetchPriority="high"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2.5,
          delay: 1.1,
          type: "spring",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] sm:h-[420px] md:h-[500px]"
        style={{
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
        }}
      />
    </motion.div>
  )
}

function TextAnimationStyles() {
  return (
    <style jsx global>{`
      .word {
        white-space: nowrap;
        display: inline;
      }
      .word-space {
        opacity: 0;
        display: inline;
        transform: scale(0.8);
      }
      .letter {
        opacity: 0;
        display: inline-block;
        transform: scale(0.8);
      }
      .letter.typed,
      .word-space.typed {
        animation: letterAppear 0.2s ease-in forwards;
      }
      @keyframes letterAppear {
        0% {
          opacity: 0;
          transform: scale(0.8);
        }
        60% {
          opacity: 1;
          transform: scale(1.1);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}</style>
  )
}
