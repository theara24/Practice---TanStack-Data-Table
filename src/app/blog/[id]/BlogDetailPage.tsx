'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogType } from '../../../types/blogtType'

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blogDetail, setBlogDetail] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}posts/${id}`);
        if (!res.ok) {
          setBlogDetail(null);
          return;
        }
        const data = await res.json();
        if (!data || !data.id) {
          setBlogDetail(null);
        } else {
          setBlogDetail(data);
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
        setBlogDetail(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (!blogDetail)
    return (
      <div className="text-center text-red-500 h-screen flex justify-center items-center">
        Blog not found
      </div>
    );

  return (
    <div className="w-[90%] mx-auto mt-5">
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{blogDetail.title}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            By{' '}
            <Link href={`/users/${blogDetail.userId}`} className="text-blue-500 hover:underline">
              {blogDetail.author}
            </Link>
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Content</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {blogDetail.content}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}