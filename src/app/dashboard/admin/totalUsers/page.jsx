// app/dashboard/admin/totalUsers/page.jsx
import { serverFetch } from '@/lib/core/server';
import React from 'react';
import Image from 'next/image';
import BlockButton from './BlockButton';

const getUsers = async () => {
  const res = await serverFetch("/api/users");
  return res || [];
};

const ManageUsersPage = async () => {
  const users = await getUsers();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users 👥</h1>
        <p className="text-sm text-gray-500">Block/unblock users and manage roles</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">User</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase">Package</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr key={user._id || user.email} className="hover:bg-gray-50/50">
                <td className="p-4 flex items-center gap-3">
                  <Image unoptimized
                    src={user.image || 'https://via.placeholder.com/40'}
                    alt={user.name || 'User'}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{user.name}</h3>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600 capitalize">{user.role}</td>
                <td className="p-4 text-sm text-gray-600">{user.plan || 'Free'}</td>
                <td className="p-4 text-right">
                  <BlockButton userId={user._id} isBlocked={user.isBlocked}   role={user.role}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersPage;