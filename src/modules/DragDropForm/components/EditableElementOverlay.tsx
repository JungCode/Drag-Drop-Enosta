import { Icon } from "@iconify/react/dist/iconify.js";
import useElementSize from "../hooks/useElementSize";

interface Props {
  id: string;
}
const EditableElementOverlay = ({ id }: Props) => {
  const [width, height] = useElementSize(id);
  const styleDragging = {
    zIndex: 9999999,
    height: height ? `${height}px` : undefined,
    width: width ? `${width}px` : undefined,
  };

  return (
    <li
      style={styleDragging}
      className="relative flex justify-center items-center p-4 opacity-60 rounded-md text-xl text-center border border-dashed border-gray-400 hover:border-black hover:opacity-100 cursor-pointer bg-white"
    >
      <Icon icon="fluent:drag-24-filled" />
    </li>
  );
};

export default EditableElementOverlay;
