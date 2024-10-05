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
    <div className='bg-white w-full p-5 pt-2 shadow-md rounded-lg'>
      <div className='flex items-center justify-between my-2 flex-wrap'>
        <span className='bg-teal-700 text-white py-1 px-2 rounded-[1vmax]'>
          Order ID : {order.paymentInfo.razorpay_payment_id}
        </span>
        <span>Order placed : {new Date(order.createdAt).toDateString()}</span>
      </div>
      <hr />
      {Array.isArray(order?.products) &&
        order?.products.map(pro => {
          return (
            <React.Fragment key={pro._id}>
              <div className='grid grid-cols-3 m-2 max-h-fit h-[200px]'>
                <div className='h-full flex gap-6'>
                  <Image src={pro.img} alt={pro.title} width={100} height={100} className='object-contain' />
                  <div className='flex flex-col justify-center gap-5'>
                    <h3 className='text-xl font-semibold'>{pro.title}</h3>
                    <div className='flex flex-col gap-1'>
                      {/* <div className="h-5 w-5 border border-gray-600 rounded-full" style={{ background: pro.color }}></div> */}
                      {/* <div className="pr-1">Size: {pro.size}</div> */}
                      {/* <div className='pr-1'>Qty: {pro.quantity}</div> */}
                      <div className='text-xl font-semibold'>Rs: {pro.price}</div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                  <span>Status</span>
                  <p className={`font-semibold m-0 py-1 px-4 text-center rounded-full ${background} ${color}`}>
                    {order.orderStatus}
                  </p>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                  <span>Delivery expected by:</span>
                  <span className='text-xl font-semibold'>{new Date(order.ExpectedDelivery).toDateString()}</span>
                </div>
              </div>
            </React.Fragment>
          )
        })}
      <hr />
    </div>
  )
}
