import { Icon } from '@iconify/react'
import Container from './Container'

export default function Footer() {
  return (
    <div className='bg-[#f7e9d7] font-Urbanist'>
      <Container>
        <div className='grid grid-cols-1 gap-10 py-5 sm:grid-cols-2 lg:grid-cols-3'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-sm font-semibold sm:text-base'>About Us</h1>
            <p className='text-xs sm:text-sm'>
              At TejashCreation, we are committed to providing our customers with the best possible shopping experience.
              From the moment you visit our website, you will be greeted with a wide selection of fashionable and
              stylish clothing options for all genders. Shop with us now and see the difference for yourself.
            </p>
            <div className='flex gap-4'>
              <span className='grid h-7 w-7 place-content-center rounded-full bg-[#3b5998] text-white sm:h-8 sm:w-8'>
                <Icon icon='ri:facebook-circle-fill' className='text-base sm:text-lg' />
              </span>
              <span className='grid h-7 w-7 place-content-center rounded-full bg-[#bc2a8d] text-white sm:h-8 sm:w-8'>
                <Icon icon='ri:instagram-fill' className='text-base sm:text-lg' />
              </span>
              <span className='grid h-7 w-7 place-content-center rounded-full bg-[#075e54] text-white sm:h-8 sm:w-8'>
                <Icon icon='ri:whatsapp-fill' className='text-base sm:text-lg' />
              </span>
              <span className='grid h-7 w-7 place-content-center rounded-full bg-[#4885ed] text-white sm:h-8 sm:w-8'>
                <Icon icon='ri:google-fill' className='text-base sm:text-lg' />
              </span>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <h1 className='text-sm font-semibold sm:text-base'>Useful Links</h1>
            <ul className='grid grid-cols-2 gap-3 text-xs sm:text-sm'>
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
          <div className='flex flex-col gap-3'>
            <h1 className='text-sm font-semibold sm:text-base'>Contact Us</h1>
            <p className='flex gap-4 text-xs sm:text-sm'>
              <Icon icon='ri:map-pin-line' className='text-base sm:text-lg' />
              Shop No 01, Darji Street, Damka, Hazira Road
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
              <Icon icon='ri:phone-line' className='text-base sm:text-lg' />
              +91 8780303049
            </p>
            <p className='flex gap-4 text-sm sm:text-base'>
              <Icon icon='ri:mail-line' className='text-base sm:text-lg' /> tcpatel2911@gmail.com
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
