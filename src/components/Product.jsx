import { publicRequest } from "@/utils/axiosRequestMethods";
import ProductNotFound from "./ProductNotFound";
import ProductItem from "./ProductItem";

async function getProduct() {
  try {
    const res = await publicRequest.get("/api/products/allinfo?page=1", { cache: "no-store " });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Product() {
  const products = await getProduct();
  return (
    <div className="container">
      {!products?.length ? (
        <ProductNotFound title="Opps! No product Found" desc="Your filter did not match any product" />
      ) : (
        <div className="flex flex-col gap-10 justify-between items-center font-Urbanist mb-5">
          <div className="flex justify-center items-center flex-wrap gap-10">
            {products.map((data) => (
              <ProductItem data={data} key={data._id} />
            ))}
          </div>
          <button className="p-2 text-sm border border-teal-700 bg-white transition-all duration-300 hover:bg-teal-700 hover:text-white">Load More</button>
        </div>
      )}
    </div>
  );
}
