import { getAllUsers } from "@/lib/functions/fetchDB/fetchUser";
import Link from "next/link";

const UsersList = async () => {
  const users = await getAllUsers();

  return (
    <section className="h-[calc(100vh-144px)] flex flex-col items-center justify-start p-5 gap-3 overflow-y-auto">
      <h2 className="text-3xl">Users List</h2>
      <ol className="list-decimal">
        {users.map((user) => {
          return (
            <li key={user._id} className="text-xl p-2 border-b-2 last:border-b-0">
              <Link href={`/userslist/${user._id}`}>{user.name}</Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default UsersList;
