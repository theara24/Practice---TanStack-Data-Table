'use client';
import BlogCard from '@/components/blog/BlogCard';
import React, { useEffect, useState, useMemo } from 'react';

type BlogType = {
  id: string;
  title: string;
  content: string;
  userId: string;
  author: string; // Assuming the API provides this
};

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data.posts || data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Debounced search
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Filter blogs by title or author
  const filteredBlogs = useMemo(() => {
    if (!debouncedQuery) return blogs;
    const q = debouncedQuery.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(q) ||
        blog.author.toLowerCase().includes(q)
    );
  }, [debouncedQuery, blogs]);

  return (
    <div className="w-[90%] mx-auto mt-5">
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or author..."
          className="p-2 w-full sm:w-[400px] border rounded focus:outline-none focus:ring focus:border-blue-400"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
          >
            Clear
          </button>
        )}
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            Loading blogs...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No blogs found.
          </div>
        ) : (
          <BlogCard blogs={filteredBlogs} />
        )}
      </section>
    </div>
  );
}