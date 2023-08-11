import { create } from "zustand"

export const useImageModal = create(set => ({
  isOpen : false,
  url : "",
  toggleModal : (url) => set((state) => ({ isOpen : !state.isOpen, url : url}))
}))
