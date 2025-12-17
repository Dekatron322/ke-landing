"use client"
import React, { useState } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"

const Footer = () => {
  const [email, setEmail] = useState("")

  const { theme, resolvedTheme } = useTheme()
  const currentTheme = resolvedTheme || theme

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribed with:", email)
    setEmail("")
  }

  return (
    <footer className="flex w-full  items-center justify-center bg-[#1F2223] px-4 py-12 text-white sm:px-6 ">
      <div className="mx-auto mt-auto w-full max-w-[1240px]">
        {/* Main Footer Content */}
        <div className="mb-8 flex w-full flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          {/* Brand Section */}
          <div className="">
            <Image src="icons/kelogo.svg" alt="Ultra Logo" className="h-8 w-auto" width={32} height={32} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
            <Image src="/insta.svg" alt="Instagram" className="h-8 w-auto" width={32} height={32} />
            <Image src="/whatsapp.svg" alt="WhatsApp" className="h-8 w-auto" width={32} height={32} />
            <Image src="/facebook.svg" alt="Facebook" className="h-8 w-auto" width={32} height={32} />
          </div>
        </div>
        <div className="mb-8 flex w-full flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Brand Section */}
          <div className="max-w-md text-center sm:text-left">
            <p>
              Give your field agents and sales representatives the power to perform efficiently and deliver exceptional
              service.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
            <p>About</p>
            <p>Features</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
