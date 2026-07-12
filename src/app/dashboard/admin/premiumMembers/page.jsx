
import { serverFetch } from '@/lib/core/server';
import React from 'react';
import Image from 'next/image';
import { MdOutlineWorkspacePremium } from "react-icons/md";

const getUsers = async () => {
  const res = await serverFetch("/api/users");
  return res || [];
};

const PremiumUsers = async () => {
  const users = await getUsers();

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-6 flex items-center gap-2">
        <h1 className="text-2xl font-bold">Premium Users </h1>
           <div className='text-xl font-bold bg-amber-300 rounded-full p-1'><MdOutlineWorkspacePremium />
       </div> 
      </div>

      <div className="rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="p-4 text-xs font-semibold uppercase">User</th>
              <th className="p-4 text-xs font-semibold uppercase">Role</th>
              <th className="p-4 text-xs font-semibold uppercase">Package</th>
   
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
                    <h3 className="font-semibold text-sm">{user.name}</h3>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </td>
                <td className="p-4 text-sm capitalize">{user.role}</td>
                <td className="p-4 text-sm">{user.plan || 'Free'}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PremiumUsers;
