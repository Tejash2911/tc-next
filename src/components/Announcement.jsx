import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAnnouncement } from '@/redux/slices/announcementSlice'

export default function Announcement() {
  const dispatch = useAppDispatch()
  const { announcement } = useAppSelector(({ announcement }) => announcement)

  useEffect(() => {
    handle.getData()
  }, [])

  const handle = {
    getData: () => {
      dispatch(getAnnouncement())
    }
  }

  return (
    <>
      {announcement && (
        <div className='min-h-7 bg-teal-700 text-xs sm:text-sm text-white font-Urbanist flex justify-center items-center overflow-hidden tracking-widest'>
          <marquee direction='left' scrollamount='10'>
            {announcement.title}
          </marquee>
        </div>
      )}
    </>
  )
}
