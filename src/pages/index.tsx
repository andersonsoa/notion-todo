import type { NextPage } from "next";
import { BackgroundImage } from "../components/BackgroundImage";
import { Header } from "../components/Header";
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
            <input type="text" placeholder="Create a new todo..." />
          </form>

          <div>
            <div>
              <div>o</div>
              <div>Jag around the park 3x</div>
            </div>
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
