import Category from '@/components/Category'
import Product from '../components/Product'
import Slider from '../components/Slider'

export default function Home() {
  return (
    <main>
      <Slider />
      <div className='font-Urbanist text-4xl font-medium mb-4 text-center'>Categories</div>
      <Category />
      <div className='font-Urbanist text-4xl font-medium mb-4 text-center'>Top Products</div>
      <Product sort='top-purchased' cat='' filter='' />
    </main>
  )
}
