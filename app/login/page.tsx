"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/userSlice";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email should be at least 2 characters long",
    })
    .max(50, {
      message: "Email should be at most 50 characters long",
    })
    .email("Please enter a valid Email"),
  password: z
    .string()
    .min(6, "Passowrd should be at least 6 characters long")
    .max(12, "Password should be at most 12 characters long"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Login Successfully");
          return res.json();
        } else {
          console.log("Error on Register Page");
        }
      })
      .catch((error) => {
        console.log("Error on Register Page", error?.message);
      });

    if (res) {
      dispatch(setUser(res?.user));
      router.replace("/");
    }
  }

  return (
    <div className="h-[80vh] flex justify-center items-center">
      <main className="rounded-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-md w-[40rem]"
          >
            <h1 className="text-3xl text-center font-semibold">Login</h1>

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default LoginPage;
