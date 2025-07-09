import SidebarTypeElement from "./TypeElements";

interface Props {
  isOverFormBuilder: boolean;
}

const ELEMENT_TYPES = [
  { icon: "fa-solid:heading", name: "Heading" },
  { icon: "radix-icons:input", name: "Input" },
  { icon: "radix-icons:button", name: "Button" },
  { icon: "cuida:image-outline", name: "Image" },
  { icon: "lsicon:list-outline", name: "Selection" },
];

const SideBar = ({ isOverFormBuilder }: Props) => {
  return (
    <aside className="h-screen flex flex-col items-center justify-center w-52 fixed">
      <ul className="bg-white p-5 flex flex-col gap-5 w-full h-7/10 rounded-r-xl shadow-xl">
        {ELEMENT_TYPES.map((element) => (
          <SidebarTypeElement
            key={element.name}
            isOverFormBuilder={isOverFormBuilder}
            icon={element.icon}
            name={element.name}
          />
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
