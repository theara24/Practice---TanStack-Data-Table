import BlogCard from '@/components/blog/BlogCard';
import React from 'react'

async function getBlog(){
  const blogs = await fetch(`${process.env.BASE_URL_API}posts`)
  const data = await blogs.json();
  return data.posts
}

export default  function Blog() {
  const blogs = getBlog();

  return (
    <div className="w-[90%] mx-auto mt-5">
      <BlogCard blogs={blogs} />
    </div>
  )
}
