'use client';

import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { BlogType } from '../../../types/blogtType';

type BlogDashboardProps = {
  initialBlogs?: BlogType[];
};

export default function BlogDashboard({
  initialBlogs = [],
}: BlogDashboardProps) {
  const [blogs, setBlogs] = useState<BlogType[]>(initialBlogs);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [editBlog, setEditBlog] = useState<BlogType | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    author: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL_API}posts`;
        console.log('Fetching from:', url);
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Network response was not ok: ${response.status}`);
        const data = await response.json();
        console.log('API response:', data);
        // Handle different API response structures
        const blogData = data.posts || (Array.isArray(data) ? data : []);
        // If author is missing, fetch user data or use a fallback
        const blogsWithAuthor = await Promise.all(
          blogData.map(async (blog: BlogType) => {
            if (!blog.author && blog.userId) {
              const userRes = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}users/${blog.userId}`
              );
              if (userRes.ok) {
                const user = await userRes.json();
                return {
                  ...blog,
                  author: `${user.firstName} ${user.lastName}` || 'Unknown',
                };
              }
            }
            return { ...blog, author: blog.author || 'Unknown' };
          })
        );
        setBlogs(blogsWithAuthor);
        setFilteredBlogs(blogsWithAuthor);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        alert('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
    console.log('Filtered blogs:', filtered);
    setFilteredBlogs(filtered);
  }, [search, blogs]);

  const handleEdit = (id: string | number) => {
    const blog = blogs.find((b) => b.id === id.toString());
    if (blog) {
      setEditBlog(blog);
      setEditForm({
        title: blog.title,
        content: blog.content,
        author: blog.author,
      });
      setShowEditModal(true);
    }
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBlog) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}posts/${editBlog.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...editBlog, ...editForm }),
        }
      );
      if (!res.ok) throw new Error('Failed to update blog');
      const updatedBlog = await res.json();
      setBlogs((prev) =>
        prev.map((b) => (b.id === editBlog.id ? updatedBlog : b))
      );
      setFilteredBlogs((prev) =>
        prev.map((b) => (b.id === editBlog.id ? updatedBlog : b))
      );
      setShowEditModal(false);
      setEditBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog');
    }
  };

  const handleDelete = (id: string | number) => {
    setDeleteBlogId(id.toString());
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteBlogId) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}posts/${deleteBlogId}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) throw new Error('Failed to delete blog');
      setBlogs((prev) => prev.filter((b) => b.id !== deleteBlogId));
      setFilteredBlogs((prev) => prev.filter((b) => b.id !== deleteBlogId));
      setShowDeleteDialog(false);
      setDeleteBlogId(null);
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const handleBlogDetail = (id: string | number) => {
    router.push(`/blog/${id}`);
  };

  const columns: TableColumn<BlogType>[] = [
    {
      name: 'Title',
      selector: (row: BlogType) => row.title,
      sortable: true,
      width: '250px',
    },
    {
      name: 'Author',
      selector: (row: BlogType) => row.author || 'Unknown',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="px-3 py-1 text-sm text-blue-500 rounded hover:text-blue-600"
          >
            <FaRegEdit className="w-[20px] h-[20px]" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="px-3 py-1 text-sm text-red-500 rounded hover:text-red-600"
          >
            <MdDeleteOutline className="w-[20px] h-[20px]" />
          </button>
          <button
            onClick={() => handleBlogDetail(row.id)}
            className="px-3 py-1 text-sm text-gray-300 rounded hover:text-gray-400"
          >
            <HiOutlineDotsHorizontal className="w-[20px] h-[20px]" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <section className="w-[100%] p-5">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 mt-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        title="Blog List"
        columns={columns}
        data={filteredBlogs}
        progressPending={loading}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 30, 50]}
      />
      {/* Edit Modal */}
      {showEditModal && editBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Content</label>
                <textarea
                  name="content"
                  value={editForm.content}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                  required
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Author</label>
                <input
                  type="text"
                  name="author"
                  value={editForm.author}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Delete Blog</h2>
            <p>Are you sure you want to delete this blog?</p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
