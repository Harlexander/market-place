import { create } from "zustand";

export const useProductHighlight = create( set => ({
    productId : "",
    productName : "",
    productImage : "",
    productPrice : "",
    setProductId : (product) => set(state => (product))
}))