'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { messageActions } from '@/redux/slices/messageSlice'
import { useAppDispatch } from '@/redux/hooks'
import Review from '@/components/Review'
import { useProductById } from '@/hooks/useProductQueries'
import ProductDetailsLoader from '@/components/loaders/ProductDetailsLoader'
import ProductNotFound from '@/components/ProductNotFound'
import { useAddToCart } from '@/hooks/useCartQueries'
import { useCurrentUser } from '@/hooks/useUserQueries'

const ProductDetailPage = ({ id }) => {
  const dispatch = useAppDispatch()
  const { data: currentUser } = useCurrentUser()
  const addToCartMutation = useAddToCart()
  const imgRef = useRef(null)
  const [productQuantity, setProductQuantity] = useState(1)
  const router = useRouter()

  // React Query for product data
  const { data: product, isLoading, isError } = useProductById(id)

  //setting default size and color for product
  const [color, setColor] = useState(product?.color?.length >= 0 && `#${product.color[0]}`)
  const [size, setSize] = useState(product?.size?.length >= 0 && product.size[0])

  const handle = {
    addToCart: async () => {
      if (!currentUser) {
        router.push('/login')

        return
      }

      const payload = {
        products: [
          {
            productID: product._id,
            quantity: productQuantity,
            color: color,
            size: size
          }
        ]
      }

      try {
        const res = await addToCartMutation.mutateAsync(payload)

        dispatch(messageActions.setMessage(res?.message))
      } catch (error) {
        dispatch(messageActions.setMessage(error?.message))
      }
    }
  }

  const handleClick = type => {
    if (type === 'dec') setProductQuantity(prev => (productQuantity > 1 ? prev - 1 : prev))
    if (type === 'inc') setProductQuantity(prev => (productQuantity < product.quantity ? prev + 1 : prev))
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

  if (isLoading) return <ProductDetailsLoader />

  if (isError || !product)
    return <ProductNotFound title='Product Not Found' desc='The product you are looking for does not exist' />

  return (
    <>
      <div className='container grid gap-5 py-5 md:grid-cols-2'>
        <div className='flex h-[200px] w-[200px] cursor-zoom-in items-center overflow-hidden sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]'>
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
          <h1 className='text-lg font-light sm:text-xl'>{product?.title}</h1>
          <p className='text-sm sm:text-base'>Design No - {product?.productNo}</p>
          <p className='text-sm sm:text-base'>{product?.desc}</p>
          <p className='text-sm sm:text-base'>₹{product?.price}</p>
          <span className={`text-sm sm:text-base ${product?.quantity >= 1 ? 'text-green-800' : 'text-red-600'}`}>
            {product?.quantity >= 1 ? `Only ${product?.quantity} left in stock` : 'Currently unavailable'}
          </span>
          <div className='flex items-center justify-between sm:w-full md:w-2/3 lg:w-2/3'>
            <div className='flex items-center text-xs sm:text-sm'>
              <div className='mr-2 font-light'>Color</div>
              {(product?.color || []).map(e => (
                <div
                  key={e}
                  className='ml-1 h-5 w-5 cursor-pointer rounded-full border border-gray-500 hover:scale-110 active:border-black'
                  style={{ backgroundColor: e }}
                  onClick={() => setColor(e)}
                />
              ))}
            </div>
            <div className='flex items-center text-xs sm:text-sm'>
              <div className='mr-2 font-light'>Size</div>
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
              <div className='flex cursor-pointer items-center justify-between rounded-full bg-gray-100 hover:bg-gray-200 active:scale-110'>
                <Icon icon='ri:subtract-line' onClick={() => handleClick('dec')} className='text-xs sm:text-sm' />
              </div>
              <span className='grid h-8 w-8 place-content-center rounded-xl border border-teal-600 p-2 text-xs sm:text-sm'>
                {productQuantity}
              </span>
              <div className='flex cursor-pointer items-center justify-between rounded-full bg-gray-100 hover:bg-gray-200 active:scale-110'>
                <Icon icon='ri:add-line' onClick={() => handleClick('inc')} className='text-xs sm:text-sm' />
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <button
                className={`flex items-center gap-1 border border-teal-500 p-1 text-xs shadow-lg hover:bg-[#c3c7c4] disabled:bg-[#ebebeb] sm:text-sm`}
                onClick={handle.addToCart}
                disabled={addToCartMutation.isPending}
              >
                <Icon icon='ri:shopping-cart-line' />
                {addToCartMutation.isPending ? 'Adding..' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {product && <Review product={product} />}
    </>
  )
}

export default ProductDetailPage
