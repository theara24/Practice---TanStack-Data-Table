'use client';
import Link from 'next/link';
import { BlogType } from '../../types/blogtType'; // Define this type

type BlogCardProps = {
  blogs: BlogType[];
};

export default function BlogCard({ blogs }: BlogCardProps) {
  return (
    <>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white overflow-hidden shadow rounded-lg border p-4"
        >
          <Link href={`/blog/${blog.id}`}>
            <h2 className="text-lg font-medium text-gray-900">{blog.title}</h2>
          </Link>
          <p className="mt-1 text-sm text-gray-500 truncate">{blog.content}</p>
          <p className="mt-2 text-sm text-gray-700">
            By{' '}
            <Link href={`/users/${blog.userId}`} className="text-blue-500 hover:underline">
              {blog.author}
            </Link>
          </p>
        </div>
      ))}
    </>
  );
}