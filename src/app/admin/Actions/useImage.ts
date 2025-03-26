"use client";
import { useState, useEffect } from "react";
import {
  deleteImageAction,
  fetchImages,
  uploadImageAction,
} from "./uploadImages";

type image = {
  id: number;
  catid: number;
  url: string;
};

export default function useImage() {
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState<image[]>([]);
  const [file, setFile] = useState<File[]>([]);
  const [catid, setCatid] = useState("");
  const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(false);
  

  async function refreshImage() {
    setLoading(true);

  try{    
    const imageData = await fetchImages();
    setImage(
      imageData.map((img) => ({
        ...img,
        catid: img.catid || 0,
        url: img.url || "",
      }))
    );
  }
  catch(e){
    console.error(e);
  }
  finally{
    setLoading(false);
  }
}

  useEffect(() => {
    refreshImage();
  }, []);

  async function handleImageSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file || !catid) {
      setMessage("Please select a file and category.");
      return;
    }

    setImageLoading(true);
    setMessage("");
    const results = await Promise.all(
      file.map((f) => uploadImageAction(f, Number(catid)))
    );

    const success = results.every((result) => result.success);
    if (success) {
      setMessage("All images uploaded successfully!");
      await refreshImage();
      setFile([]);
      setCatid("");
    } else {
      setMessage("Some uploads failed.");
    }

    // if (result.success) {
    //   setMessage("Image uploaded successfully!");
      
    // } else {
    //   setMessage("Upload failed.");
    // }

    setImageLoading(false);
  }

  async function handleDeleteImage(id: number) {
    await deleteImageAction(id);
    await refreshImage();
  }

  return {
    imageLoading,
    handleDeleteImage,
    image,
    file,
    message,
    catid,
    handleImageSubmit,
    setCatid,
    setFile,
    loading
  };
}
