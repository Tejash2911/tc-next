import { publicRequest } from "@/utils/axiosRequestMethods";

async function getAnnouncement() {
  try {
    const res = await publicRequest.get("/api/announcment", { cache: "no-store" });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Announcement() {
  const announcment = await getAnnouncement();
  return (
    <>
      {announcment && (
        <div className="min-h-10 bg-teal-700 text-white font-Urbanist flex justify-center items-center relative overflow-hidden tracking-widest">
          <marquee direction="left" scrollamount="15">
            {announcment.title}
          </marquee>
        </div>
      )}
    </>
  );
}
