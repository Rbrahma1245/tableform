import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Components/Form/Form";
import Display from "./Components/Display/Display";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Form />} />
          <Route path="/display" element={<Display />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
