import dynamic from "next/dynamic";
import Category from "@/components/Category";

const DynamicSlider = dynamic(() => import("../components/Slider"), {
  loading: () => <p>Slider Loading...</p>,
});
const DynamicProduct = dynamic(() => import("../components/Product"), {
  loading: () => <p>Product Loading...</p>,
});

export default function Home() {
  return (
    <main>
      <DynamicSlider />
      <Category />
      <DynamicProduct />
    </main>
  );
}
