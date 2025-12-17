"use client"

import DashboardNav from "components/Navbar/DashboardNav"

import dynamic from "next/dynamic"
import HeroSection from "components/Landing/HeroSection/HeroSection"
import CoreValues from "components/Landing/AboutSection/CoreValues"
import SolutionsSection from "components/Landing/AboutSection/SolutionsSection"

// Lazy-load below-the-fold sections to cut initial bundle size
const Enterprise = dynamic(() => import("components/Landing/AboutSection/AboutSection"), {
  loading: () => null,
})
const FeatureSection = dynamic(() => import("components/Landing/FeatureSection/FeatureSection"), {
  loading: () => null,
})

const Footer = dynamic(() => import("components/Footer/Footer"), { loading: () => null })

export default function Dashboard() {
  // Use resolvedTheme to avoid hydration mismatch

  return (
    <>
      {/* <Preloader visible={!isPageLoaded} /> */}
      <section className="flex w-full flex-col items-center">
        <DashboardNav />

        <HeroSection />

        <FeatureSection />

        <Enterprise />
        <CoreValues />
        <SolutionsSection />
      </section>
      <Footer />
    </>
  )
}
