import { Checkbox } from "./Checkbox";

interface TodoProps {
  checked: boolean;
  text: string;
}

export const Todo: React.FC<TodoProps> = ({ text, checked }) => {
  return (
    <tr>
      <td className="p-6 whitespace-nowrap w-2">
        <Checkbox checked={checked} />
      </td>
      <td className={`py-6 pr-6 whitespace-nowrap ${checked && "line-through text-gray-500"}`}>{text}</td>
    </tr>
  );
};
