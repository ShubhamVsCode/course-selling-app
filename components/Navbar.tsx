"use client";

import { useEffect } from "react";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { cn } from "@/lib/utils";
import { setUser, userSelector } from "@/store/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

export function Navbar({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  interface UserResponse extends AxiosResponse {
    user: IUser;
    message: string;
  }

  useEffect(() => {
    async function getUser() {
      await axios
        .post("/api/auth/check-user")
        .then((res) => res.data)
        .then(({ user }) => dispatch(setUser(user)))
        .catch((err) => {
          console.log(err?.message);
          return {};
        });
    }
    getUser();
  }, []);

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6 px-10 py-3 border-b",
        className
      )}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      {user ? (
        <Link
          href="/logout"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Logout
        </Link>
      ) : (
        <>
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Register
          </Link>
        </>
      )}
    </nav>
  );
}
