import SidebarTypeElement from "./SidebarTypeElement";

interface Props {
  isOverFormBuilder: boolean;
}

const ELEMENT_TYPES_DATA = [
  { icon: "fa-solid:heading", name: "Heading" },
  { icon: "radix-icons:input", name: "Input" },
  { icon: "radix-icons:button", name: "Button" },
  { icon: "cuida:image-outline", name: "Image" },
  { icon: "lsicon:list-outline", name: "Selection" },
];

const SideBar = ({ isOverFormBuilder }: Props) => {
  return (
    <aside className="h-screen w-60 fixed">
      <div className="h-full bg-white shadow-xl">
        <ul className=" p-5 gap-3 w-full  pt-20 grid grid-cols-2">
          {ELEMENT_TYPES_DATA.map((element) => (
            <SidebarTypeElement
              key={element.name}
              isOverFormBuilder={isOverFormBuilder}
              icon={element.icon}
              name={element.name}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
