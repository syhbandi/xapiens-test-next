import BackButton from "@/components/user/BackButton";
import Image from "next/image";

type Response = {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
};
const getUser = async (id: string): Promise<Response> => {
  try {
    const response = await fetch(`${process.env.API_URL}/users/${id}`);
    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw error;
  }
};
const UserDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: user } = await getUser(id);
  return (
    <div className="container mx-auto max-w-7xl p-5">
      <h1 className="text-center font-semibold text-3xl mb-5">User Detail</h1>
      <div className="flex flex-col items-center justify-center space-y-3">
        <Image
          alt={user.first_name}
          width={200}
          height={200}
          src={user.avatar}
          className="rounded-full object-cover"
        />
        <div className="text-center">
          <p className="text-xl font-semibold">
            {user.first_name} {user.last_name}
          </p>
          <p className="mb-3">{user.email}</p>
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
