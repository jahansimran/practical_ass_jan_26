"use client";
import { Product } from "@/types/product";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const router = useRouter();
  const route = `/products/${product.id}`;

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className={`h-64 w-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-0" : "opacity-0"
          }`}
        />
        <button
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isFavorite
              ? "bg-red-500 text-white scale-110"
              : "bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white"
          }`}
        >
          <Heart
            size={20}
            fill={isFavorite ? "currentColor" : "none"}
            className="transition-all duration-300"
          />
        </button>

        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-white/90 text-gray-800 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
          }`}
        >
          {product.category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-neutral-900 line-clamp-2 mb-2 min-h-14 group-hover:text-neutral-800 transition-colors duration-300">
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${product.price}
          </span>
          <button
            className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-linear-to-r from-neutral-600 to-neutral-700 hover:from-neutral-400 hover:to-neutral-800 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => router.push(route)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
