import { Routes, Route } from "react-router-dom";
import Preview from "./pages/Preview";
import Edit from "./pages/Edit";
import Header from "./modules/Header/components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Edit />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  );
}

export default App;
