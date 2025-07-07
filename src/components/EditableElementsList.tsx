import EditableElement from "./EditableElement";

const EditableElementsList = () => {
  return (
    <div className="ml-52 px-52 min-h-screen h-full py-5">
      <ul className="bg-white h-full p-6 shadow-xl rounded-xl flex flex-col gap-2">
        <EditableElement />
        <EditableElement />
        <EditableElement />
      </ul>
    </div>
  );
};

export default EditableElementsList;
