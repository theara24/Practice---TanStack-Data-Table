import { ProductType } from '@/types/productType'
import Image from 'next/image'
import React from 'react'

export default function ProductCard({ id, title, description, price, thumbnail, category }: ProductType) {
    return (
        <div key={id} className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm">
            <div className="relative">
                <Image
                    width={300}
                    height={300}
                    className="w-full" 
                    src={thumbnail} 
                    alt={title} 
                    unoptimized  
                />
                    <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
                    </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-medium mb-2 line-clamp-1">{title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
                <p className="text-gray-500 text-xs mb-2">Category: {category}</p>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">${price}</span>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}
