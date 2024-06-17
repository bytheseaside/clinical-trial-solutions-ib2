"use client";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (!user) return (
    <main>
      <a href="/api/auth/login">Login</a>
    </main>
  );

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <main>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <a href="/api/auth/logout">Logout</a>
      </main>
    );
  }

}
