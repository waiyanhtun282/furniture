import { create } from 'zustand';
import { createJSONStorage,persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';


interface filterProductsState {
    categories?: string;
    types?: string;
}

const initialState: filterProductsState = {
    categories:  "",
    types: "",
}

type filterProductsActions = {
  setFilterCategoriesTypesProducts: (categories: string, types: string) => void;
  clearFilterProducts: () => void;
};


 const useFilterProductsStore = create<
  filterProductsState & filterProductsActions
>()(
    persist(
        immer((set,get) => ({
            ...initialState,

            setFilterCategoriesTypesProducts: (categories :string ,types :string) =>
                set((state) => {
                    state.categories = categories?.length ? categories : "";
                    state.types = types?.length ? types : "";
        }),
            

        getFilterProducts: () => {
            const { categories, types } = get();
            const getCategories = categories ? `&categories=${categories}` : "";
            const getTypes = types ? `&types=${types}` : "";
            return `/products?${getCategories}${getTypes}`;
        },
            clearFilterProducts: () => set(initialState),
        }),
    ),

    {
        name: 'filter-products-storage',
        storage: createJSONStorage(() => sessionStorage),
    }
)
);

export default  useFilterProductsStore;