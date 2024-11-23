import { auth } from "@/auth";
import UserTable from "@/components/user/UserTable";
import React from "react";

interface Props {
  searchParams: {
    page?: string;
    per_page?: string;
  };
}

const HomePage = async ({ searchParams }: Props) => {
  const session = await auth();
  const { page, per_page } = searchParams;
  return (
    <>
      <div className="container mx-auto max-w-7xl p-5">
        <h1 className="text-3xl font-semibold mt-10 text-center">
          Welcome to Xapiens
        </h1>
        <p className="text-center">Your token: {session?.user.token}</p>
        <h1 className="text-xl font-semibold mt-5 mb-3 text-center">
          Our Beloved Users
        </h1>
        <UserTable page={page!} per_page={per_page!} />
      </div>
    </>
  );
};

export default HomePage;
