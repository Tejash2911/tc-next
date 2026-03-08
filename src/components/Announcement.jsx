'use client'
import { useAnnouncement } from '@/hooks/useAnnouncementQueries'

export default function Announcement() {
  const { data: announcement } = useAnnouncement()

  return (
    <>
      {announcement && (
        <div className='flex min-h-7 items-center justify-center overflow-hidden bg-teal-700 text-xs tracking-widest text-white sm:text-sm'>
          <marquee direction='left' scrollamount='10'>
            {announcement.title}
          </marquee>
        </div>
      )}
    </>
  )
}
