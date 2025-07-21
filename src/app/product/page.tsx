'use client';
import ProductCard from '@/components/product/ProductCard';
import React from 'react';
import Link from 'next/link';
import { useGetProductsQuery } from '@/lib/api/productsApi';
import { ProductType } from '@/types/productType';
import Loading from '../loading';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cartSlice';

export default function ProductPage() {
  const { data, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();
  if (isLoading) return <Loading/>;
  if (error) return <p className='text-red-500 text-center'>Failed to load products</p>;
  const products = data?.products as ProductType[];

  return (
    <section className='w-[90%] mx-auto my-10'>
      <h2 className='font-bold text-[24px] text-blue-500 mt-32 uppercase'>Product Page</h2>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
        {products.map((product: ProductType) => (
          <div key={product.id} className='no-underline'>
            <Link href={`/product/${product.id}`}>
              <ProductCard
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                thumbnail={product.thumbnail}
                category={product.category}
                hideAddToCart
              />
            </Link>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
