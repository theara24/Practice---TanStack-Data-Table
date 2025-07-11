import ProductCard from '@/components/product/ProductCard';
import React from 'react';
import { ProductType } from '@/types/productType';
import Link from 'next/link';

export default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}products`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  const products: ProductType[] = data.products;

  return (
    <section className="w-[90%] mx-auto my-10">
      <h2 className="font-bold text-[24px] text-blue-500 uppercase">
        Product Page
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="no-underline"
          >
            <ProductCard
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              thumbnail={product.thumbnail}
              category={product.category}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
