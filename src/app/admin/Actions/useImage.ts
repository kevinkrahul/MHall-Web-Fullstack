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
  const [file, setFile] = useState<File | null>(null);
  const [catid, setCatid] = useState("");
  const [message, setMessage] = useState("");

  async function refreshImage() {
    const imageData = await fetchImages();
    setImage(
      imageData.map((img) => ({
        ...img,
        catid: img.catid || 0,
        url: img.url || "",
      }))
    );
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
    const result = await uploadImageAction(file, Number(catid));

    if (result.success) {
      setMessage("Image uploaded successfully!");
      await refreshImage();
      setFile(null);
      setCatid("");
    } else {
      setMessage("Upload failed.");
    }

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
  };
}
