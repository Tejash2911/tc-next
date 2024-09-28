import announcementService from '@/service/announcement-service'

async function getAnnouncement() {
  try {
    const res = await announcementService.get()
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export default async function Announcement() {
  const announcement = await getAnnouncement()
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
