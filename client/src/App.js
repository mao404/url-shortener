import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/home/Home";

function App() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  );
}

export default App;
