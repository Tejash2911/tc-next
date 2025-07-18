'use client'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'

export default function BackToTopBTN() {
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setIsShow(false)
      } else {
        setIsShow(true)
      }
    })
  }, [])

  const HandleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className={`fixed bottom-10 right-10 z-50 ${isShow && 'hidden'}`}>
      <div className='flex scale-150 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-white transition-all ease-in-out hover:bg-black hover:text-white'>
        <Icon icon='ri:arrow-up-double-line' width={24} height={24} onClick={HandleClick} />
      </div>
    </div>
  )
}
