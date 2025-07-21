import { ProductType } from '@/types/productType';
import Image from 'next/image';
import React from 'react';

interface ProductCardProps extends ProductType {
  hideAddToCart?: boolean;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  thumbnail,
  category,
  hideAddToCart,
}: ProductCardProps) {
  return (
    <div
      key={id}
      className="bg-white rounded-2xl overflow-hidden shadow-lg max-w-sm transition-transform duration-200 hover:scale-105 hover:shadow-2xl border border-gray-100 flex flex-col"
    >
      <div className="relative w-full h-56 flex items-center justify-center bg-gray-50">
        <Image
          width={220}
          height={220}
          className="object-contain rounded-xl"
          src={thumbnail}
          alt={title}
          unoptimized
          priority
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow">
          SALE
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-1 line-clamp-1 text-gray-900">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2 flex-1">
          {description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-xl text-blue-600">${price}</span>
          {!hideAddToCart && (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow transition-all">
              Add To Cart
            </button>
          )}
        </div>
        <span className="mt-2 text-xs text-gray-400">Category: {category}</span>
      </div>
    </div>
  );
}
