import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Shorten from "./pages/shorten/Shorten";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shorten" element={<Shorten />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
