import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const data = trpc.useQuery(["hello", { text: "Anderson" }]);

  return (
    <div className="max-w-6xl w-full mx-auto">
      <h1 className="text-center">Notion TODO</h1>
      {data.isLoading ? <p>Loading</p> : <p>{data.data?.greeting}</p>}
    </div>
  );
};

export default Home;
