import TypeElement from "./TypeElement";

const SideBar = () => {
  return (
    <aside className="h-screen flex flex-col items-center justify-center w-52 fixed">
      <ul className="bg-white p-5 flex flex-col gap-5 w-full h-7/10 rounded-r-xl shadow-xl">
        <TypeElement icon="fa-solid:heading" name="Heading" />
        <TypeElement icon="radix-icons:input" name="Input" />
        <TypeElement icon="radix-icons:button" name="Button" />
        <TypeElement icon="cuida:image-outline" name="Image" />
        <TypeElement icon="lsicon:list-outline" name="Selection" />
      </ul>
    </aside>
  );
};

export default SideBar;
