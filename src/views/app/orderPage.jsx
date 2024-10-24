'use client'
import { useEffect } from 'react'
import ProductNotFound from '@/components/ProductNotFound'
import SingleOrder from '@/components/SingleOrder'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getOrdersByUserId } from '@/redux/slices/orderSlice'
import OrderSkeleton from '@/components/loaders/OrderSkeleton'

const OrdersPage = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector(({ user }) => user)
  const { orders, loading } = useAppSelector(({ order }) => order)

  useEffect(() => {
    dispatch(getOrdersByUserId(currentUser._id))
  }, [currentUser])

  return (
    <div className={`w-full font-Urbanist py-5 ${orders.length !== 0 || loading ? 'bg-[#e0dede]' : 'bg-white'}`}>
      <div className='container'>
        {!orders.length && !loading ? (
          <ProductNotFound title='No Orders Found' desc="Sorry, it looks like you haven't placed any orders yet." />
        ) : (
          <>
            <div className='mb-5'>
              <h1 className='ml-2 text-3xl font-semibold'>Your Orders</h1>
            </div>
            {loading ? (
              <div className='grid gap-4'>
                <OrderSkeleton />
                <OrderSkeleton />
              </div>
            ) : (
              <div className='grid gap-4'>
                {Array.isArray(orders) && orders.map(i => <SingleOrder key={i._id} order={i} />)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default OrdersPage
