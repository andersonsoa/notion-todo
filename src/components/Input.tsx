import { Checkbox } from "./Checkbox";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="flex gap-6 bg-gray-800 rounded-md px-6 items-center">
      <Checkbox />
      <input {...props} className="bg-transparent text-xl py-6 outline-none flex-1" />
    </div>
  );
};
