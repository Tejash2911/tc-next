import ProductDetailPage from '@/views/app/productDetailPage'

export default function ProductPage({ params }) {
  return <ProductDetailPage id={params.id} />
}
