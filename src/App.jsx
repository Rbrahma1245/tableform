import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Form from "./Components/Form/Form";
import Display from "./Components/Display/Display";
import FetchApi from "./Components/API/FetchApi";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          {/* <Route path="/" exact element={<Form />} /> */}
          <Route path="/" exact element={<FetchApi />} />
          <Route path="/display" element={<Display />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
