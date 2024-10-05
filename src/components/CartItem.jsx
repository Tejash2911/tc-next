import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ClearIcon from '@mui/icons-material/Clear'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { deleteCartItemById, updateCartQtyById } from '@/redux/slices/cartSlice'
import { useAppDispatch } from '@/redux/hooks'
import { errorActions } from '@/redux/slices/errorSlice'

const CartItem = ({ product }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handle = {
    handleDeleteProduct: id => {
      dispatch(deleteCartItemById(id))
        .unwrap()
        .then(res => dispatch(errorActions.setErrorMessage(res?.message)))
        .catch(error => dispatch(errorActions.setErrorMessage(error?.message)))
        .finally(() => handle.getData())
    },
    handleProductQuantityChange: (id, qty) => {
      if (qty === 0) return handle.handleDeleteProduct(id)

      dispatch(updateCartQtyById({ id, qty }))
        .unwrap()
        .then(res => dispatch(errorActions.setErrorMessage(res?.message)))
        .catch(error => dispatch(errorActions.setErrorMessage(error?.message)))
        .finally(() => handle.getData())
    }
  }

  return (
    <div
      key={product.productID}
      className='flex flex-col md:flex-row h-fit my-2 rounded-xl shadow-sm hover:shadow-md overflow-hidden bg-[#f7f7f7] relative transition-all scale-95 hover:scale-100'
    >
      <div
        className='absolute top-1 right-1 cursor-pointer'
        onClick={() => handle.handleDeleteProduct(product.productID)}
      >
        <ClearIcon style={{ color: '#AB2A28' }} />
      </div>
      <div className='flex w-3/4' onClick={() => router.push(`/product/${product._id}`)}>
        <Image src={product.img} alt={product.title} width={200} height={200} className='object-contain' />
        <div className='flex flex-col justify-around m-2'>
          <span>
            <b>Product :</b> {product.title}
          </span>
          <span>
            <b>ID :</b> {product.productID}
          </span>
          <span className='inline-flex items-center gap-2'>
            <b>Color :</b>{' '}
            <div className='w-3 h-3 border border-gray-700 rounded-full' style={{ background: product.color }} />
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
            onClick={() => handle.handleProductQuantityChange(product.productID, product.quantity - 1)}
          >
            <RemoveIcon />
          </div>
          <div className='flex items-center justify-center h-10 w-10 rounded-md border border-teal-700'>
            {product.quantity}
          </div>
          <div
            className='flex items-center justify-center mx-2 cursor-pointer active:scale-110'
            onClick={() => handle.handleProductQuantityChange(product?.productID, product.quantity + 1)}
          >
            <AddIcon />
          </div>
        </div>
        <span className='m-2 font-semibold'>{product.price}</span>
      </div>
    </div>
  )
}

export default CartItem
