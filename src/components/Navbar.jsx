'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { cartActions, getCartSize } from '@/redux/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getSearchProducts } from '@/redux/slices/productSlice'
import { useDebounce } from '@/hooks/use-debounce'
import { userActions } from '@/redux/slices/userSlice'
import logo from '../../public/logo.png'
import { addressActions } from '@/redux/slices/addressSlice'
import { orderActions } from '@/redux/slices/orderSlice'

export default function Navbar() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { currentUser } = useAppSelector(({ user }) => user)
  const { quantity } = useAppSelector(({ cart }) => cart)
  const { searchProducts } = useAppSelector(({ product }) => product)

  const [optionIsOpen, setOptionIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, 500)

  const handle = {
    onClick: id => {
      setSearchValue('')
      router.push(`/product/${id}`)
    },
    onLogout: () => {
      dispatch(userActions.logoutUser())
      dispatch(cartActions.resetState())
      dispatch(orderActions.resetState())
      dispatch(addressActions.resetState())
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      dispatch(getSearchProducts(debouncedSearchValue))
    }
  }, [debouncedSearchValue])

  useEffect(() => {
    setIsAuthenticated(currentUser ? true : false)
    if (!currentUser) return
    dispatch(getCartSize())
  }, [])

  return (
    <div className='shadow-md sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-md font-Urbanist'>
      <div className='px-4 py-2 flex justify-between items-center'>
        <div className='flex-1 hidden md:flex items-center'>
          <h1 className='font-semibold text-center md:text-left text-3xl tracking-tight'>
            <Link href='/'>
              <Image src={logo} width={40} height={40} alt='logo' />
            </Link>
          </h1>
        </div>
        <div className='flex-1'>
          <div className='border border-gray-500 flex items-center justify-center rounded-lg p-[5px] relative'>
            <input
              type='text'
              name='search'
              className='w-full outline-none bg-transparent'
              placeholder='Search'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            ></input>
            <SearchIcon className='text-gray-500 text-lg cursor-pointer' />
            <ul className='absolute w-full top-10 bg-white rounded-b-[12px] backdrop:blur-lg shadow-md overflow-hidden'>
              {searchValue &&
                searchProducts?.map(p => {
                  return (
                    <li
                      key={p._id}
                      className='list-none text-left p-1 w-full cursor-pointer hover:bg-[#ededeb]'
                      onClick={() => handle.onClick(p._id)}
                    >
                      {p.title}
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
        <div className='flex-1 flex items-center justify-end'>
          {!isAuthenticated ? (
            <>
              <div className='cursor-pointer ml-5 md:ml-1 px-2'>
                <Link href='/register'>Sign Up</Link>
              </div>
              <div className='cursor-pointer ml-5 md:ml-1 px-2'>
                <Link href='/login'>Log In</Link>
              </div>
            </>
          ) : (
            <>
              <div className='flex flex-col cursor-pointer select-none' onClick={() => setOptionIsOpen(!optionIsOpen)}>
                <span className='text-base font-normal'>hello, {currentUser?.firstName} </span>
                <span className='font-bold relative flex items-center'>
                  Account{optionIsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </span>
                <div className={`${optionIsOpen ? 'block' : 'hidden'}`}>
                  <div className='bg-gray-100 top-16 shadow-lg border border-gray-200 flex flex-col absolute transform -translate-x-1/3 w-40'>
                    <div className='absolute left-1/2 top-1 w-2.5 h-2.5 bg-gray-100 transform -translate-x-1/2 -translate-y-full rotate-45'></div>
                    <Link href='/user-settings'>
                      <span className='z-10 py-2 px-4 bg-transparent text-black flex items-center justify-start gap-2 hover:font-semibold'>
                        <SettingsIcon /> Setting
                      </span>
                    </Link>
                    <Link href='/orders'>
                      <span className='z-10 py-2 px-4 bg-transparent text-black flex items-center justify-start gap-2 hover:font-semibold'>
                        <LocalMallIcon /> Orders
                      </span>
                    </Link>
                    <span
                      className='z-10 py-2 px-4 bg-transparent text-black flex items-center justify-start gap-2 hover:font-semibold'
                      onClick={handle.onLogout}
                    >
                      <LogoutIcon /> Logout
                    </span>
                  </div>
                </div>
              </div>
              <div className='ml-5 cursor-pointer relative'>
                <Link href='/cart'>
                  <ShoppingCartOutlinedIcon />
                </Link>
                <span className='absolute top-0 right-0 bg-black transform translate-x-1/2 -translate-y-1/2 text-white rounded-full w-5 h-5 grid place-content-center'>
                  {quantity ?? 0}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
