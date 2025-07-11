'use client'

import { BlogType } from '@/types/blogtType'
import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'

export default function BlogCard({ blogs }: {
    blogs: Promise<BlogType[]>
}) {
    const allBlogs = use(blogs);
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {
            allBlogs.map((blog) => (
                <div key={blog.id} className="">
                    <div className="bg-white p-4 shadow-lg rounded-xl">
                        {/* <!-- image wrapper --> */}
                        <div>
                            <Link href="#">
                                <Image className="rounded-lg w-full h-auto object-cover"  
                                width={400}
                                height={250}
                                unoptimized
                                src="https://images.unsplash.com/photo-1624188327913-e0c59aaaa3ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxibGFjayUyMG1hbnxlbnwwfDB8fHwxNzE5NjAxMzQ2fDA&ixlib=rb-4.0.3&q=80&w=1080"
                                alt={blog.title} />
                            </Link>
                        </div>
                        
                        <div className="capitalize text-purple-900 font-semibold my-4 bg-purple-200 w-fit px-3 rounded-lg">
                            <p>article</p>
                        </div>
                        {/* <!-- tag end --> */}
                        {/* <!-- article heading --> */}
                        <div className="text-2xl font-bold my-2 dark:text-white">
                            <a href="#">
                                <h2 className='line-clamp-1'>{blog.title}</h2>
                            </a>
                        </div>
                        
                        <div className="dark:text-gray-400">
                            <p className='line-clamp-3'>{blog.body}</p>
                        </div>
                        
                        <div className="flex items-cente">
                            {/* <!-- blogger img --> */}
                            <div className="mt-4">
                                <Image className="w-12 h-12 object-cover rounded-full" 
                                width={50}
                                height={50}
                                unoptimized
                                src="https://images.unsplash.com/photo-1624188327913-e0c59aaaa3ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxibGFjayUyMG1hbnxlbnwwfDB8fHwxNzE5NjAxMzQ2fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="image" />
                            </div>
                            {/* <!-- blogger img end -->
            <!-- blogger details --> */}
                            <div className="block mt-3.5">
                                {/* <!-- blogger name --> */}
                                <div className="capitalize text-lg font-semibold pl-4 dark:text-white">
                                    <h3>robert chunga</h3>
                                </div>
                                {/* <!-- blogger name end -->
                <!-- blog date --> */}
                                <div className="capitalize text-sm text-gray-400 pl-4">
                                    <p>Aug 15, 2021 · 16 min read</p>
                                </div>
                                {/* <!-- blog date end --> */}
                            </div>
                            {/* <!-- blogger details end --> */}
                        </div>
                        {/* <!-- blogger end --> */}
                    </div>
                </div>
            ))
        }
    </div>
    )
}
