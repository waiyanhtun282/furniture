import PaginationBottom from "@/components/products/Pagination";
import ProductsCard from "@/components/products/ProductsCard";
import ProductsFilters from "@/components/products/ProductsFilters"
import { products, filterList } from "@/data/porducts";


function Products() {
  return (
    <div className="container mx-auto">
      <section className="flex flex-col lg:flex-row">
        <section className="my-8 ml-4 w-full lg:ml-0 lg:w-1/5">
          <ProductsFilters filterList={filterList} />
        </section>
        <section className="w-full lg:w-4/5">
          <h1 className="my-8 ml-4 text-2xl font-bold lg:ml-0">All Products</h1>
          <div className="mb-12 grid grid-cols-1 gap-6 gap-y-12 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-3">
            {products.map((product) => (
              <ProductsCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </section>
      <PaginationBottom />
    </div>
  );
}

export default Products