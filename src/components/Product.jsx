'use client'
import { useEffect, useState, useMemo } from 'react'
import ProductNotFound from './ProductNotFound'
import ProductItem from './ProductItem'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getAllProducts } from '@/redux/slices/productSlice'
import { ProductItemSkeleton } from './loaders/ProductItemSkeleton'

export default function Product({ sort, cat, filter }) {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(({ product }) => product)

  const [page, setPage] = useState(1)
  const [allProducts, setAllProducts] = useState([])
  const [hasMore, setHasMore] = useState(true)

  const sanitizedFilter = useMemo(
    () => ({
      color: filter?.color === 'Color' ? null : filter?.color || null,
      size: filter?.size === 'Size' ? null : filter?.size || null
    }),
    [filter]
  )

  const filtersKey = JSON.stringify({ sort, cat, ...sanitizedFilter })

  const fetchProducts = () => {
    const payload = {
      offset: page,
      limit: 5,
      ...(cat && { category: cat }),
      ...(sanitizedFilter.color && { color: sanitizedFilter.color }),
      ...(sanitizedFilter.size && { size: sanitizedFilter.size }),
      ...(sort && { sort })
    }

    dispatch(getAllProducts(payload))
      .unwrap()
      .then(res => {
        if (res.products.length > 0) {
          setAllProducts(prev => [...prev, ...res.products])
          if (res.products.length < 5) setHasMore(false) // no more products
        } else {
          setHasMore(false)
        }
      })
  }

  // Detect filter/category/sort change and reset
  useEffect(() => {
    setPage(1)
    setAllProducts([])
    setHasMore(true)
  }, [filtersKey])

  // Fetch data when page or filters change
  useEffect(() => {
    if (hasMore) {
      fetchProducts()
    }
  }, [filtersKey, page])

  useEffect(() => {
    return () => {
      setAllProducts([])
    }
  }, [])

  return (
    <section className='container'>
      {!allProducts.length && !loading ? (
        <ProductNotFound title='Oops! No product Found' desc='Your filter did not match any product' />
      ) : (
        <div className='my-5 font-Urbanist'>
          <div className='grid grid-cols-2 place-items-center gap-5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5'>
            {allProducts.map(data => (
              <ProductItem data={data} key={data._id} />
            ))}
            {loading && Array.from({ length: 5 }).map((_, i) => <ProductItemSkeleton key={`skeleton-${i}`} />)}
          </div>

          {hasMore && (
            <div className='mt-10 grid w-full place-content-center'>
              <button
                className='border border-teal-700 bg-white p-2 text-xs transition-all duration-300 hover:bg-teal-700 hover:text-white sm:text-sm'
                disabled={loading}
                onClick={() => setPage(p => p + 1)}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
