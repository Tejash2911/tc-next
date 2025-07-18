'use client'
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
        <div className='flex min-h-7 items-center justify-center overflow-hidden bg-teal-700 font-Urbanist text-xs tracking-widest text-white sm:text-sm'>
          <marquee direction='left' scrollamount='10'>
            {announcement.title}
          </marquee>
        </div>
      )}
    </>
  )
}
