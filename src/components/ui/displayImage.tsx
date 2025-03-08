"use client";

import { useImageStore } from "@/app/services/imageStore";
import Image, { StaticImageData } from "next/image";
import { useEffect } from "react";
import { X } from "lucide-react";

// ✅ Display Component
const Display = ({ selectedImage }: { selectedImage: StaticImageData }) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg w-full h-full max-w-3xl mx-auto transition-colors overflow-hidden">
      {selectedImage && (
        <Image
          src={selectedImage}
          alt="Selected image"
          width={1200}
          height={800}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
          priority
        />
      )}
    </div>
  );
};

interface CalendarModalProps {
  onClose: () => void;
}

function DisplayImage({ onClose }: CalendarModalProps) {
  const selectedImage = useImageStore((state) => state.selectedImage);

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!selectedImage) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-auto h-auto max-w-[80vw] max-h-[80vh] animate-in fade-in zoom-in duration-300">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-2  top-2 rounded-full p-2 text-neutral-900 bg-white hover:bg-pink-300 dark:text-gray-400 dark:hover:text-neutral-900 dark:bg-neutral-900 dark:hover:bg-pink-300 z-10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <Display selectedImage={selectedImage} />
        </div>
      </div>
    </div>
  );
}

const DImage = () => {
  const setSelectedImage = useImageStore((state) => state.setSelectedImage);

  return <DisplayImage onClose={() => setSelectedImage(null)} />;
};
export default DImage;
