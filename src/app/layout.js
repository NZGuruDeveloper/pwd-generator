import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata = {
  title: 'Password generator app',
  description: 'Password generator app',
  icons: {
    icon: 'assets/img/favicon-32x32.png',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>{children}<Analytics /><SpeedInsights /></body>
    </html>
  )
}
