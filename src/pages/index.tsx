import type { NextPage } from "next";
import { BackgroundImage } from "../components/BackgroundImage";
import { Checkbox } from "../components/Checkbox";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
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
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-6 whitespace-nowrap w-2">
                    <Checkbox />
                  </td>
                  <td className="py-6 pr-6 whitespace-nowrap">Read for 1 hour</td>
                </tr>
              </tbody>
            </table>
          </div>

          <footer>
            <p>Drag and drop to reorder list</p>
          </footer>
        </main>
      </section>
    </Layout>
  );
};

export default Home;
