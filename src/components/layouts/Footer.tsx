import { Link } from "react-router";
import { Icons } from "../Icons";
import { siteConfig } from "@/config/site";
import  NewsLetterForm  from "@/components/new-letters";

function Footer() {
  return (
    <footer className="border-t">
      <div className="ml-4 w-full lg:ml-0">
        <div className="container mx-auto pt-6 pb-8 lg:py-6">
          <section className="flex flex-col gap-10 lg:justify-between lg:flex-row lg:gap-20">
            <section>
              <Link to="/" className="flex items-center space-x-2">
                <Icons.logo className="size-6" aria-hidden="true" />
                <span className="font-bold">{siteConfig.name}</span>
                <span className="sr-only">Home</span>
              </Link>
            </section>
            <section className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-4">
              {siteConfig.footerNav.map((foot) => (
                <div className="space-y-3" key={foot.title}>
                  <h4 className="font-medium">{foot.title}</h4>
                  <ul className="">
                    {foot.items.map((item) => (
                      <li className="" key={item.title}>
                        <Link
                          to={item?.href}
                          target={item.external ? "_blank" : undefined}
                          className="text-sm text-muted-foreground hover:text-foreground8"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section className=" space-y-3">
              <h4>Subscribe to our newsLetter</h4>
              <NewsLetterForm />
            </section>
          </section>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
