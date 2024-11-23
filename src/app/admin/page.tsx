import Button from "@/components/elements/Button";
import UserDeleteButton from "@/features/users/UserDeleteButton";
import { getAllUsers } from "@/lib/functions/fetchDB/fetchUser";
import Link from "next/link";

const Admin = async () => {
  const users = await getAllUsers();

  return (
    <section className="min-h-[calc(100vh-144px)] flex flex-col items-center justify-start p-5 gap-3 overflow-y-auto">
      <h2 className="text-3xl">Admin Page</h2>
      <ol>
        {users.map((user) => {
          return (
            <li key={user._id} className="flex gap-2 justify-between items-center p-2 border-b-2 last:border-b-0">
              <p>{user.name}</p>
              <UserDeleteButton user={user} />
            </li>
          );
        })}
      </ol>
      <br />
      <div>
        <Link href="/">
          <Button type="button">Home</Button>
        </Link>
      </div>
    </section>
  );
};

export default Admin;
