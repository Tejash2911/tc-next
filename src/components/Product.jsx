'use client'
import { useEffect, useState, useMemo } from 'react'
import ProductNotFound from './ProductNotFound'
import ProductItem from './ProductItem'
import { useAllProducts } from '@/hooks/useProductQueries'
import { ProductItemSkeleton } from './loaders/ProductItemSkeleton'

export default function Product({ sort, cat, filter }) {
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

  const queryKey = JSON.stringify({ sort, cat, ...sanitizedFilter })

  // Query parameters for current page
  const queryParams = useMemo(
    () => ({
      offset: page,
      limit: 5,
      ...(cat && { category: cat }),
      ...(sanitizedFilter.color && { color: sanitizedFilter.color }),
      ...(sanitizedFilter.size && { size: sanitizedFilter.size }),
      ...(sort && { sort })
    }),
    [page, cat, sanitizedFilter, sort]
  )

  const { data: products, isLoading, isFetching } = useAllProducts(queryParams)

  // Detect filter/category/sort change and reset
  useEffect(() => {
    setPage(1)
    setAllProducts([])
    setHasMore(true)
  }, [queryKey])

  // Update products when new data arrives
  useEffect(() => {
    if (products) {
      if (page === 1) {
        // First page, replace all products
        setAllProducts(products)
      } else {
        // Additional pages, append to existing products
        setAllProducts(prev => [...prev, ...products])
      }

      // Check if there are more products
      if (products.length < 5) {
        setHasMore(false)
      }
    }
  }, [products, page])

  useEffect(() => {
    return () => {
      setAllProducts([])
    }
  }, [])

  return (
    <section>
      {!allProducts.length && !isLoading ? (
        <ProductNotFound title='Oops! No product Found' desc='Your filter did not match any product' />
      ) : (
        <div className='my-5'>
          <div className='grid grid-cols-2 place-items-center gap-5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5'>
            {allProducts.map(data => (
              <ProductItem data={data} key={data._id} />
            ))}
            {(isLoading || isFetching) &&
              Array.from({ length: 5 }).map((_, i) => <ProductItemSkeleton key={`skeleton-${i}`} />)}
          </div>

          {hasMore && (
            <div className='mt-10 grid w-full place-content-center'>
              <button
                className='border border-teal-700 bg-white p-2 text-xs transition-all duration-300 hover:bg-teal-700 hover:text-white sm:text-sm'
                disabled={isLoading || isFetching}
                onClick={() => setPage(p => p + 1)}
              >
                {isLoading || isFetching ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
