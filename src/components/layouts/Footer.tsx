import React from "react";
import { Link } from "react-router";
import { Icons } from "../Icons";
import { siteConfig } from "@/config/site";

function Footer() {
  return (
    <footer className=" w-full border-t ">
      <div className=" container mx-auto pb-8 pt-6  ml-4 lg:py-6  lg:ml-0">
        <section className="  flex flex-col lg:flex-row gap-10 lg:gap-20  ">
          <section>
            <Link to="/" className=" flex items-center space-x-2">
              <Icons.logo className="size-6" aria-hidden="true" />
              <span className="font-bold">{siteConfig.name}</span>
              <span className="sr-only">Home</span>
            </Link>
          </section>
          <section className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
            {siteConfig.footerNav.map((foot) => (
              <div className="" key={foot.title}>
                <h4 className="">{foot.title}</h4>
                <ul className="">
                    {
                        foot.items.map((item ) => (

                            <li className="" key={item.title}>
                                <Link to={item?.href}>
                                {item.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
              </div>
            ))}
          </section>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
