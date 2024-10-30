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
      className='flex flex-col md:flex-row p-4 sm:p-5 rounded-xl shadow-sm hover:shadow-md bg-white relative transition-all overflow-hidden scale-100 hover:scale-100'
    >
      <div
        className='absolute top-2 right-2 cursor-pointer'
        onClick={() => handle.handleDeleteProduct(product.productID)}
      >
        <ClearIcon style={{ color: '#AB2A28' }} />
      </div>
      <div
        className='flex flex-col md:flex-row items-center justify-between gap-4 w-full cursor-pointer'
        onClick={() => router.push(`/product/${product._id}`)}
      >
        <div className=''>
          <Image src={product.img} alt={product.title} width={100} height={100} className='object-contain' />
        </div>
        <div className='flex flex-col justify-around gap-2'>
          <span className='text-xs sm:text-sm font-medium'>
            <b>Product:</b> {product.title}
          </span>
          <span className='text-xs sm:text-sm'>
            <b>ID:</b> {product.productID}
          </span>
          <span className='inline-flex items-center gap-2 text-xs sm:text-sm'>
            <b>Color:</b>
            <div className='w-4 h-4 border border-gray-700 rounded-full' style={{ background: product.color }} />
          </span>
          <span className='text-xs sm:text-sm'>
            <b>Size:</b> {product.size}
          </span>
        </div>
        <div className='flex flex-col justify-center items-center w-full md:w-1/4'>
          <div className='flex items-center font-semibold'>
            <button
              className='flex items-center justify-center mx-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-110'
              onClick={() => handle.handleProductQuantityChange(product.productID, product.quantity - 1)}
            >
              <RemoveIcon className='text-xs sm:text-sm' />
            </button>
            <span className='flex items-center justify-center h-8 w-8 rounded-xl border border-teal-700 text-xs sm:text-sm'>
              {product.quantity}
            </span>
            <button
              className='flex items-center justify-center mx-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-110'
              onClick={() => handle.handleProductQuantityChange(product.productID, product.quantity + 1)}
            >
              <AddIcon className='text-xs sm:text-sm' />
            </button>
          </div>
          <span className='mt-2 text-xs sm:text-sm font-semibold'>Rs: {product.price}</span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
