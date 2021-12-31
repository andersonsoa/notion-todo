import type { NextPage } from "next";
import { BackgroundImage } from "../components/BackgroundImage";
import { Checkbox } from "../components/Checkbox";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import { Todo } from "../components/Todo";
import { Todos } from "../components/Todos";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const data = trpc.useQuery(["get-todos"]);

  return (
    <Layout>
      <BackgroundImage />

      <section className="relative">
        <main className="max-w-xl w-full mx-auto px-4">
          <Header />

          <form>
            <Input placeholder="Create a new todo..." name="todo" type="text" />
          </form>

          <div className="my-10 bg-gray-800 overflow-hidden sm:rounded-lg">
            <Todos>
              <Todo text="Read for 1 hour" checked={true} />
              <Todo text="Jag around the park 3x" checked={false} />
              <Todo text="Pick up groceries" checked={false} />
            </Todos>
          </div>

          <footer>
            <p className="text-center text-gray-500">Drag and drop to reorder list</p>
          </footer>
        </main>
      </section>
    </Layout>
  );
};

export default Home;
