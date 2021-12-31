import type { NextPage } from "next";
import { FormEvent, useState } from "react";
import { BackgroundImage } from "../components/BackgroundImage";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import { Todo } from "../components/Todo";
import { Todos } from "../components/Todos";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const todos = trpc.useQuery(["get-todos"]);
  const mutation = trpc.useMutation(["create-todo"]);
  const updateTodo = trpc.useMutation(["update-todo-done"]);

  const [todo, setTodo] = useState("");

  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutation.mutateAsync({ todo });
    todos.refetch({});
    setTodo("");
  };

  const handleChangeTodo = async (id: string, done: boolean) => {
    await updateTodo.mutateAsync({ id, done: !done });
    todos.refetch({});
  };

  return (
    <Layout>
      <BackgroundImage />

      <section className="relative">
        <main className="max-w-xl w-full mx-auto px-4">
          <Header />

          <form onSubmit={handleAddTodo}>
            <Input value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Create a new todo..." name="todo" type="text" />
          </form>

          <div className="my-10 bg-gray-800 overflow-hidden sm:rounded-lg relative">
            {(mutation.isLoading || updateTodo.isLoading || todos.isRefetching) && (
              <div className="absolute inset-0 bg-gray-800 opacity-90 flex justify-center items-center">
                <p>Loading...</p>
              </div>
            )}
            <Todos>
              {todos.data?.map((todo) => (
                <Todo key={todo.id} text={todo.task} checked={todo.done} onClick={() => handleChangeTodo(todo.id, todo.done)} />
              ))}
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
