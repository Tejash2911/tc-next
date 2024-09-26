'use client'
import Product from '@/components/Product'
import { useParams } from 'next/navigation'
import { useState } from 'react'

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
    <div className='container font-Urbanist'>
      <h1 className='m-5 font-semibold text-3xl'>{category || 'All Products'}</h1>
      <div className='flex justify-between m-5'>
        <div className='text-xl font-semibold'>
          <span className='mr-5'>Filter Products:</span>
          <select
            name='color'
            aria-label='color'
            onChange={handleFilters}
            className='p-2 border border-black text-base mr-2 hover:shadow-md'
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
            className='p-2 border border-black text-base mr-2 hover:shadow-md'
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
        <div className='text-xl font-semibold'>
          <span className='mr-5'>Sort Products:</span>
          <select
            name='sort'
            aria-label='sort'
            onChange={e => setSort(e.target.value)}
            className='p-2 border border-black text-base mr-2 hover:shadow-md'
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
      <Product cat={category} filter={filter} sort={sort} />
    </div>
  )
}

export default ProductListPage
