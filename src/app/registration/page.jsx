"use client";

import { authClient } from "@/lib/auth-client";
import { Checkbox } from "@heroui/react";
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";

import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";


export default function SignUpPage() {
  const router = useRouter();
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
     const image = e.target.image.value;
    const role = e.target.role.value;
    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        role
      });

      console.log("Signup Result:", result);

      if (result?.error) {
        toast.error(result.error.message || "Registration failed");
        return;
      }

      await authClient.signOut();

      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      console.log(result);

      if (result?.error) {
        toast.error(result.error.message || "Google login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Google login failed.");
    }
  };

  return (
    <Card className="border mx-auto w-[85%] lg:w-125 py-10 my-15">
      <h1 className="text-center text-2xl font-bold">Register</h1>

      <Form
        className="flex lg:w-96 w-[95%] mx-auto flex-col gap-4"
        onSubmit={onSubmit}
      >
        <TextField isRequired name="name" type="text">
          <Label>Name</Label>
          <Input placeholder="Enter your name here" />
          <FieldError />
        </TextField>

        <TextField name="image" type="text">
          <Label>Profile Image URL</Label>
          <Input placeholder="Enter your image URL here" />
          <Description>Add a profile image link</Description>
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
            ) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="ruhan@gmail.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={6}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 6) {
              return "Password must be at least 6 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[a-z]/.test(value)) {
              return "Password must contain at least one lowercase letter";
            }
            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>Must be at least 6 characters.</Description>
          <FieldError />
        </TextField>
           <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="role" className="text-sm font-semibold">Select Role</Label>
                            <select
                                id="role"
                                {...register("role", { required: "Role is required" })} className="w-full p-2 rounded-xl shadow">
                                <option value="user">
                                    User
                                </option>
                                <option value="seller">
                                    Seller
                                </option>
                                <option value="admin">
                                    Admin
                                </option>
                            </select>
                            {
                                errors.role && <p className="text-red-500">{errors.role.message}</p>
                            }
                        </div>

        <div className="flex justify-between gap-2">
          <Button type="submit" className="px-11 bg-emerald-600 hover:bg-white hover:text-emerald-500 hover:border">
            <Checkbox />
            Register
          </Button>

          <Button
            type="reset"
            variant="secondary"
            className="bg-red-600 text-white px-15 hover:bg-white hover:text-red-500 hover:border"
          >
            Reset
          </Button>
        </div>

        <div className="text-center text-gray-500">OR</div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full"
        >
          <GrGoogle />
          Continue with Google
        </Button>

        <p className="text-center text-sm mt-2">
          Already registered?{" "}
          <Link href="/login" className="text-blue-500 btn">
            Login here
          </Link>
        </p>
      </Form>
    </Card>
  );
}