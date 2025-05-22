import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { products } from '@/data/porducts';
import { Link, useParams } from 'react-router'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProductsCard from '@/components/products/ProductsCard';

function ProductsDetail() {
    const {productsId} =useParams();
    const product = products.find((product) => product.id === productsId);

  return (
    <div className="container mx-auto px-4 md:px-0">
      <Button asChild variant="outline" className='mt-8'>
        <Link to="/products">
        <Icons.arrowLeft /> All Prouducts
        </Link>
      </Button>
      <section className=""></section>
      <section className="space-y-6 overflow-hidden">
        <h2 className="line-clamp-1 text-2xl font-bold">
          More Products from Furniture Shop
        </h2>
        <ScrollArea className="pb-8">
          <div className="flex gap-4">
            {products.slice(0,4).map((item) => (
              <ProductsCard  key={item.id} product={item} className="min-w-[260px]"/>

            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
       
      </section>
    </div>
  );
}

export default ProductsDetail