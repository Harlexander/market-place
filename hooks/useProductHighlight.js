import { create } from "zustand";

export const useProductHighlight = create( set => ({
    productId : "",
    setProductId : (id) => set(state => ({productId : id}))
}))