'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { errorActions } from '@/redux/slices/errorSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import addDynamicScript from '@/utils/addDynamicScript'
import Review from '@/components/Review'
import { addToCart, getCartSize } from '@/redux/slices/cartSlice'
import { userRequest } from '@/lib/axios'
import { getProductById, productActions } from '@/redux/slices/productSlice'
import AddressDialog from '@/components/dialogs/AddressDialog'
import useModal from '@/hooks/use-modal'
import { getUserAddress } from '@/redux/slices/addressSlice'
import ProductDetailsLoader from '@/components/loaders/ProductDetailsLoader'

const ProductDetailPage = ({ id }) => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(({ user }) => user)
  const { address } = useAppSelector(({ address }) => address)
  const { product, loading } = useAppSelector(({ product }) => product)
  const { loading: addToCartLoading } = useAppSelector(({ cart }) => cart)
  const router = useRouter()
  const imgRef = useRef(null)
  const [productQuantity, setProductQuantity] = useState(1)

  const addressDialog = useModal()

  //setting default size and color for product
  const [Color, setColor] = useState(product?.color?.length >= 0 && `#${product.color[0]}`)
  const [size, setSize] = useState(product?.size?.length >= 0 && product.size[0])

  const handle = {
    getData: () => {
      dispatch(getProductById(id))

      if (currentUser) {
        dispatch(getUserAddress())
      }
    },
    addToCart: () => {
      const payload = {
        productID: product._id,
        quantity: productQuantity,
        color: Color || product.color[0],
        size: size || product.size[0]
      }

      const nPayload = { products: [payload] }

      dispatch(addToCart(nPayload))
        .unwrap()
        .then(res => dispatch(errorActions.setErrorMessage(res?.message)))
        .catch(error => dispatch(errorActions.setErrorMessage(error?.message)))
        .finally(() => dispatch(getCartSize(currentUser?._id)))
    }
  }

  useEffect(() => {
    handle.getData()

    return () => {
      dispatch(productActions.resetProduct())
      setProductQuantity(1)
    }
  }, [id])

  const handleClick = type => {
    if (type === 'dec') setProductQuantity(prev => (productQuantity > 1 ? prev - 1 : prev))
    if (type === 'inc') setProductQuantity(prev => (productQuantity < product.quantity ? prev + 1 : prev))
  }

  const handleBuyNow = async () => {
    if (!currentUser) router.push('/login')

    // if there is address then continue or set get address popup
    if (!address) {
      return addressDialog.onOpen({})
    }

    if (!window.Razorpay) {
      await addDynamicScript('https://checkout.razorpay.com/v1/checkout.js') //script is not loading at first time dk why so i added this XD
    }

    let DbOrder, DbKey

    try {
      const {
        data: { order }
      } = await userRequest.post('/buy/checkout', {
        user: currentUser._id,
        product: {
          productID: product._id,
          quantity: productQuantity,
          size,
          color: Color
        },
        type: 'product',
        userInfo: {
          address: address,
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          email: currentUser.email,
          number: currentUser.number
        }
      })

      DbOrder = order

      const {
        data: { key }
      } = await userRequest.get('/buy/getKey')

      DbKey = key
    } catch (error) {
      dispatch(errorActions.setErrorMessage(error?.response?.data?.message || 'error occurred while creating order'))
    }

    const options = {
      key: DbKey, //receiving key from backend due to security
      amount: DbOrder.amount,
      currency: 'INR',
      name: product.title,
      description: `${product.desc.slice(0, 252)}...` || 'random description', //slicing it because razor pay does'nt allow desc length more then 255
      image: product.img,
      order_id: DbOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_API_URL}/buy/paymentVerify`,
      prefill: {
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
        contact: currentUser.number
      },
      notes: {
        address: 'Dummy Office address'
      },
      theme: {
        color: '#40a0a0'
      }
    }

    const rzp1 = new window.Razorpay(options)

    rzp1.open()
  }

  const handleImgMouseEnter = e => {
    const x = e.clientX - e.target.offsetLeft
    const y = e.clientY - e.target.offsetTop

    imgRef.current.style.transformOrigin = `${x}px ${y}px`
    imgRef.current.style.transform = 'scale(2)'
  }

  const handleImgMouseLeave = () => {
    // imgRef.current.style.transformOrigin = `center`;
    imgRef.current.style.transform = 'scale(1)'
  }

  if (loading) return <ProductDetailsLoader />

  return (
    <div className='container'>
      <div className='grid md:grid-cols-2 gap-5 font-Urbanist py-5'>
        <div className='flex items-center cursor-zoom-in overflow-hidden h-[200px] w-[200px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]'>
          {product.img && (
            <Image
              src={product.img}
              alt='product-image'
              width={400}
              height={168}
              ref={imgRef}
              onMouseMove={handleImgMouseEnter}
              onMouseLeave={handleImgMouseLeave}
              className='object-cover object-center transition-transform duration-500 ease-in-out'
            />
          )}
        </div>
        <div className='grid gap-5'>
          <h1 className='text-lg sm:text-xl font-light'>{product?.title}</h1>
          <p className='text-sm sm:text-base'>Design No - {product?.productNo}</p>
          <p className='text-sm sm:text-base'>{product?.desc}</p>
          <p className='text-sm sm:text-base'>₹{product?.price}</p>
          <span className={`text-sm sm:text-base ${product?.quantity >= 1 ? 'text-green-600' : 'text-red-600'}`}>
            {product?.quantity >= 1 ? `Only ${product?.quantity} left in stock` : 'Currently unavailable'}
          </span>
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center text-xs sm:text-sm'>
              <div className=' font-light mr-2'>Color</div>
              {(product?.color || []).map(e => (
                <div
                  key={e}
                  className='w-5 h-5 border border-gray-500 rounded-full cursor-pointer ml-1 hover:scale-110 active:border-black'
                  style={{ backgroundColor: e }}
                  onClick={() => setColor(e)}
                />
              ))}
            </div>
            <div className='flex items-center text-xs sm:text-sm'>
              <div className='font-light mr-2'>Size</div>
              <select
                name='size'
                aria-label='size'
                className='border border-gray-400 p-1'
                onChange={e => setSize(e.target.value)}
              >
                {(product?.size || []).map(e => (
                  <option key={e}>{e}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center gap-2 font-semibold'>
              <div className='cursor-pointer flex items-center justify-between active:scale-110 rounded-full bg-gray-100 hover:bg-gray-200'>
                <RemoveIcon onClick={() => handleClick('dec')} className='text-xs sm:text-sm' />
              </div>
              <span className='h-8 w-8 text-xs sm:text-sm border border-teal-600 p-2 rounded-xl grid place-content-center'>
                {productQuantity}
              </span>
              <div className='cursor-pointer flex items-center justify-between active:scale-110 rounded-full bg-gray-100 hover:bg-gray-200'>
                <AddIcon onClick={() => handleClick('inc')} className='text-xs sm:text-sm' />
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <button
                className={`border-teal-500 text-xs sm:text-sm border p-1 shadow-lg hover:bg-[#c3c7c4] disabled:bg-[#ebebeb] `}
                onClick={handle.addToCart}
                disabled={addToCartLoading}
              >
                {addToCartLoading ? 'Adding..' : 'Add to Cart'}
              </button>
              <button
                className={`border-teal-500 text-xs sm:text-sm border p-1 shadow-lg hover:bg-[#c3c7c4] disabled:bg-[#ebebeb]`}
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {product && <Review product={product} />}
      {addressDialog.isOpen && <AddressDialog open={addressDialog.isOpen} setOpen={addressDialog.onClose} />}
    </div>
  )
}

export default ProductDetailPage
