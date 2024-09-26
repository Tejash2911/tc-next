'use client'
import EmptyCart from '@/components/EmptyCart'
import { setError } from '@/redux/slices/errorSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import Image from 'next/image'
import GetUserAddress from '@/components/GetUserAddress'
import { deleteProduct } from '@/redux/slices/cartSlice'
import { setAddress } from '@/redux/slices/userSlice'
import addDynamicScript from '@/utils/addDynamicScript'
import { userRequest } from '@/lib/axios'

const CartPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state?.user?.currentUser)
  const userAddress = useAppSelector(state => state?.user?.address)

  const [cartProductRes, setCartProductRes] = useState()
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)

  //get User Cart
  useEffect(() => {
    const fetchCartData = async () => {
      if (user) {
        try {
          const res = await userRequest.get(`/cart/info/${user._id}`)
          setCartProductRes(res.data)
        } catch (error) {
          console.log('error', error)
          dispatch(setError(error.response.data.message))
        }
      } else {
        setCartProductRes(null)
      }
    }
    fetchCartData()
  }, [dispatch, user])

  //count cart total price
  const productQty = cartProductRes?.products?.map(p => p.quantity)
  useEffect(() => {
    const total = cartProductRes?.products.reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
    setTotalCartPrice(total)
  }, [cartProductRes?.products, productQty])

  //handle dec inc in product Quantity
  const handleProductQuantityChange = async (productID, quantity) => {
    if (quantity === 0) return handleDeleteProduct(productID)
    try {
      const res = await userRequest.put(`/cart/update-quantity/${productID}/${quantity}`)
      const productIndex = cartProductRes.products.findIndex(p => p.productID === productID)
      const newProduct = (cartProductRes.products[productIndex].quantity = quantity)
      setCartProductRes(p => ({ ...p, newProduct }))
      dispatch(setError(res.data.message))
    } catch (error) {
      console.log(error)
      dispatch(setError(error.response.data.message))
    }
  }

  //delete product
  const handleDeleteProduct = async id => {
    try {
      const filteredProducts = cartProductRes?.products?.filter(p => {
        return id !== p.productID
      })
      setCartProductRes(e => ({ ...e, products: filteredProducts }))
      dispatch(deleteProduct())
      const res = await userRequest.delete(`/cart/${id}`)
      dispatch(setError(res.data.message))
    } catch (error) {
      console.log('error', error)
      dispatch(setError(error.response.data.message))
    }
  }

  //handle checkout
  const handleCheckout = async () => {
    if (!user) {
      return router.push('/login')
    }

    // if there is address then continue or set get address popup
    if (!userAddress) {
      //if address is not stored in users local storage then get from db
      try {
        const { data } = await userRequest.get('/user/address')
        if (!data.ok) {
          return setAddModalIsOpen(true)
        }
        dispatch(setAddress(data.address)) //setting address wh to redux
      } catch (error) {
        return setAddModalIsOpen(true)
      }
    }

    setIsCheckoutLoading(true)
    if (!window.Razorpay) {
      await addDynamicScript('https://checkout.razorpay.com/v1/checkout.js') //script is not loading at first time dk why so i added this XD
    }

    const {
      data: { order }
    } = await userRequest.post('/buy/checkout', {
      user: user._id,
      type: 'cart',
      userInfo: {
        address: userAddress,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
      }
    })

    const {
      data: { key }
    } = await userRequest.get('/buy/getkey')
    setIsCheckoutLoading(false)

    if (!order || !key) {
      return dispatch(setError('error occurred while creating order'))
    }

    const options = {
      key: key, //reciving key from backend for security purpose
      amount: order.ammount,
      currency: 'INR',
      name: `${user.firstName} ${user.lastName}'s Cart`,
      description: `${user.firstName} ${user.lastName}'s Cart includes total ${cartProductRes?.products?.length}`,
      image:
        'https://toppng.com/uploads/preview/astronaut-art-png-jpg-royalty-free-stock-astronauta-dibujo-11562856188offwkk8qo8.png',
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: 'http://localhost:4000/api/v1/buy/paymentVerify',
      prefill: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.number
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
    setCartProductRes(null)
  }

  return (
    <div className='container'>
      <div className='p-5 font-Urbanist'>
        <div className='text-center font-light'>Cart</div>
        {cartProductRes?.products.length ? (
          <>
            <div className='flex items-center justify-between p-5'>
              <button className='p-2 font-semibold text-sm border-2 border-black bg-transparent'>
                Continue Shopping
              </button>
              <div className='hidden md:block'>
                <span className='underline cursor-pointer m-2'>Shopping Bag</span>
                <span className='underline cursor-pointer m-2'>Your Wishlist</span>
              </div>
              <button className='p-2 font-semibold text-sm border-none bg-black text-white'>Checkout Now</button>
            </div>
            <div className='grid lg:grid-cols-2 gap-5'>
              <div className='flex flex-col'>
                {cartProductRes?.products?.map(product => (
                  <div
                    key={product.productID}
                    className='flex flex-col md:flex-row h-fit my-2 rounded-xl shadow-sm hover:shadow-md overflow-hidden bg-[#f7f7f7] relative transition-all scale-95 hover:scale-100'
                  >
                    <div
                      className='absolute top-1 right-1 cursor-pointer'
                      onClick={() => handleDeleteProduct(product.productID)}
                    >
                      <ClearIcon style={{ color: '#AB2A28' }} />
                    </div>
                    <div className='flex w-3/4' onClick={() => router.push(`/product/${product._id}`)}>
                      <Image
                        src={product.img}
                        alt={product.title}
                        width={200}
                        height={200}
                        className='object-contain'
                      />
                      <div className='flex flex-col justify-around m-2'>
                        <span>
                          <b>Product :</b> {product.title}
                        </span>
                        <span>
                          <b>ID :</b> {product.productID}
                        </span>
                        <span className='inline-flex items-center gap-2'>
                          <b>Color :</b>{' '}
                          <div
                            className='w-3 h-3 border border-gray-700 rounded-full'
                            style={{ background: product.color }}
                          />
                        </span>
                        <span>
                          <b>Size :</b> {product.size}
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-col justify-center items-center w-1/4'>
                      <div className='flex justify-center items-center font-semibold'>
                        <div
                          className='flex items-center justify-center mx-2 cursor-pointer active:scale-110'
                          onClick={() => handleProductQuantityChange(product.productID, --product.quantity)}
                        >
                          <RemoveIcon />
                        </div>
                        <div className='flex items-center justify-center h-10 w-10 rounded-md border border-teal-700'>
                          {product.quantity}
                        </div>
                        <div
                          className='flex items-center justify-center mx-2 cursor-pointer active:scale-110'
                          onClick={() => handleProductQuantityChange(product.productID, ++product.quantity)}
                        >
                          <AddIcon />
                        </div>
                      </div>
                      <span className='m-2 font-semibold'>{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-col gap-2 border rounded-[2vmax] p-2 h-fit'>
                <h1 className='text-3xl my-2 font-light'>Products</h1>
                {cartProductRes?.products?.map(product => (
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
                    className='bg-black text-white text-sm border-none p-4 mt-5 w-4/5'
                    onClick={handleCheckout}
                    disabled={isCheckoutLoading ? true : false}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
        <GetUserAddress setModal={setAddModalIsOpen} open={addModalIsOpen} />
      </div>
    </div>
  )
}

export default CartPage
