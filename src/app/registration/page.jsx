// "use client";
// import { authClient } from "@/lib/auth-client";
// import { Check } from "@gravity-ui/icons";
// import Link from "next/link";
// import { GrGoogle } from "react-icons/gr";
// import {
//   Button,
//   Card,
//   Description,
//   FieldError,
//   Form,
//   Input,
//   Label,
//   TextField,
// } from "@heroui/react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";

// export default function SignUpPage() {
//   const router = useRouter();


//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const name = e.target.name.value;
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const image = e.target.image.value;

//     const { error } = await authClient.signUp.email({
//       name,
//       email,
//       password,
//       image,
//     });

//     if (error) {
//       toast.error("Registration failed");
//       return;
//     }

//     await authClient.signOut();

//     toast.success("Registration successful! Please login.");
//     router.push("/login");
//   };

//   const handleGoogleLogin = async () => {
//     const { error } = await authClient.signIn.social({
//       provider: "google",
//       callbackURL: "/", 
//     });

//     if (error) {
//       toast.error("Google login failed");
//     }
//   };

//   return (
//     <Card className="border mx-auto w-[85%] lg:w-125 py-10 mt-5">
//       <h1 className="text-center text-2xl font-bold">Register</h1>

//       <Form
//         className="flex lg:w-96 w-[95%] mx-auto flex-col gap-4"
//         onSubmit={onSubmit}
//       >

//         <TextField isRequired name="name" type="text">
//           <Label>Name</Label>
//           <Input placeholder="Enter your name" />
//           <FieldError />
//         </TextField>

//         <TextField name="image" type="text">
//           <Label>Profile Image URL</Label>
//           <Input placeholder="Enter your image URL here" />
//           <Description>Add a profile image link</Description>
//           <FieldError />
//         </TextField>

//         <TextField
//           isRequired
//           name="email"
//           type="email"
//           validate={(value) => {
//             if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//               return "Please enter a valid email address";
//             }
//             return null;
//           }}
//         >
//           <Label>Email</Label>
//           <Input placeholder="john@example.com" />
//           <FieldError />
//         </TextField>

//         <TextField
//           isRequired
//           minLength={8}
//           name="password"
//           type="password"
//           validate={(value) => {
//             if (value.length < 8) {
//               return "Password must be at least 8 characters";
//             }
//             if (!/[A-Z]/.test(value)) {
//               return "Password must contain at least one uppercase letter";
//             }
//             if (!/[0-9]/.test(value)) {
//               return "Password must contain at least one number";
//             }
//             return null;
//           }}
//         >
//           <Label>Password</Label>
//           <Input placeholder="Enter your password" />
//           <Description>Must be at least 8 characters.</Description>
//           <FieldError />
//         </TextField>

//         <div className="flex gap-2">
//           <Button type="submit">
//             <Check />
//             Register
//           </Button>
//           <Button type="reset" variant="secondary" className='text-red-600'>
//             Reset
//           </Button>
//         </div>

//         <div className="text-center text-gray-500">OR</div>

//         <Button onClick={handleGoogleLogin} variant="outline" className="w-full">
//          <GrGoogle/> Continue with Google
//         </Button>

//         <p className="text-center text-sm mt-2">
//           Already registered?{" "}
//           <Link href="/login" className="text-blue-500 btn">
//             Login here
//           </Link>
//         </p>
//       </Form>
//     </Card>
//   );
// }

import React from 'react';

const page = () => {
    return (
        <div>
            Hala registration kor
        </div>
    );
};

export default page;