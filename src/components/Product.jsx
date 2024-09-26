'use client'
import axios from 'axios'
import ProductNotFound from './ProductNotFound'
import ProductItem from './ProductItem'
import { useAppDispatch } from '@/redux/hooks'
import { useEffect, useState } from 'react'
import { setError } from '@/redux/slices/errorSlice'
import { axiosInstance } from '@/lib/axios'

export default function Product(props) {
  const { sort, cat, filter } = props
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const { color, size } = filter || {}
  const [prevFilters, setPrevFilters] = useState({ color: null, size: null, sort: null })
  const dispatch = useAppDispatch()

  useEffect(() => {
    setPrevFilters({ sort, color, size })
    setPage(1)
  }, [sort, color, size])

  // filter products logic
  useEffect(() => {
    filter && filter.color === 'Color' && delete filter.color
    filter && filter.size === 'Size' && delete filter.size
  }, [filter])

  useEffect(() => {
    //axios req used to cancel prev request
    const axiosCancelToken = axios.CancelToken.source()
    let url = `/product/all?page=${page}`
    if (cat) url += `&category=${cat}`
    if (color) url += `&color=${color}`
    if (size) url += `&size=${size}`
    if (sort) url += `&sort=${sort}`

    const getProducts = async () => {
      try {
        const res = await axiosInstance.get(url, { cancelToken: axiosCancelToken.token })
        const filtersChanged = JSON.stringify(prevFilters) !== JSON.stringify({ sort, color, size }) //checking if a filtering is changed
        if (filtersChanged) {
          //if changed then set new product
          setProducts(res.data.data)
        } else {
          // Filter out existing products with the same key
          const newProducts = res.data.filter(newProduct => {
            return !products.some(existingProduct => existingProduct._id === newProduct._id)
          })

          // Append new products to existing products
          setProducts(prevProducts => [...prevProducts, ...newProducts])
        }
      } catch (error) {
        if (error?.response?.status === 404) return dispatch(setError(error?.response?.data?.message))
        if (axios.isCancel(error)) return setProducts([]) //req canceled by user

        dispatch(setError(error?.response?.data?.message))
      }
    }
    getProducts()

    return () => {
      axiosCancelToken.cancel()
    }
  }, [cat, page, color, size, sort]) // eslint-disable-line

  return (
    <section className='container'>
      {!products?.length ? (
        <ProductNotFound title='Ops! No product Found' desc='Your filter did not match any product' />
      ) : (
        <div className='flex flex-col gap-10 justify-between items-center font-Urbanist mb-10'>
          <div className='flex justify-center items-center flex-wrap gap-10'>
            {products.map(data => (
              <ProductItem data={data} key={data._id} />
            ))}
          </div>
          <button
            className='p-2 text-sm border border-teal-700 bg-white transition-all duration-300 hover:bg-teal-700 hover:text-white'
            onClick={() => setPage(p => p + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  )
}
