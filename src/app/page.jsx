import dynamic from 'next/dynamic'
import Category from '@/components/Category'

const DynamicSlider = dynamic(() => import('../components/Slider'), {
  loading: () => <p>Slider Loading...</p>
})
const DynamicProduct = dynamic(() => import('../components/Product'), {
  loading: () => <p>Product Loading...</p>
})

export default function Home() {
  return (
    <main>
      <DynamicSlider />
      <div className='font-Urbanist text-4xl font-medium mb-4 text-center'>Categories</div>
      <Category />
      <div className='font-Urbanist text-4xl font-medium mb-4 text-center'>Top Products</div>
      <DynamicProduct sort='top-purchased' cat='' filter='' />
    </main>
  )
}
