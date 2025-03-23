export interface NavItem {
    title:string;
    href:string;
    description?:string;
};

export interface NavItemWithChildren extends NavItem {
    card:NavItem[];
    menu:NavItem[];
}

export type MainNavItem =NavItemWithChildren;