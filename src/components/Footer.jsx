import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import MapIcon from "@mui/icons-material/Map";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-[#f7e9d7] font-Urbanist">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-[1rem]">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-semibold">Name.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod possimus, dolor placeat voluptate ipsam delectus repellendus, laborum sunt ratione id obcaecati repudiandae, adipisci nihil
            fugit autem dignissimos quo! Officia, corporis?
          </p>
          <div className="flex gap-4">
            <span className="w-[40px] h-[40px] text-white bg-[#3b5998] rounded-full grid place-content-center">
              <FacebookIcon />
            </span>
            <span className="w-[40px] h-[40px] text-white bg-[#bc2a8d] rounded-full grid place-content-center">
              <InstagramIcon />
            </span>
            <span className="w-[40px] h-[40px] text-white bg-[#075e54] rounded-full grid place-content-center">
              <WhatsAppIcon />
            </span>
            <span className="w-[40px] h-[40px] text-white bg-[#4885ed] rounded-full grid place-content-center">
              <GoogleIcon />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-xl font-semibold">Useful Links</h1>
          <ul className="grid grid-cols-2 gap-4">
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
            <li>Login</li>
            <li>Sign up</li>
            <li>Wish list</li>
            <li>Cart</li>
            <li>Categorys</li>
            <li>Terms</li>
            <li>My Account</li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className=" text-xl font-semibold">Contact Us</h1>
          <p className="flex gap-4">
            <MapIcon /> Street: Shop No 01, Darji Street, Damka, Hazira Road
            <br />
            City: Surat
            <br />
            State/province/area: Gujarat
            <br />
            Pin Code: 394510
            <br />
            Country: India
          </p>
          <p className="flex gap-4">
            <CallIcon />
            +91 8780303049
          </p>
          <p className="flex gap-4">
            <EmailIcon /> tcpatel2911@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}
