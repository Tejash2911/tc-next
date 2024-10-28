import CallIcon from '@mui/icons-material/Call'
import EmailIcon from '@mui/icons-material/Email'
import MapIcon from '@mui/icons-material/Map'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import GoogleIcon from '@mui/icons-material/Google'

export default function Footer() {
  return (
    <div className='bg-[#f7e9d7] font-Urbanist'>
      <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-[1rem]'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-3xl font-semibold'>TC.</h1>
          <p className='text-sm sm:text-base'>
            At TejashCreation, we are committed to providing our customers with the best possible shopping experience.
            From the moment you visit our website, you will be greeted with a wide selection of fashionable and stylish
            clothing options for all genders. Shop with us now and see the difference for yourself.
          </p>
          <div className='flex gap-4'>
            <span className='w-[40px] h-[40px] text-white bg-[#3b5998] rounded-full grid place-content-center'>
              <FacebookIcon />
            </span>
            <span className='w-[40px] h-[40px] text-white bg-[#bc2a8d] rounded-full grid place-content-center'>
              <InstagramIcon />
            </span>
            <span className='w-[40px] h-[40px] text-white bg-[#075e54] rounded-full grid place-content-center'>
              <WhatsAppIcon />
            </span>
            <span className='w-[40px] h-[40px] text-white bg-[#4885ed] rounded-full grid place-content-center'>
              <GoogleIcon />
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <h1 className='text-lg font-semibold'>Useful Links</h1>
          <ul className='grid grid-cols-2 gap-4 text-sm sm:text-base'>
            <li>Login</li>
            <li>Sign up</li>
            <li>Categories</li>
            <li>Products</li>
            <li>Wish list</li>
            <li>Cart</li>
            <li>Orders</li>
            <li>Settings</li>
            <li>Terms</li>
            <li>My Account</li>
          </ul>
        </div>
        <div className='flex flex-col gap-5'>
          <h1 className=' text-lg font-semibold'>Contact Us</h1>
          <p className='flex gap-4 text-sm sm:text-base'>
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
          <p className='flex gap-4 text-sm sm:text-base'>
            <CallIcon />
            +91 8780303049
          </p>
          <p className='flex gap-4 text-sm sm:text-base'>
            <EmailIcon /> tcpatel2911@gmail.com
          </p>
        </div>
      </div>
    </div>
  )
}
