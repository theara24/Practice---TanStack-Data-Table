import BlogDashboard from '../dashboard/BlogDashboard';

export default async function BlogDashboardPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}posts`);
  const data = await response.json();
  return <BlogDashboard initialBlogs={data.posts} />;
}
