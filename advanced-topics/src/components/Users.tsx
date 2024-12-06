import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  [k: string]: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getUsers() {
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(data);
    }

    getUsers();
  }, []);

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Users;
