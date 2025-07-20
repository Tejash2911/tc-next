import { Categories } from '@/utils/dummyData'
import CategoryItem from './CategoryItem'

export default function Category() {
  return (
    <section>
      <div className='my-5 grid grid-cols-2 place-items-center gap-y-5 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5'>
        {Array.isArray(Categories) && Categories.map(item => <CategoryItem key={item.id} item={item} />)}
      </div>
    </section>
  )
}
