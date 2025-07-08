import FormBuilderPage from "./pages/FormBuilderPage";

import { Routes, Route } from "react-router-dom";
import Headers from "./components/Headers/Headers";
import Preview from "./pages/Preview";


function App() {
  return (
    <div>
      <Headers />
      <Routes>
        <Route path="/" element={<FormBuilderPage />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  );
}

export default App;