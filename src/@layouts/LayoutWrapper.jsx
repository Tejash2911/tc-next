// components/LayoutWrapper.js
'use client'

import { usePathname } from 'next/navigation'
import Announcement from '@/components/Announcement'
import Navbar from '@/components/Navbar'
import NewsLetter from '@/components/NewsLetter'
import Footer from '@/components/Footer'
import BackToTopBTN from '@/components/BackToTopBTN'
import Message from '@/components/Message'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname.startsWith('/paymentSuccess')

  return (
    <>
      {!isAuthPage && <Announcement />}
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <NewsLetter />}
      {!isAuthPage && <Footer />}
      {!isAuthPage && <BackToTopBTN />}
      <Message />
    </>
  )
}
