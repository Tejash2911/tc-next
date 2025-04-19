import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ClearIcon from '@mui/icons-material/Clear'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { deleteCartItemById, getCartInfoByUserId, updateCartQtyById } from '@/redux/slices/cartSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { errorActions } from '@/redux/slices/errorSlice'

const CartItem = ({ product }) => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(({ user }) => user)
  const router = useRouter()

  const handle = {
    handleDeleteProduct: id => {
      dispatch(deleteCartItemById(id))
        .unwrap()
        .then(res => dispatch(errorActions.setErrorMessage(res?.message)))
        .catch(error => dispatch(errorActions.setErrorMessage(error?.message)))
        .finally(() => dispatch(getCartInfoByUserId(currentUser?._id)))
    },
    handleProductQuantityChange: (id, qty) => {
      if (qty === 0) return handle.handleDeleteProduct(id)

      dispatch(updateCartQtyById({ id, qty }))
        .unwrap()
        .then(res => dispatch(errorActions.setErrorMessage(res?.message)))
        .catch(error => dispatch(errorActions.setErrorMessage(error?.message)))
        .finally(() => dispatch(getCartInfoByUserId(currentUser._id)))
    }
  }

  return (
    <div
      key={product.productID}
      className='relative flex scale-100 flex-col overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all hover:scale-100 hover:shadow-md sm:p-5 md:flex-row'
    >
      <div
        className='absolute right-2 top-2 cursor-pointer'
        onClick={() => handle.handleDeleteProduct(product.productID)}
      >
        <ClearIcon style={{ color: '#AB2A28' }} />
      </div>
      <div
        className='flex w-full cursor-pointer flex-col items-center justify-between gap-4 md:flex-row'
        onClick={() => router.push(`/product/${product._id}`)}
      >
        <div className=''>
          <Image src={product.img} alt={product.title} width={100} height={100} className='object-contain' />
        </div>
        <div className='flex flex-col justify-around gap-2'>
          <span className='text-xs font-medium sm:text-sm'>
            <b>Product:</b> {product.title}
          </span>
          <span className='text-xs sm:text-sm'>
            <b>ID:</b> {product.productID}
          </span>
          <span className='inline-flex items-center gap-2 text-xs sm:text-sm'>
            <b>Color:</b>
            <div className='h-4 w-4 rounded-full border border-gray-700' style={{ background: product.color }} />
          </span>
          <span className='text-xs sm:text-sm'>
            <b>Size:</b> {product.size}
          </span>
        </div>
        <div className='flex w-full flex-col items-center justify-center md:w-1/4'>
          <div className='flex items-center font-semibold'>
            <button
              className='mx-2 flex items-center justify-center rounded-full bg-gray-100 p-1 hover:bg-gray-200 active:scale-110'
              onClick={() => handle.handleProductQuantityChange(product.productID, product.quantity - 1)}
            >
              <RemoveIcon className='text-xs sm:text-sm' />
            </button>
            <span className='flex h-8 w-8 items-center justify-center rounded-xl border border-teal-700 text-xs sm:text-sm'>
              {product.quantity}
            </span>
            <button
              className='mx-2 flex items-center justify-center rounded-full bg-gray-100 p-1 hover:bg-gray-200 active:scale-110'
              onClick={() => handle.handleProductQuantityChange(product.productID, product.quantity + 1)}
            >
              <AddIcon className='text-xs sm:text-sm' />
            </button>
          </div>
          <span className='mt-2 text-xs font-semibold sm:text-sm'>Rs: {product.price}</span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
