import TypeElement from "./TypeElements";

interface Props {
  isOverFormBuilder: boolean;
}
const SideBar = ({ isOverFormBuilder }: Props) => {
  return (
    <aside className="h-screen flex flex-col items-center justify-center w-52 fixed">
      <ul className="bg-white p-5 flex flex-col gap-5 w-full h-7/10 rounded-r-xl shadow-xl">
        <TypeElement
          isOverFormBuilder={isOverFormBuilder}
          icon="fa-solid:heading"
          name="Heading"
        />
        <TypeElement
          isOverFormBuilder={isOverFormBuilder}
          icon="radix-icons:input"
          name="Input"
        />
        <TypeElement
          isOverFormBuilder={isOverFormBuilder}
          icon="radix-icons:button"
          name="Button"
        />
        <TypeElement
          isOverFormBuilder={isOverFormBuilder}
          icon="cuida:image-outline"
          name="Image"
        />
        <TypeElement
          isOverFormBuilder={isOverFormBuilder}
          icon="lsicon:list-outline"
          name="Selection"
        />
      </ul>
    </aside>
  );
};

export default SideBar;
