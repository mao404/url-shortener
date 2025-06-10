import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Shorten from "./pages/shorten/Shorten";
import Redirect from "./pages/redirect/Redirect";
import NotFound from "./pages/404/NotFound";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shorten" element={<Shorten />}></Route>
          <Route path="/:idShort" element={<Redirect />}></Route>
          <Route path="/404" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App; 