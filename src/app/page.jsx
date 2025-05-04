import Category from '@/components/Category'
import Product from '../components/Product'
import Slider from '../components/Slider'

export default function Home() {
  return (
    <main>
      <Slider />
      <div className='text-center font-Urbanist text-xl font-medium sm:text-2xl'>Categories</div>
      <Category />
      <div className='text-center font-Urbanist text-xl font-medium sm:text-2xl'>Top Products</div>
      <Product sort='top-purchased' cat='' filter='' />
    </main>
  )
}
