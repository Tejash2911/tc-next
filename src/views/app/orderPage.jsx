'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProductNotFound from '@/components/ProductNotFound'
import SingleOrder from '@/components/SingleOrder'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getOrdersByUserId } from '@/redux/slices/orderSlice'

const OrdersPage = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(({ user }) => user)
  const { orders } = useAppSelector(({ order }) => order)

  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.push('/login')
    } else {
      dispatch(getOrdersByUserId(currentUser._id))
    }
  }, [currentUser])

  return (
    <div className={`w-full font-Urbanist py-5 ${orders.length !== 0 ? 'bg-[#e0dede]' : 'bg-white'}`}>
      <div className='container'>
        {!orders.length ? (
          <ProductNotFound title='No Orders Found' desc="Sorry, it looks like you haven't placed any orders yet." />
        ) : (
          <>
            <div className='mb-5'>
              <h1 className='ml-2 text-3xl font-semibold'>Your Orders</h1>
            </div>
            <div className='grid gap-4'>
              {orders.map(i => (
                <SingleOrder key={i._id} order={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrdersPage
