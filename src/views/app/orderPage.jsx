'use client'
import ProductNotFound from '@/components/ProductNotFound'
import SingleOrder from '@/components/SingleOrder'
import { useOrdersByUserId } from '@/hooks/useOrderQueries'
import OrderSkeleton from '@/components/loaders/OrderSkeleton'
import { useCurrentUser } from '@/hooks/useUserQueries'

const OrdersPage = () => {
  const { data: currentUser } = useCurrentUser()
  const { data: orders, isLoading } = useOrdersByUserId(currentUser?._id)

  return (
    <div className={`w-full py-5 ${orders?.length !== 0 || isLoading ? 'bg-[#e0dede]' : 'bg-white'}`}>
      <div className='container'>
        {!orders?.length && !isLoading ? (
          <ProductNotFound title='No Orders Found' desc="Sorry, it looks like you haven't placed any orders yet." />
        ) : (
          <>
            <div className='mb-5'>
              <h1 className='ml-2 text-xl font-semibold sm:text-2xl'>Your Orders</h1>
            </div>
            {isLoading ? (
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
