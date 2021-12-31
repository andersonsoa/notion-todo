export const Todos: React.FC = ({ children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-700">
      <tbody className="divide-y divide-gray-700">{children}</tbody>
    </table>
  );
};
