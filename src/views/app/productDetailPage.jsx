'use client'
import Image from 'next/image'
import { setError } from '@/redux/slices/errorSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import addDynamicScript from '@/utils/addDynamicScript'
import { useEffect, useRef, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import Review from '@/components/Review'
import { useParams, useRouter } from 'next/navigation'
import { addProduct } from '@/redux/slices/cartSlice'
import { setAddress } from '@/redux/slices/userSlice'
import GetUserAddress from '@/components/GetUserAddress'
import dynamic from 'next/dynamic'
import { axiosInstance, userRequest } from '@/lib/axios'

const WriteReviewNoSSR = dynamic(() => import('@/components/WriteReview'), { ssr: false })

const ProductDetailPage = () => {
  const params = useParams()
  const user = useAppSelector(state => state.user.currentUser)
  const userAddress = useAppSelector(state => state.user.address)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const imgRef = useRef(null)
  const [product, setProduct] = useState(null)
  const [productQuantity, setProductQuantity] = useState(1)

  //setting default size and color for product
  const [Color, setColor] = useState(product?.color?.length >= 0 && `#${product.color[0]}`)
  const [size, setSize] = useState(product?.size?.length >= 0 && product.size[0])

  // Review Modal
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // get address modal
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`/product/info/${params.id}`)
        setProduct(res?.data)
      } catch (error) {
        if (error.response?.status === 404) {
          dispatch(setError(error.response.data.message))
        }
      }
    }
    getData()

    return () => {
      setProduct({})
      setProductQuantity(1)
    }
  }, [params.id, dispatch])

  const handleClick = type => {
    if (type === 'dec') setProductQuantity(prev => (productQuantity > 1 ? prev - 1 : prev))
    if (type === 'inc') setProductQuantity(prev => (productQuantity < product.quantity ? prev + 1 : prev))
  }

  const handleSubClick = async () => {
    if (!user) router.push('/login')
    try {
      const res = await userRequest.post(`/cart`, {
        products: [
          {
            productID: product._id,
            quantity: productQuantity,
            color: Color || product.color[0],
            size: size || product.size[0]
          }
        ]
      })
      !res.data.productExisted && dispatch(addProduct())
      dispatch(setError(res?.data?.message))
    } catch (error) {
      dispatch(setError(error?.response?.data?.message))
    }
  }

  const handleBuyNow = async () => {
    if (!user) router.push('/login')

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

    if (!window.Razorpay) {
      await addDynamicScript('https://checkout.razorpay.com/v1/checkout.js') //script is not loading at first time dk why so i added this XD
    }

    let Dborder, Dbkey
    try {
      const {
        data: { order }
      } = await userRequest.post('/buy/checkout', {
        user: user._id,
        product: {
          productID: product._id,
          quantity: productQuantity,
          size,
          color: Color
        },
        type: 'product',
        userInfo: {
          address: userAddress,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          number: user.number
        }
      })
      Dborder = order

      const {
        data: { key }
      } = await userRequest.get('/buy/getkey')
      Dbkey = key
    } catch (error) {
      dispatch(setError(error?.response?.data?.message || 'error occurred while creating order'))
    }

    const options = {
      key: Dbkey, //reciving key from backend sue to security
      amount: Dborder.amount,
      currency: 'INR',
      name: product.title,
      description: `${product.desc.slice(0, 252)}...` || 'random description', //slicing it because razor pay does'nt allow desc length more then 255
      image: product.img,
      order_id: Dborder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: 'http://localhost:4000/api/v1/buy/paymentVerify',
      prefill: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.number
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

  return (
    <div className='container'>
      <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-5 font-Urbanist p-10'>
        <div className='flex items-center justify-center cursor-zoom-in border overflow-hidden'>
          {product?.img ? (
            <Image
              src={product?.img}
              alt='product-image'
              width={400}
              height={168}
              priority
              ref={imgRef}
              onMouseMove={handleImgMouseEnter}
              onMouseLeave={handleImgMouseLeave}
              className='object-cover object-center transition-transform duration-500 ease-in-out'
            />
          ) : (
            <span>Loading...</span>
          )}
        </div>
        <div className='grid gap-7'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-light'>{product?.title}</h1>
            <h1 className='font-extralight'>Design No - {product?.productNo}</h1>
          </div>
          <p className=''>
            {!product?.desc
              ? `Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora sint accusamus explicabo in natus dolor maiores voluptate labore adipisci!lorem20Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dicta, commodi pariatur nisi fugiat hic quia voluptas! Quidem, earum voluptas.`
              : product?.desc}
          </p>
          <p className='text-3xl'>₹{product?.price}</p>
          <span className={`text-2xl ${product?.quantity >= 1 ? 'text-green-600' : 'text-red-600'}`}>
            {product?.quantity >= 1 ? `Only ${product?.quantity} left in stock` : 'Currently unavailable'}
          </span>
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center'>
              <div className='text-xl font-extralight mr-2'>Color</div>
              {(product?.color || []).map(e => (
                <div
                  key={e}
                  className='w-5 h-5 border border-gray-500 rounded-full cursor-pointer ml-1 hover:scale-110 active:border-black'
                  style={{ backgroundColor: e }}
                  onClick={() => setColor(e)}
                />
              ))}
            </div>
            <div className='flex items-center'>
              <div className='text-xl font-extralight mr-2'>Size</div>
              <select
                name='size'
                aria-label='size'
                className='border border-black'
                onChange={e => setSize(e.target.value)}
              >
                {(product?.size || []).map(e => (
                  <option key={e}>{e}</option>
                ))}
              </select>
            </div>
          </div>
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center font-semibold'>
              <div className='cursor-pointer mx-2 flex items-center justify-between active:scale-110'>
                <RemoveIcon onClick={() => handleClick('dec')} />
              </div>
              <span className='h-10 w-10 border border-teal-600 p-2 rounded-md grid place-content-center'>
                {productQuantity}
              </span>
              <div className='cursor-pointer mx-2 flex items-center justify-between active:scale-110'>
                <AddIcon onClick={() => handleClick('inc')} />
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <button
                className={`border-teal-500 border p-2 shadow-lg hover:bg-[#c3c7c4] disabled:bg-[#ebebeb] disabled:cursor-not-allowed`}
                disabled={product?.quantity < 1}
                onClick={handleSubClick}
              >
                Add to Cart
              </button>
              <button
                className={`border-teal-500 border p-2 shadow-lg hover:bg-[#c3c7c4] disabled:bg-[#ebebeb] disabled:cursor-not-allowed`}
                disabled={product?.quantity < 1}
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Review
        productID={product?._id}
        productName={product?.title}
        rating={product?.ratingsAverage}
        ratingCount={product?.ratingsQuantity}
        setModal={setModalIsOpen}
      />
      <WriteReviewNoSSR product={product} setModal={setModalIsOpen} isOpen={modalIsOpen} />
      <GetUserAddress setModal={setAddModalIsOpen} isOpen={addModalIsOpen} prevAdd={''} />
    </div>
  )
}

export default ProductDetailPage
