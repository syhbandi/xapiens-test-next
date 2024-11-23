import { User } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getRowNumber } from "@/lib/utils";
import CustomPagination from "./pagination";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

type Response = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};
const getUsers = async (page: string, per_page: string): Promise<Response> => {
  const url = `${process.env.API_URL}/users`;
  const params = new URLSearchParams();

  if (page) params.set("page", page);
  if (per_page) params.set("size", per_page);

  try {
    const res = await fetch(`${url}?${params.toString()}`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to load Products");
  }
};

const UserTable = async ({
  page,
  per_page,
}: {
  page?: string;
  per_page?: string;
}) => {
  const {
    data,
    total,
    per_page: size,
    page: currentPage,
  } = await getUsers(page!, per_page!);
  return (
    <>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length ? (
            data.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{getRowNumber(currentPage, size, index)}</TableCell>
                <TableCell>
                  <Image
                    width={40}
                    height={40}
                    src={user.avatar}
                    alt={user.first_name}
                    className="rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell>{user.email}</TableCell>

                <TableCell>
                  <Link
                    href={`/dashboard/user/${user.id}`}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Detail
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-5">
        <CustomPagination totalPages={Math.ceil(total / size)} />
      </div>
    </>
  );
};

export default UserTable;
