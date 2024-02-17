import {
  Box,
  Input,
  InputGroup,
  FormControl,
  useColorMode,
  InputRightElement,
  Button,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

function ShortInput() {
  const { colorMode } = useColorMode();
  const [url, setUrl] = useState({
    fullUrl: "",
  });
  const [short, setShort] = useState();

  const handleChange = (e) => {
    setUrl((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/url", url);
      setShort(res.data.data.shortUrl);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      color={colorMode === "dark" ? "white" : "black"}
      w={"auto"}
      minH={"50vh"}
      overflow={"hidden"}
      border={"1px solid red"}
    >
      <AbsoluteCenter>
        <FormControl isRequired>
          <form onSubmit={handleSubmit}>
            <InputGroup size="md">
              <Input
                color={colorMode === "dark" ? "white" : "black"}
                name="fullUrl"
                w={"80vh"}
                pr="4.5rem"
                placeholder="Enter your link here"
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  color={colorMode === "dark" ? "white" : "black"}
                  type="submit"
                  h="1.75rem"
                  size="sm"
                  height={"5vh"}
                >
                  Shorten
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
        </FormControl>
        <Box border={"1px solid green"} width={"50vh"}>
          <h1>{short}</h1>
        </Box>
      </AbsoluteCenter>
    </Box>
  );
}

export default ShortInput;
