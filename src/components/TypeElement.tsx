import { Icon } from "@iconify/react";

interface Props {
  icon: string;
  name: string;
}
const TypeElement = ({ icon, name }: Props) => {
  return (
    <li className="bg-blue-600 text-white p-2 rounded-md flex  items-center gap-1 cursor-pointer hover:bg-blue-400 transition">
      <Icon icon={icon} />
      <span className="pl-1 border-l-1">{name}</span>
    </li>
  );
};

export default TypeElement;
