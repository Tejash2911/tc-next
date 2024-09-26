'use client'
import ProductNotFound from '@/components/ProductNotFound'
import SingleOrder from '@/components/SingleOrder'
import { userRequest } from '@/lib/axios'
import { useAppSelector } from '@/redux/hooks'
import { useEffect, useState } from 'react'

const OrdersPage = () => {
  const user = useAppSelector(state => state.user?.currentUser)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await userRequest.get(`/orders/find/${user._id}`)
        setOrders(data)
      } catch (error) {
        setOrders([])
      }
    }
    fetchOrders()
  }, [user])
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
