import { Routes, Route } from "react-router-dom";
import Headers from "./components/Headers/Headers";
import Preview from "./pages/Preview";
import Edit from "./pages/Edit";

function App() {
  return (
    <div>
      <Headers />
      <Routes>
        <Route path="/" element={<Edit />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  );
}

export default App;
