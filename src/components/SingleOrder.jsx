import React from 'react'
import Image from 'next/image'

const statusColors = {
  pending: { background: 'bg-[#FDF6B2]', color: 'text-[#C6783B]' },
  processing: { background: 'bg-[#DEF7EC]', color: 'text-[#87A66E]' },
  delivered: { background: 'bg-[#E1EFFE]', color: 'text-[#3F91FA]' }
}

export default function SingleOrder({ order }) {
  const { background, color } = statusColors[order.orderStatus] || {}

  return (
    <div className='w-full rounded-xl bg-white p-4 shadow-md sm:p-5'>
      <div className='flex items-center justify-between gap-2'>
        <span className='rounded-xl bg-teal-700 px-2 py-1 text-xs text-white sm:text-sm'>
          Order ID : {order.paymentInfo.razorpay_payment_id}
        </span>
        <span className='text-xs sm:text-sm'>Order placed: {new Date(order.createdAt).toDateString()}</span>
      </div>
      <hr className='my-2' />
      {Array.isArray(order?.products) &&
        order?.products.map(pro => {
          return (
            <React.Fragment key={pro._id}>
              <div className='grid h-fit max-h-fit gap-4 md:h-auto md:grid-cols-3'>
                <div className='flex flex-col items-center gap-4 md:flex-row'>
                  <Image src={pro.img} alt={pro.title} width={100} height={100} className='object-contain' />
                  <div className='flex flex-col justify-center gap-2'>
                    <h3 className='text-xs sm:text-sm'>{pro.title}</h3>
                    <div className='flex flex-col gap-1 text-sm'>
                      <div className='text-xs font-semibold sm:text-sm'>Rs: {pro.price}</div>
                    </div>
                  </div>
                </div>
                <div className='flex items-center justify-center gap-2 sm:flex-col'>
                  <span className='text-xs sm:text-sm'>Status</span>
                  <p
                    className={`rounded-full px-4 py-1 text-center text-xs font-semibold sm:text-sm ${background} ${color}`}
                  >
                    {order.orderStatus}
                  </p>
                </div>
                <div className='flex items-center justify-center gap-2 sm:flex-col'>
                  <span className='text-xs sm:text-sm'>Delivery expected by:</span>
                  <span className='text-xs sm:text-sm'>{new Date(order.ExpectedDelivery).toDateString()}</span>
                </div>
              </div>
            </React.Fragment>
          )
        })}
      <hr className='mt-2' />
    </div>
  )
}
