import {
  Box,
  Input,
  InputGroup,
  FormControl,
  useColorMode,
  InputRightElement,
  Button,
  AbsoluteCenter,
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
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

  const [copySuccess, setCopySuccess] = useState("");

  const currentUrl = window.location.href;

  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };
  return (
    <Box
      color={colorMode === "dark" ? "white" : "black"}
      w={"auto"}
      minH={"50vh"}
      overflow={"hidden"}
    >
      <AbsoluteCenter>
        <FormControl isRequired padding={"2rem"}>
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
        {short && (
          <Center>
            <Box width={"50vh"}>
              <InputGroup size="md">
                <Input pr="4.5rem" value={short} />
                <InputRightElement width="4.5rem">
                  <Popover isLazy>
                    <PopoverTrigger>
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={() => copyToClipBoard(`${currentUrl}${short}`)}
                      >
                        Copy URL
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverBody>{copySuccess}</PopoverBody>
                    </PopoverContent>
                  </Popover>
                </InputRightElement>
              </InputGroup>
            </Box>
          </Center>
        )}
      </AbsoluteCenter>
    </Box>
  );
}

export default ShortInput;
