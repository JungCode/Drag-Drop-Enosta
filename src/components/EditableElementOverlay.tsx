import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  id: string | null;
  isSideBarItem?: boolean;
}
const EditableElementOverlay = ({ id, isSideBarItem = false }: Props) => {
  const style = isSideBarItem
    ? {
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }
    : undefined;
  const name = id?.split("-")[0];
  return (
    <li
      style={style}
      className="h-28 flex justify-center items-center p-4 opacity-60 rounded-md text-xl text-center border border-dashed border-gray-400 hover:border-black hover:opacity-100 cursor-pointer bg-white"
    >
      {/* Turn into drag icons when the element came from sidebar */}
      {isSideBarItem ? <Icon icon="fluent:drag-24-filled" /> : name}
    </li>
  );
};

export default EditableElementOverlay;
