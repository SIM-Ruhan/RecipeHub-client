"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const MyProfile = () => {
  const { data: session, isLoading } = authClient.useSession();
  const user = session?.user;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-10">
        <p className="text-xl font-semibold">You are not logged in</p>
        <Link href="/login" className="btn mt-4">
          Login
        </Link>
      </div>
    );
  }

  return (
   <div className="w-80 md:w-[40%] mx-auto px-4 py-8 animate__animated animate__fadeIn">
  <h1 className="text-3xl font-bold text-center mb-8">My Profile</h1>

  <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
    
    {/* Profile Image */}
    <div className="w-32 h-32 mb-4">
      <Image
        src={user?.image}
        alt="profile"
        width={128}
        height={128}
        className="w-full h-full object-cover rounded-full border-4 border-gray-100 shadow-sm"
        referrerPolicy="no-referrer"
        unoptimized
      />
    </div>

    {/* Name */}
    <h2 className="text-xl md:text-2xl font-bold mt-2">
      {user?.name}
    </h2>

    {/* Email */}
    <p className="text-gray-500 mt-1">
      {user?.email}
    </p>


    {/* Button */}
    <Link href="/dashboard/seller/transaction/update">
      <button className="w-full md:w-auto mt-4 px-6 py-2 btn btn-soft btn-info">
        Update Profile
      </button>
    </Link>
  </div>
</div>
  );
};

export default MyProfile;