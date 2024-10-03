'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const PaymentSuccess = () => {
  const query = useSearchParams()
  const refID = query.get('reference')
  const router = useRouter()

  if (!refID) return router.push('/')

  return (
    <div className='h-screen flex flex-col items-center justify-center gap-3'>
      <h1>Payment Successful</h1>
      <p>ref_id: {refID}</p>
      <button
        className='p-2 text-sm border border-teal-700 bg-white transition-all duration-300 hover:bg-teal-700 hover:text-white'
        onClick={() => router.push('/')}
      >
        Home
      </button>
    </div>
  )
}

export default PaymentSuccess
