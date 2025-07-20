import Category from '@/components/Category'
import Product from '@/components/Product'
import Slider from '@/components/Slider'
import Container from '@/components/Container'

export default function Home() {
  return (
    <Container>
      <Slider />
      <div className='text-center font-Urbanist text-xl font-medium sm:text-2xl'>Categories</div>
      <Category />
      <div className='text-center font-Urbanist text-xl font-medium sm:text-2xl'>Top Products</div>
      <Product sort='top-purchased' />
    </Container>
  )
}
