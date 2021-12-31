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
  const [todo, setTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const todos = trpc.useQuery(["get-todos", { filter }]);
  const mutation = trpc.useMutation(["create-todo"]);
  const updateTodo = trpc.useMutation(["update-todo-done"]);

  const handleAddTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutation.mutateAsync({ todo });
    await todos.refetch();
    setTodo("");
  };

  const handleChangeTodo = async (id: string, done: boolean) => {
    await updateTodo.mutateAsync({ id, done: !done });
    todos.refetch({});
  };

  const filterClasses = (value: string) => (filter === value ? "text-blue-500 cursor-pointer" : "hover:text-gray-200 cursor-pointer");

  const completeds = todos.data?.filter((todo) => !todo.done);

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
                <Todo key={todo.id} text={todo.task} checked={todo.done} toggleTodo={() => handleChangeTodo(todo.id, todo.done)} />
              ))}
            </Todos>

            <div className="flex justify-between px-7 py-4 text-sm border-t border-gray-700 text-gray-500">
              <div className="hover:text-gray-200 cursor-pointer">{completeds && `${completeds.length} items left`}</div>

              <div className="flex gap-4">
                <p onClick={() => setFilter("all")} className={filterClasses("all")}>
                  All
                </p>
                <p onClick={() => setFilter("active")} className={filterClasses("active")}>
                  Active
                </p>
                <p onClick={() => setFilter("completed")} className={filterClasses("completed")}>
                  Completed
                </p>
              </div>

              <div className="hover:text-gray-200 cursor-pointer">Clear Completed</div>
            </div>
          </div>

          <footer>
            <p className="text-center text-sm text-gray-500">Drag and drop to reorder list</p>
          </footer>
        </main>
      </section>
    </Layout>
  );
};

export default Home;
