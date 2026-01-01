import "styles/tailwind.css"
import { Metadata } from "next"
import localFont from "next/font/local"
import { ReduxProvider } from "../store/provider"

const gilroy = localFont({
  src: [
    { path: "../styles/fonts/DMSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../styles/fonts/DMSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../styles/fonts/AltTomato.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-gilroy",
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  title: "Kaduna Electric",
  description:
    "End-to-end billing and field-ops platform powering KadElectric: customer/CRM, meter and billing, outage management, agent cash collection with clearance/remittance tracking, vendor payments, and real-time performance analytics—all secured by role-based controls.",
  icons: {
    icon: [
      {
        url: "/ke.png",
        sizes: "any",
      },
      {
        url: "/ke.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/ke.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/ke.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "/ke.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/ke.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        rel: "mask-icon",
        url: "/ke.png",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kaduna Electric",
  },
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://kadunaelectric.com",
    images: [
      {
        width: 1200,
        height: 630,
        url: "/ke.png",
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={gilroy.variable}>
      <head>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="facebook-domain-verification" content="bh2lp1vm5r6a6m47eyr3pxuen7skom" />
      </head>
      <body>
        <ReduxProvider>
          <div>{children}</div>
        </ReduxProvider>
      </body>
    </html>
  )
}
