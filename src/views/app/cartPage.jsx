'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import EmptyCart from '@/components/EmptyCart'
import { errorActions } from '@/redux/slices/errorSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import addDynamicScript from '@/utils/addDynamicScript'
import { userRequest } from '@/lib/axios'
import AddressDialog from '@/components/dialogs/AddressDialog'
import useModal from '@/hooks/use-modal'
import { getCartInfoByUserId, getCartSize } from '@/redux/slices/cartSlice'
import SkeletonCartPage from '@/components/loaders/CartPageSkeleton'
import CartItem from '@/components/CartItem'
import { getUserAddress } from '@/redux/slices/addressSlice'

const CartPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(({ user }) => user)
  const { address } = useAppSelector(({ address }) => address)
  const { cart, loading } = useAppSelector(({ cart }) => cart)

  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)

  const addressDialog = useModal()

  const handle = {
    getData: () => {
      dispatch(getCartInfoByUserId(currentUser._id))
      dispatch(getCartSize(currentUser._id))
      dispatch(getUserAddress())
    }
  }

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    } else {
      handle.getData()
    }
  }, [currentUser])

  //count cart total price
  const productQty = cart?.products?.map(p => p.quantity)

  useEffect(() => {
    const total = cart?.products?.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)

    setTotalCartPrice(total)
  }, [cart?.products, productQty])

  //handle checkout
  const handleCheckout = async () => {
    // if there is address then continue or set get address popup
    if (!address) {
      addressDialog.onOpen({})

      return
    }

    setIsCheckoutLoading(true)

    if (!window.Razorpay) {
      await addDynamicScript('https://checkout.razorpay.com/v1/checkout.js') //script is not loading at first time dk why so i added this XD
    }

    const {
      data: { order }
    } = await userRequest.post('/buy/checkout', {
      user: currentUser._id,
      type: 'cart',
      userInfo: {
        address: address,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email
      }
    })

    const {
      data: { key }
    } = await userRequest.get('/buy/getKey')

    setIsCheckoutLoading(false)

    if (!order || !key) {
      return dispatch(errorActions.setErrorMessage('error occurred while creating order'))
    }

    const options = {
      key: key, //receiving key from backend for security purpose
      amount: order.amount,
      currency: 'INR',
      name: `${currentUser.firstName} ${currentUser.lastName}'s Cart`,
      description: `${currentUser.firstName} ${currentUser.lastName}'s Cart includes total ${cart?.products?.length}`,
      image:
        'https://toppng.com/uploads/preview/astronaut-art-png-jpg-royalty-free-stock-astronauta-dibujo-11562856188offwkk8qo8.png',
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: 'http://localhost:4000/api/v1/buy/paymentVerify',
      prefill: {
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
        contact: currentUser.number
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#40a0a0'
      }
    }

    const rzp1 = new window.Razorpay(options)

    rzp1.open()
  }

  if (loading) {
    return <SkeletonCartPage />
  }

  if (!loading && !cart?.products?.length) {
    return <EmptyCart />
  }

  return (
    <div className='container'>
      <div className='p-5 font-Urbanist'>
        <div className='text-center font-light'>Cart</div>
        <div className='flex items-center justify-between p-5'>
          <button className='p-2 font-semibold text-sm border-2 border-black bg-transparent'>Continue Shopping</button>
          <div className='hidden md:block'>
            <span className='underline cursor-pointer m-2'>Shopping Bag</span>
            <span className='underline cursor-pointer m-2'>Your Wishlist</span>
          </div>
          <button className='p-2 font-semibold text-sm border-none bg-black text-white'>Checkout Now</button>
        </div>
        <div className='grid lg:grid-cols-2 gap-5'>
          <div className='flex flex-col'>
            {cart?.products?.map(product => (
              <CartItem product={product} key={product.productID} />
            ))}
          </div>
          <div className='flex flex-col gap-2 border rounded-3xl p-2 h-fit'>
            <h1 className='text-3xl my-2 font-light'>Products</h1>
            {cart?.products?.map(product => (
              <div className='flex items-center justify-between my-1' key={product._id}>
                <div className='whitespace-wrap overflow-hidden'>{product.title}</div>
                <div>{(product.price * product.quantity)?.toFixed(2)}</div>
              </div>
            ))}
            <div className='flex justify-between font-semibold my-2'>
              <div className='whitespace-nowrap overflow-hidden'>Total</div>
              <div className='flex items-center justify-center'>{totalCartPrice?.toFixed(2)}</div>
            </div>
            <div className='flex items-center justify-center'>
              <button
                className='bg-black text-white text-sm border-none p-4 mt-5 w-4/5 disabled:bg-gray-500'
                onClick={handleCheckout}
                disabled={isCheckoutLoading ? true : false}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
      {addressDialog.isOpen && <AddressDialog open={addressDialog.isOpen} setOpen={addressDialog.onClose} />}
    </div>
  )
}

export default CartPage
