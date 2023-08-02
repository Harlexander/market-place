import { create } from "zustand"

export const useEditProfileModal = create(set => ({
  isOpen : false,
  type : "personal",
  toggleModal : (type) => set((state) => ({ isOpen : !state.isOpen, type : type}))
}))
