'use client';
import ProductCard from '@/components/product/ProductCard';
import React from 'react';
import Link from 'next/link';
import { useGetProductsQuery } from '@/lib/api/productsApi';
import { ProductType } from '@/types/productType';
import Loading from '../loading';

export default function ProductPage() {
  // Using RTK Query to fetch products
  const { data, isLoading, error } = useGetProductsQuery();
  if (isLoading) return <Loading />;
  if (error)
    return <p className="text-red-500 text-center">Failed to load products</p>;
  const products = data?.products as ProductType[];

  return (
    <section className="w-[90%] mx-auto my-10">
      <h2 className="font-bold text-[24px] text-blue-500 mt-32 uppercase">
        Product Page
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {products.map((product: ProductType) => (
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
