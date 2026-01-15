import ProductExplorer from "@/components/products/ProductExplorer";
import { fetchProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="mx-auto">
      <ProductExplorer initialProducts={products} />
    </main>
  );
}
