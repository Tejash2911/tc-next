'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import Product from '@/components/Product'

const ProductListPage = () => {
  const params = useParams()
  let { category } = params

  if (category === 'all') category = null
  //filters logic
  const [filter, setFilter] = useState({})

  const handleFilters = e => {
    const value = e.target.value

    setFilter({
      ...filter,
      [e.target.name]: value
    })
  }

  //Sorting
  const [sort, setSort] = useState('newest')

  return (
    <>
      <div className='container font-Urbanist'>
        <h1 className='py-5 font-semibold text-xl sm:text-2xl capitalize'>{category || 'All Products'}</h1>
        <div className='flex justify-between pb-5'>
          <div className='text-xs sm:text-sm font-semibold'>
            <span className='mr-5'>Filter Products:</span>
            <select
              name='color'
              aria-label='color'
              onChange={handleFilters}
              className='p-1 border border-gray-400 mr-2 hover:shadow-md'
            >
              <option defaultValue='Color'>Color</option>
              <option>red</option>
              <option>green</option>
              <option>blue</option>
              <option>yellow</option>
              <option>black</option>
              <option>white</option>
            </select>
            <select
              name='size'
              aria-label='size'
              onChange={handleFilters}
              className='p-1 border border-gray-400 mr-2 hover:shadow-md'
            >
              <option defaultValue='Size'>Size</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
              <option>XXL</option>
              <option>XXXL</option>
            </select>
          </div>
          <div className='text-xs sm:text-sm font-semibold'>
            <span className='mr-5'>Sort Products:</span>
            <select
              name='sort'
              aria-label='sort'
              onChange={e => setSort(e.target.value)}
              className='p-1 border border-gray-400 mr-2 hover:shadow-md'
            >
              <option defaultValue='newest'>Newest</option>
              <option value='top-rated'>Top rated</option>
              <option value='top-purchased'>Most Purchased</option>
              <option value='top-reviewed'>Most reviewed</option>
              <option value='price-desc'>price(H T L)</option>
              <option value='price-asc'>Price(L T H)</option>
            </select>
          </div>
        </div>
      </div>
      <Product cat={category} filter={filter} sort={sort} />
    </>
  )
}

export default ProductListPage
