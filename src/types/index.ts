export interface NavItem {
    title:string;
    href:string;
    description?:string;
};

export interface NavItemWithChildren extends NavItem {
    card?:NavItemWithChildren[];
    menu?:NavItemWithChildren[];
}

export type MainNavItem =NavItemWithChildren;

export type Images = {
  id: number;
  path: string;
}

export type Products = {
  id: number;
  name: string;
  description: string;
  images: Images[];
  categoryId: string;
  price: number;
  discount: number;
  rating: number;
  inventory: number;
  status: string;
};

export type Tag = {
name:string;
}
export type Posts = {
  id: number;
  
  title: string;
  content: string;
  image: string;
  body: string;
  author: {
    fullName:string;
  };
  updatedAt: string;
  tags:Tag[];
};

export type Category={
  id:number;
  name:string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  imageUrl:string;
}

export type Cart ={
  id:number;
  name:string;
  price:number;
  quantity:number;
  image:{
    id:string;
    name:string;
    url:string;
  },
  category:string;
  subcategory:string;
}