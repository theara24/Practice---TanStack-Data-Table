'use client';
import Loading from '@/app/loading';
import { ProductType } from '@/types/productType';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

// async function getProduct({params}: {params: {id: string}}): Promise<ProductType | null> {
//     const paramsId = params;
//     const res = fetch(`${process.env.BASE_URL_API}products/${paramsId.id}`);
//     const data = (await res).json();
//     const product: ProductType = await data;
//     return product;
// }

export default function ProductDetail() {
    const {id} = useParams()
    console.log(id)

    const [productDetail, setProductDetail] = useState<ProductType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}products/${id}`)
                if (!res.ok) {
                    setProductDetail(null)
                    return
                }
                const data = await res.json()
                if (!data || !data.id) {
                    setProductDetail(null)
                } else {
                    setProductDetail(data)
                }
            } catch (error) {
                console.error('Failed to fetch product:', error)
                setProductDetail(null)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading) return <Loading />
    if (!productDetail) return (
        <div className="text-center text-red-500 h-screen flex justify-center items-center">
            Product not found
        </div>
    )

    return (
        <div className="w-[90%] mx-auto my-10">
            <div className="flex bg-white rounded-lg shadow dark:bg-gray-800 flex-col md:flex-row">
                <div className="relative w-full md:w-[50%] flex justify-center items-center">
                    <Image src={productDetail.thumbnail} alt={productDetail.title}
                    width={300}
                    height={300}
                    unoptimized
                    className="object-cover w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
                </div>
                <form className="flex-auto p-6">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">{productDetail.title}</h1>
                        <div className="text-xl font-semibold text-gray-500 dark:text-gray-300">${productDetail.price}</div>
                        <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">In stock</div>
                    </div>
                    <div className="flex items-baseline mt-4 mb-6 text-gray-700 dark:text-gray-300">
                        <div className="flex space-x-2">

                            <label className="text-center">

                                <input type="radio"
                                    className="flex items-center justify-center w-6 h-6 accent-violet-600 bg-gray-100 rounded-lg dark:bg-gray-600"
                                    name="size" value="xs" />XS
                            </label>
                            <label className="text-center">
                                <input type="radio" className="flex items-center justify-center w-6 h-6 accent-violet-600" name="size"
                                    value="s" />S
                            </label>
                            <label className="text-center">
                                <input type="radio" className="flex items-center justify-center w-6 h-6 accent-violet-600" name="size"
                                    value="m" />M
                            </label>
                            <label className="text-center">
                                <input type="radio" className="flex items-center justify-center w-6 h-6 accent-violet-600" name="size"
                                    value="l" />L
                            </label>
                            <label className="text-center">
                                <input type="radio" className="flex items-center justify-center w-6 h-6 accent-violet-600" name="size"
                                    value="xl" />XL
                            </label>
                        </div>
                        <a href="#"
                            className="hidden ml-auto text-sm text-gray-500 underline md:block dark:text-gray-300">Size
                            Guide
                        </a>
                    </div>
                    <div className="flex mb-4 text-sm font-medium">
                        <button type="button"
                            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg ">Buy
                            now</button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{productDetail.description}</p>
                    <p className="text-lg dark:text-gray-300 bg-blue-300 p-2 rounded-lg mt-5 text-white">Category : {productDetail.category}</p>
                </form>
            </div>
        </div>
    )
}
