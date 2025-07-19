import Announcement from '@/components/Announcement'
import BackToTopBTN from '@/components/BackToTopBTN'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import NewsLetter from '@/components/NewsLetter'

export default function MainLayout({ children }) {
  return (
    <main>
      <Announcement />
      <Navbar />
      {children}
      <NewsLetter />
      <Footer />
      <BackToTopBTN />
    </main>
  )
}
