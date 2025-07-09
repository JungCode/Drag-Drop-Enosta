import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  id: string | null;
  isSideBarItem?: boolean;
}
const EditableElementOverlay = ({
  isSideBarItem = false,
  id = "default",
}: Props) => {
  const height = id ? document.getElementById(id)?.offsetHeight : undefined;
  const width = id ? document.getElementById(id)?.offsetWidth : undefined;

  const style = isSideBarItem
    ? {
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }
    : undefined;
  const styleDragging = {
    zIndex: 9999999,
    height: `${height}px`,
    width: `${width}px`,
  };

  console.log(height, width);
  return (
    <li
      style={{ ...style, ...styleDragging }}
      className="relative flex justify-center items-center p-4 opacity-60 rounded-md text-xl text-center border border-dashed border-gray-400 hover:border-black hover:opacity-100 cursor-pointer bg-white"
    >
      {/* Turn into drag icons when the element came from sidebar */}
      {<Icon icon="fluent:drag-24-filled" />}
    </li>
  );
};

export default EditableElementOverlay;
