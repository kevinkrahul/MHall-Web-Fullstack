import {create} from "zustand";
import { StaticImageData } from "next/image";

interface ImageStore{
    selectedImage: StaticImageData | null;
    setSelectedImage: (image: StaticImageData | null) => void;
}

export const useImageStore = create<ImageStore>((set)=>({
    selectedImage: null,
    setSelectedImage: (image) => set({selectedImage: image}),
}));

