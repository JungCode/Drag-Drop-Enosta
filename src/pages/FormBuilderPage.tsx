import EditableElementsList from "../components/EditableElementsList";
import SideBar from "../components/SideBar";

const FormBuilderPage = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <SideBar />
      <EditableElementsList />
    </div>
  );
};

export default FormBuilderPage;
