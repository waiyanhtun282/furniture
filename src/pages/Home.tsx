import { Button } from '@/components/ui/button';
import React from 'react'
import { Link } from 'react-router';
import Couch from "@/data/images/couch.png";

const HomePage = () => {
  return (
    <div className="container mx-auto mt-16">
      <div className="flex flex-col items-center lg:flex-row lg:justify-between">
        <div className=" text-center lg:text-left">
          <h1 className="">Modern Interior Design Studio</h1>
          <p className="">
            Furniture is an essential component of any living space, providing
            functionality, comfort, and aesthetic appeal.
          </p>
          <div className="">
            <Button asChild className="">
              <Link to="#">Shop Now</Link>
            </Button>
            <Button asChild className="">
              <Link to="#">Explore</Link>
            </Button>
          </div>
        </div>
        <img src={Couch} alt="c0uch png" className="" />
      </div>
    </div>
  );
}

export default HomePage;