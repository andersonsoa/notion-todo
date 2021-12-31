import { RiCheckFill } from "react-icons/ri";

interface CheckboxProps {
  checked?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked }) => {
  const checkedClass = checked ? "bg-gradient-to-br from-blue-400 to-pink-500" : "border-2";

  return (
    <div className={`h-7 w-7 rounded-full flex justify-center items-center border-gray-600 ${checkedClass}`}>
      {checked && <RiCheckFill />}
    </div>
  );
};
