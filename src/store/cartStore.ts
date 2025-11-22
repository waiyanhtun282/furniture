import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    carts: CartItem[];
}

interface CartActions {
    getTotalItems: () => number;
    getTotalPrice: () => number;
    addItem: (item: CartItem) => void;
    updateItemQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

const initialState: CartState = {
    carts: [],
}
export const useCartStore = create<CartState & CartActions>()(
    persist(
        immer((set, get) => ({
            
            ...initialState,
            getTotalItems: () => {
                const { carts } = get();

                return carts.reduce((total, item) => total + item.quantity, 0);
            },
            getTotalPrice: () => {
                const { carts } = get();
                
                return carts.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            addItem: () =>{

            }
        })),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
)