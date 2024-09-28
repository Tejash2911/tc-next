import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAnnouncement } from '@/redux/slices/announcementSlice'
import { useEffect } from 'react'

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
        <div className='min-h-10 bg-teal-700 text-white font-Urbanist flex justify-center items-center relative overflow-hidden tracking-widest'>
          <marquee direction='left' scrollamount='15'>
            {announcement.title}
          </marquee>
        </div>
      )}
    </>
  )
}
