import Image from "next/image";
import Link from "next/link";

export default function CategoryItem({ item }) {
  return (
    <div className="w-[250px] font-Urbanist relative overflow-hidden flex justify-center items-center shadow-md transition duration-300 ease-in-out hover:shadow-lg">
      <Image src={item.img} alt={item.title} width={1260} height={750} className="img" />
      <div className="absolute inset-0 flex justify-center items-center flex-col gap-5 w-full h-full transition duration-300 ease-in-out hover:bg-opacity-20 hover:bg-black hover:backdrop-blur-sm">
        <h1 className="text-2xl font-semibold text-white">{item.title}</h1>
        <button className="px-4 py-2 mb-5 bg-gray-200 cursor-pointer border-none shadow-sm rounded-md transition duration-300 ease-in-out">
          <Link href={`/products/${item.cat}`}>Browse</Link>
        </button>
      </div>
    </div>
  );
}