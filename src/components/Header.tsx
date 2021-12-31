import { RiSunLine } from "react-icons/ri";

export const Header = () => {
  return (
    <header className="py-8 md:mt-6 flex justify-between items-center">
      <h1 className="text-6xl font-bold">Todo List</h1>
      <RiSunLine className="cursor-pointer" size={28} />
    </header>
  );
};
