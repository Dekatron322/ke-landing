"use client"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import { GoMoon } from "react-icons/go"
import { AnimatePresence, motion } from "framer-motion"

import Link from "next/link"

import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import Image from "next/image"

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ isOpen, onClose }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isOpen) {
      // Simulate progress animation
      const timer = setTimeout(() => setProgress(85), 500)
      return () => clearTimeout(timer)
    } else {
      setProgress(0)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-gray-100 p-1 text-gray-500 transition-all hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Header */}
        <div className="mb-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative mx-auto mb-4"
          >
            <div className="flex size-16 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <svg
                className="size-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
          >
            Coming Soon
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Vendor login functionality is currently under development.
          </motion.p>
        </div>

        {/* Progress bar */}
        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.5 }} className="mb-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-gray-700 dark:text-gray-300">Development Progress</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-blue-500"
            />
          </div>
        </motion.div>

        {/* Features list */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-6 space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
        >
          <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">What to expect:</h3>
          <ul className="space-y-3">
            {[
              { icon: "🔐", title: "Secure Authentication", desc: "Bank-level security" },
              { icon: "📊", title: "Dashboard Tools", desc: "Management & analytics" },
              { icon: "⚡", title: "Real-time Updates", desc: "Live notifications" },
            ].map((feature, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-gray-100 text-sm dark:bg-gray-700">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{feature.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Notify Me When Ready
          </motion.button>
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">We'll notify you when it's ready!</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// The rest of your code remains exactly the same...
// [Keep the DownloadAppModal and DashboardNav components exactly as they were]

interface DownloadAppModalProps {
  isOpen: boolean
  onClose: () => void
}

const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  // Smart URL that redirects based on platform
  const smartDownloadUrl = "https://qr-code-sand-seven.vercel.app/"

  // Direct URLs for the buttons
  const appStoreUrl = "https://apps.apple.com/ng/app/ultra-app/id6450269232"
  const playStoreUrl = "https://play.google.com/store/apps/details?id=com.ahmadhabib.ultraappfrontend"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full p-1 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
        >
          ×
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Download Ultra App</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Scan the QR code to download our app</p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {/* QR Code */}
          <div className="flex items-center justify-center rounded-lg border-2 border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-48 items-center justify-center">
                <Image
                  src="/qr-code.png"
                  alt="QR Code for Ultra App Download"
                  width={192}
                  height={192}
                  className="size-full object-contain"
                  onError={(e) => {
                    // Fallback if QR code image doesn't exist
                    const target = e.target as HTMLElement
                    target.innerHTML = `
                      <div class="flex size-full items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
                        <div class="text-center">
                          <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">QR Code</div>
                          <div class="text-xs text-gray-400 dark:text-gray-500">Scan with your phone</div>
                        </div>
                      </div>
                    `
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Scan with your phone camera to download</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Available on iOS and Android devices</p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              The QR code will automatically detect your device
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const DashboardNav = () => {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false)
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false)
  const [activeHash, setActiveHash] = useState<string>("")

  // Ensure we only render after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    setActiveHash(window.location.hash)

    const onHashChange = () => {
      setActiveHash(window.location.hash)
    }

    window.addEventListener("hashchange", onHashChange)

    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      window.removeEventListener("hashchange", onHashChange)
      clearInterval(intervalId)
    }
  }, [])

  // Get the actual current theme, considering system preference
  const currentTheme = theme === "system" ? systemTheme : theme

  const toggleTheme = () => {
    // Toggle based on the actual current theme
    setTheme(currentTheme === "dark" ? "light" : "dark")
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const openDownloadModal = () => {
    setIsDownloadModalOpen(true)
  }

  const closeDownloadModal = () => {
    setIsDownloadModalOpen(false)
  }

  const openComingSoonModal = () => {
    setIsComingSoonModalOpen(true)
  }

  const closeComingSoonModal = () => {
    setIsComingSoonModalOpen(false)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-NG", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  // SVG animation variants
  const svgVariants = {
    initial: { x: 0 },
    hover: { x: 3, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { x: 1, transition: { duration: 0.1 } },
  }

  // Link animation variants
  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -2, transition: { duration: 0.2, ease: "easeInOut" } },
    tap: { y: 0, transition: { duration: 0.1 } },
  }

  const navLinks = [
    { name: "Feature", href: "#feature", targetId: "feature" },
    // { name: "Services", href: "#services", targetId: "services" },
    { name: "Enterprise Excellence", href: "#enterprise", targetId: "enterprise" },
    { name: "Intelligent Tools", href: "#tools", targetId: "tools" },
  ]

  // Function to check if a link is active
  const isLinkActive = (href: string) => {
    return activeHash === href
  }

  const handleNavClick = (e: React.MouseEvent, href: string, targetId: string, closeMenu?: boolean) => {
    e.preventDefault()

    if (closeMenu) {
      setIsMobileMenuOpen(false)
    }

    const targetEl = document.getElementById(targetId)
    if (targetEl) {
      setTimeout(
        () => {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" })
          window.history.pushState(null, "", href)
          setActiveHash(href)
        },
        closeMenu ? 50 : 0
      )
    }
  }

  // Mobile menu variants for framer-motion
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const mobileLinkVariants = {
    closed: {
      opacity: 0,
      y: -10,
    },
    open: {
      opacity: 1,
      y: 0,
    },
  }

  // Don't render anything until mounted on client
  if (!mounted) {
    return null
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
        className="fixed left-0 right-0 top-0 z-[300]  flex justify-center py-2 backdrop-blur"
      >
        <div className="z-[300] flex w-full items-center justify-between px-4 backdrop-blur sm:px-6 md:max-w-[1240px] md:px-0">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, "#top", "top")}
            className="flex items-center justify-center whitespace-nowrap rounded-full text-center font-semibold backdrop-blur"
          >
            <Image src="icons/kelogo.svg" alt="KE Logo" className="h-8 w-auto" width={32} height={32} />
          </a>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="flex items-center gap-5 max-md:hidden">
            <div className="flex items-center justify-center gap-10 rounded-full">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href)
                return (
                  <motion.div
                    key={link.name}
                    variants={linkVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.targetId)}
                      className={`nav-link relative px-2 py-1 transition-all duration-300 ${
                        isActive ? "nav-link-active" : "nav-link-inactive"
                      }`}
                    >
                      {link.name}
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="nav-link-underline"
                          layoutId="activeIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {/* Hover effect - only show if not active */}
                      {!isActive && (
                        <motion.div
                          className="nav-link-hover-underline"
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        />
                      )}
                    </a>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Desktop Right Section - Hidden on mobile */}
          <div className="flex items-center gap-5 max-md:hidden">
            <motion.div
              className="group flex items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover="hover"
              whileTap="tap"
            >
              <a
                href="https://sandbox.blumenos.com/customer-portal/auth"
                target="_blank"
                rel="noopener noreferrer"
                className="button-style flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
              >
                <span>Customer Login</span>
                <motion.svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-20 transition-colors duration-300"
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
                onClick={openComingSoonModal}
                className="button-style4 flex items-center gap-2 transition-all duration-300 group-hover:gap-3"
              >
                <span>Vendor Login</span>
                <motion.svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-20 transition-colors duration-300"
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
            </motion.div>
          </div>

          {/* Mobile Menu Button - Visible only on mobile */}
          <div className="hidden max-md:flex max-md:items-center max-md:gap-3">
            {/* Theme Toggle for Mobile */}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="flex items-center justify-center rounded-lg p-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <CloseIcon className="text-xl" /> : <MenuIcon className="text-xl" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobiletab-bg fixed inset-0 z-10 md:hidden"
              onClick={toggleMobileMenu}
            />

            {/* Mobile Menu Content */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="mobiletab-bg fixed bottom-0 left-0 right-0 top-16 z-20 overflow-y-auto border-b backdrop-blur-lg md:hidden"
            >
              <div className="px-4 py-6">
                {/* Mobile Navigation Links */}
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link, index) => {
                    const isActive = isLinkActive(link.href)
                    return (
                      <motion.div
                        key={link.name}
                        variants={mobileLinkVariants}
                        transition={{ delay: index * 0.1 }}
                        className="pb-4 last:border-b-0 last:pb-0 dark:border-gray-700"
                      >
                        <a
                          href={link.href}
                          onClick={(e) => {
                            handleNavClick(e, link.href, link.targetId, true)
                          }}
                          className={`nav-link relative flex items-center px-2 py-2 text-lg font-medium transition-all duration-200 ${
                            isActive ? "nav-link-active" : "nav-link-inactive"
                          }`}
                        >
                          {link.name}
                          {isActive && <span className="ml-2 h-2 w-2 rounded-full bg-[#008000] " />}
                        </a>
                      </motion.div>
                    )
                  })}

                  {/* Mobile Get Started Button */}
                  <motion.div
                    variants={mobileLinkVariants}
                    transition={{ delay: navLinks.length * 0.1 }}
                    className="pt-4"
                  >
                    <button
                      onClick={() => {
                        openDownloadModal()
                        toggleMobileMenu()
                      }}
                      className="button-style flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 transition-all duration-300"
                    >
                      <span>Get Started</span>
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-colors duration-300"
                      >
                        <path
                          d="M9.1497 0.80204C9.26529 3.95101 13.2299 6.51557 16.1451 8.0308L16.1447 9.43036C13.2285 10.7142 9.37889 13.1647 9.37789 16.1971L7.27855 16.1978C7.16304 12.8156 10.6627 10.4818 13.1122 9.66462L0.049716 9.43565L0.0504065 7.33631L13.1129 7.56528C10.5473 6.86634 6.93261 4.18504 7.05036 0.80273L9.1497 0.80204Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Download App Modal */}
      <DownloadAppModal isOpen={isDownloadModalOpen} onClose={closeDownloadModal} />

      {/* Coming Soon Modal */}
      <ComingSoonModal isOpen={isComingSoonModalOpen} onClose={closeComingSoonModal} />
    </>
  )
}

export default DashboardNav
