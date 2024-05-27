import { Categoris } from "@/utils/dummyData";
import CategoryItem from "./CategoryItem";

export default function Category() {
  return (
    <div className="container">
      <div className="font-Urbanist text-4xl font-medium mb-4 text-center">Categories</div>
      <div className="grid justify-between gap-y-5 place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-10">
        {Categoris.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
