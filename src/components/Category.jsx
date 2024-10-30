import { Categories } from '@/utils/dummyData'
import CategoryItem from './CategoryItem'

export default function Category() {
  return (
    <section className='container'>
      <div className='grid gap-y-5 place-items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 my-5'>
        {Array.isArray(Categories) && Categories.map(item => <CategoryItem key={item.id} item={item} />)}
      </div>
    </section>
  )
}
