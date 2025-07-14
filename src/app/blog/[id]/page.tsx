import { Metadata } from 'next';
import BlogDetailPage from './BlogDetailPage';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}posts/${params.id}`);
    if (!res.ok) {
      return { title: 'Blog not found' };
    }

    const blog = await res.json();

    return {
      title: blog?.title ?? 'Blog Detail',
      description: blog?.content?.slice(0, 160) ?? '',
      openGraph: {
        title: blog?.title,
        description: blog?.content?.slice(0, 160),
        images: [blog?.image || '/default-blog-image.jpg'],
      },
    };
  } catch {
    return {
      title: 'Blog not found',
    };
  }
}

export default function Page() {
  return <BlogDetailPage />;
}