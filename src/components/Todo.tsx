import { RiCloseLine } from "react-icons/ri";
import { Checkbox } from "./Checkbox";

interface TodoProps {
  checked: boolean;
  text: string;
  toggleTodo?: () => void;
  removeTodo?: () => void;
}

export const Todo: React.FC<TodoProps> = ({ text, checked, toggleTodo, removeTodo }) => {
  return (
    <tr>
      <td className="p-6 whitespace-nowrap w-2 cursor-pointer" onClick={toggleTodo}>
        <Checkbox checked={checked} />
      </td>
      <td className={`py-6 pr-6 whitespace-nowrap cursor-pointer ${checked && "line-through text-gray-500"}`} onClick={toggleTodo}>
        {text}
      </td>
      <td className="p-6 whitespace-nowrap w-2 cursor-pointer" onClick={removeTodo}>
        <RiCloseLine size={28} className="text-gray-500" />
      </td>
    </tr>
  );
};
