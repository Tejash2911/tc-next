'use client'
import { useEffect, useState } from 'react'
import ProductNotFound from './ProductNotFound'
import ProductItem from './ProductItem'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAllProducts } from '@/redux/slices/productSlice'
import { ProductItemSkeleton } from './loaders/ProductItemSkeleton'

export default function Product({ sort, cat, filter }) {
  const dispatch = useAppDispatch()
  const { products, loading } = useAppSelector(({ product }) => product)
  const [page, setPage] = useState(1)
  const { color, size } = filter || {}
  const [prevFilters, setPrevFilters] = useState({ color: null, size: null, sort: null })

  const handle = {
    getData: () => {
      const nPayload = {
        offset: page,
        limit: 5,
        ...(cat && { category: cat }),
        ...(color && { color: color }),
        ...(size && { size: size }),
        ...(sort && { sort: sort })
      }

      const filtersChanged = JSON.stringify(prevFilters) !== JSON.stringify({ sort, color, size })

      if (filtersChanged) {
        setPage(1)
        dispatch(getAllProducts(nPayload))
      } else {
        dispatch(getAllProducts(nPayload))
      }
    }
  }

  useEffect(() => {
    setPrevFilters({ sort, color, size })
    handle.getData()
  }, [sort, color, size, cat, page])

  useEffect(() => {
    if (filter?.color === 'Color') filter.color = null
    if (filter?.size === 'Size') filter.size = null
  }, [filter])

  return (
    <section className='container'>
      {!products?.length && !loading ? (
        <ProductNotFound title='Ops! No product Found' desc='Your filter did not match any product' />
      ) : (
        <div className='my-5 font-Urbanist'>
          <div className='grid grid-cols-2 place-items-center gap-5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5'>
            {loading
              ? Array.from({ length: 5 }).map((e, i) => <ProductItemSkeleton key={i} />)
              : Array.isArray(products) && products.map(data => <ProductItem data={data} key={data._id} />)}
          </div>
          <div className='mt-10 grid w-full place-content-center'>
            <button
              className='border border-teal-700 bg-white p-2 text-xs transition-all duration-300 hover:bg-teal-700 hover:text-white sm:text-sm'
              disabled={loading}
              onClick={() => setPage(p => p + 1)}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
