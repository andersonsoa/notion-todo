import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const data = trpc.useQuery(["get-todos"]);

  if (data.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-6xl w-full mx-auto">
      <h1 className="text-center">Notion TODO</h1>
      {Array.isArray(data.data) &&
        data.data.map((todo) => {
          return (
            <div className="mb-4" key={todo.id}>
              <p>{todo.task}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
