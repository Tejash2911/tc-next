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
      className='flex flex-col md:flex-row p-2 rounded-xl shadow-sm hover:shadow-md bg-[#f7f7f7] relative transition-all overflow-hidden scale-100 hover:scale-100'
    >
      <div
        className='absolute top-2 right-2 cursor-pointer'
        onClick={() => handle.handleDeleteProduct(product.productID)}
      >
        <ClearIcon style={{ color: '#AB2A28' }} />
      </div>
      <div
        className='flex flex-col md:flex-row w-full md:w-3/4 cursor-pointer'
        onClick={() => router.push(`/product/${product._id}`)}
      >
        <div className='flex justify-center items-center mb-3 md:mb-0'>
          <Image src={product.img} alt={product.title} width={120} height={120} className='object-contain' />
        </div>
        <div className='flex flex-col justify-around p-2 md:p-0 md:ml-4'>
          <span className='text-sm sm:text-base font-medium'>
            <b>Product:</b> {product.title}
          </span>
          <span className='text-sm sm:text-base'>
            <b>ID:</b> {product.productID}
          </span>
          <span className='inline-flex items-center gap-2 text-sm sm:text-base'>
            <b>Color:</b>
            <div className='w-4 h-4 border border-gray-700 rounded-full' style={{ background: product.color }} />
          </span>
          <span className='text-sm sm:text-base'>
            <b>Size:</b> {product.size}
          </span>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center w-full md:w-1/4 mt-3 md:mt-0'>
        <div className='flex items-center font-semibold'>
          <button
            className='flex items-center justify-center mx-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-110'
            onClick={() => handle.handleProductQuantityChange(product.productID, product.quantity - 1)}
          >
            <RemoveIcon fontSize='small' />
          </button>
          <span className='flex items-center justify-center h-8 w-8 rounded-md border border-teal-700 text-sm'>
            {product.quantity}
          </span>
          <button
            className='flex items-center justify-center mx-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 active:scale-110'
            onClick={() => handle.handleProductQuantityChange(product.productID, product.quantity + 1)}
          >
            <AddIcon fontSize='small' />
          </button>
        </div>
        <span className='mt-2 text-sm sm:text-base font-semibold'>Rs: {product.price}</span>
      </div>
    </div>
  )
}

export default CartItem
