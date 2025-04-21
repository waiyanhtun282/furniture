import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import Couch from "@/data/images/couch.png";
import CarouselCard from "@/components/products/CarouselCard";
import { products } from "@/data/porducts";
function HomePage  () {
  const Title = ({
    title,
    href,
    sideText,
  }: {
    title: string;
    href: string;
    sideText: string;
  }) => (
    <div className=" mb-10 mt-28 flex flex-col md:flex-row md:justify-between md:px-0 px-4">
      <h2 className=" font-bold mb-4 text-2xl md:mb-0">{title}</h2>
      <Link  className=" font-semibold underline text-muted-foreground" to={href}>{sideText}</Link>
    </div>
  );


  return (
    <div className="container mx-auto mt-16">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="my-8 text-center lg:mt-20 lg:mb-0 lg:w-2/5 lg:text-left">
          <h1 className="mb-4 text-4xl font-extrabold text-[#3b5d50] lg:mb-8 lg:text-6xl">
            Modern Interior Design Studio
          </h1>
          <p className="mb-6 lg:mb-8">
            Furniture is an essential component of any living space, providing
            functionality, comfort, and aesthetic appeal.
          </p>
          <div>
            <Button
              asChild
              className="mr-2 rounded-full bg-orange-300 px-8 py-6 text-base font-bold"
            >
              <Link to="#">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 py-6 text-base font-bold text-[#3b5d50]"
            >
              <Link to="#">Explore</Link>
            </Button>
          </div>
        </div>
        <img src={Couch} alt="Couch" className="w-full lg:w-3/5" />
      </div>
      <div className="lg:px-5">
        <CarouselCard products={products} />
      </div>
      <Title title="Recent Blog" href="/blogs" sideText="View All Posts" />
    </div>
  );
};

export default HomePage;
