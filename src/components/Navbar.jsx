'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { cartActions, getCartSize } from '@/redux/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getSearchProducts } from '@/redux/slices/productSlice'
import { useDebounce } from '@/hooks/use-debounce'
import { logout } from '@/redux/slices/userSlice'
import { addressActions } from '@/redux/slices/addressSlice'
import { orderActions } from '@/redux/slices/orderSlice'
import { errorActions } from '@/redux/slices/errorSlice'
import logo from '../../public/logo.png'

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
      dispatch(logout())
        .unwrap()
        .then(res => dispatch(errorActions.setErrorMessage(res?.message)))
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
    <div className='sticky top-0 z-50 bg-white bg-opacity-80 font-Urbanist shadow-md backdrop-blur-md'>
      <div className='flex items-center justify-between px-4 py-2'>
        <div className='hidden flex-1 items-center md:flex'>
          <h1 className='text-center text-3xl font-semibold tracking-tight md:text-left'>
            <Link href='/home'>
              <Image src={logo} width={40} height={40} alt='logo' />
            </Link>
          </h1>
        </div>
        <div className='flex-1'>
          <div className='relative flex items-center justify-center rounded-xl border border-gray-500 p-[5px]'>
            <input
              type='text'
              name='search'
              className='w-full bg-transparent text-xs outline-none sm:text-sm'
              placeholder='Search'
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <Icon icon='ri:search-line' className='cursor-pointer text-sm text-gray-500 sm:text-base' />
            <ul className='absolute top-10 w-full overflow-hidden rounded-b-xl bg-white text-xs shadow-md backdrop:blur-lg sm:text-sm'>
              {searchValue &&
                searchProducts?.map(p => {
                  return (
                    <li
                      key={p._id}
                      className='w-full cursor-pointer list-none p-1 text-left hover:bg-[#ededeb]'
                      onClick={() => handle.onClick(p._id)}
                    >
                      {p.title}
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
        <div className='flex flex-1 items-center justify-end gap-4'>
          {!isAuthenticated ? (
            <>
              <div className='cursor-pointer text-xs sm:text-sm'>
                <Link href='/register'>Sign Up</Link>
              </div>
              <div className='cursor-pointer text-xs sm:text-sm'>
                <Link href='/login'>Log In</Link>
              </div>
            </>
          ) : (
            <>
              <div
                className='flex cursor-pointer select-none flex-col items-center text-xs sm:text-sm'
                onClick={() => setOptionIsOpen(!optionIsOpen)}
              >
                <span className='font-normal'>hello, {currentUser?.firstName} </span>
                <span className='relative flex items-center font-bold'>
                  Account
                  {optionIsOpen ? (
                    <Icon icon='ri:arrow-drop-up-fill' className='text-sm sm:text-base' />
                  ) : (
                    <Icon icon='ri:arrow-drop-down-fill' className='text-sm sm:text-base' />
                  )}
                </span>
                <div className={`${optionIsOpen ? 'block' : 'hidden'}`}>
                  <div className='absolute -right-7 top-14 flex w-32 -translate-x-1/3 transform flex-col border border-gray-200 bg-gray-100 shadow-lg sm:top-16'>
                    <div className='absolute left-1/2 top-1 h-2.5 w-2.5 -translate-x-1/2 -translate-y-full rotate-45 transform bg-gray-100'></div>
                    <Link href='/user-settings'>
                      <span className='z-10 flex items-center justify-start gap-2 bg-transparent px-4 py-2 text-sm text-black hover:font-semibold sm:text-base'>
                        <Icon icon='ri:settings-2-line' className='text-sm sm:text-base' /> Setting
                      </span>
                    </Link>
                    <Link href='/orders'>
                      <span className='z-10 flex items-center justify-start gap-2 bg-transparent px-4 py-2 text-sm text-black hover:font-semibold sm:text-base'>
                        <Icon icon='ri:shopping-bag-line' className='text-sm sm:text-base' /> Orders
                      </span>
                    </Link>
                    <span
                      className='z-10 flex items-center justify-start gap-2 bg-transparent px-4 py-2 text-sm text-black hover:font-semibold sm:text-base'
                      onClick={handle.onLogout}
                    >
                      <Icon icon='ri:logout-box-r-line' className='text-sm sm:text-base' /> Logout
                    </span>
                  </div>
                </div>
              </div>
              <div className='relative cursor-pointer'>
                <Link href='/cart' aria-label='view items in cart'>
                  <Icon icon='ri:shopping-cart-line' className='text-xl sm:text-2xl' />
                </Link>
                <span className='absolute right-0 top-0 grid h-4 w-4 -translate-y-1/2 translate-x-1/2 transform place-content-center rounded-full bg-black text-xs text-white sm:h-5 sm:w-5 sm:text-sm'>
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
