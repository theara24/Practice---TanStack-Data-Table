'use client';
import CardUser from '@/components/card-user/CardUser';
import { UserType } from '@/types/userType';
import React, { useEffect, useState, useMemo } from 'react';

export default function User() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users || data);
        setLoading(false);
      })
      .catch((error) => {
        setUsers([]);
        setLoading(false);
        console.error('Error fetching users:', error);
      });
  }, []);

  // Debounced search
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Filter users by name, username, or email
  const filtered = useMemo(() => {
    if (!debouncedQuery) return users;
    const q = debouncedQuery.toLowerCase();
    return users.filter(
      (user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
    );
  }, [debouncedQuery, users]);

  return (
    <>
      <div className="w-[90%] mx-auto mt-10 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, username, or email..."
          className="p-2 w-full sm:w-[400px] border rounded focus:outline-none focus:ring focus:border-blue-400"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="ml-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-gray-700"
          >
            Clear
          </button>
        )}
      </div>

      <section className="w-[90%] mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            Loading users...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No users found.
          </div>
        ) : (
          filtered.map((user) => (
            <CardUser
              key={user.id}
              id={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              image={user.image}
              username={user.username}
              age={user.age}
              gender={user.gender}
              birthDate={user.birthDate}
            />
          ))
        )}
      </section>
    </>
  );
}