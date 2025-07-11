'use client';

import { UserType } from '@/types/userType';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { TableColumn } from 'react-data-table-component';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { MdDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [users, setUser] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [editUser, setEditUser] = useState<UserType | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    birthDate: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}users`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data.users);
        setFilteredUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle search
  useEffect(() => {
    const filtered = users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  // Edit logic
  const handleEdit = (id: string) => {
    const user = users.find((u) => u.id.toString() === id);
    if (user) {
      setEditUser(user);
      setEditForm({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age.toString(),
        gender: user.gender,
        birthDate: user.birthDate,
      });
      setShowEditModal(true);
    }
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editUser) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}users/${editUser.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...editUser,
            ...editForm,
            age: Number(editForm.age),
          }),
        }
      );
      if (!res.ok) throw new Error('Failed to update user');
      await res.json();
      setUser((prev) =>
        prev.map((u) =>
          u.id === editUser.id
            ? { ...u, ...editForm, age: Number(editForm.age) }
            : u
        )
      );
      setFilteredUsers((prev) =>
        prev.map((u) =>
          u.id === editUser.id
            ? { ...u, ...editForm, age: Number(editForm.age) }
            : u
        )
      );
      setShowEditModal(false);
      setEditUser(null);
    } catch {
      alert('Failed to update user');
    }
  };

  // Delete logic
  const handleDelete = (id: string) => {
    setDeleteUserId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteUserId) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_API}users/${deleteUserId}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) throw new Error('Failed to delete user');
      setUser((prev) => prev.filter((u) => u.id.toString() !== deleteUserId));
      setFilteredUsers((prev) =>
        prev.filter((u) => u.id.toString() !== deleteUserId)
      );
      setShowDeleteDialog(false);
      setDeleteUserId(null);
    } catch {
      alert('Failed to delete user');
    }
  };

  // User detail navigation
  const handleUserDetail = (id: string) => {
    router.push(`/user/${id}`);
  };

  const columns: TableColumn<UserType>[] = [
    {
      name: 'Name',
      selector: (row: UserType) => row.firstName + ' ' + row.lastName,
      width: '200px',
      sortable: true,
    },
    {
      name: 'Age',
      selector: (row: UserType) => row.age,
      sortable: true,
    },
    {
      name: 'Gender',
      selector: (row: UserType) => row.gender,
    },
    {
      name: 'Date of Birth',
      selector: (row: UserType) => row.birthDate,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.id.toString())}
            className="px-3 py-1 text-sm text-blue-500  rounded hover:text-blue-600"
          >
            <FaRegEdit className=" w-[20px] h-[20px]" />
          </button>
          <button
            onClick={() => handleDelete(row.id.toString())}
            className="px-3 py-1 text-sm text-red-500 rounded hover:text-red-600"
          >
            <MdDeleteOutline className="w-[20px] h-[20px]" />
          </button>
          <button
            onClick={() => handleUserDetail(row.id.toString())}
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
          placeholder="Search by name..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 mt-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <DataTable
        title="User List"
        columns={columns}
        data={filteredUsers}
        progressPending={loading}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 30, 50]}
      />

      {/* Edit Modal */}
      {showEditModal && editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={editForm.age}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  value={editForm.gender}
                  onChange={handleEditFormChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Birth Date</label>
                <input
                  type="date"
                  name="birthDate"
                  value={editForm.birthDate}
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
            <h2 className="text-lg font-bold mb-4">Delete User</h2>
            <p>Are you sure you want to delete this user?</p>
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
