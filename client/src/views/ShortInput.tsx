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
  Text,
} from "@chakra-ui/react";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface UrlState {
  fullUrl: string;
}

const ShortInput: React.FC = () => {
  const { colorMode } = useColorMode();
  const [url, setUrl] = useState<UrlState>({
    fullUrl: "",
  });
  const [short, setShort] = useState<string | undefined>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(url);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post("/url", url);
      setShort(res.data.data.shortUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const [copySuccess, setCopySuccess] = useState<string>("");

  const currentUrl = window.location.href;

  const copyToClipBoard = async (copyMe: string) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  return (
    <>
      <Center>
        <Text
          color={colorMode === "dark" ? "white" : "black"}
          as="b"
          fontSize="3xl"
          mb={"10px"}
        >
          Shorten URL
        </Text>
      </Center>
      <Center>
        <Text as="b" fontSize="md" color="grey">
          Paste the URL to be shortened
        </Text>
      </Center>
      <Box
        color={colorMode === "dark" ? "white" : "black"}
        w={"auto"}
        minH={"50vh"}
        overflow={"hidden"}
      >
        <AbsoluteCenter position="relative" h="10rem">
          <FormControl isRequired padding={"1rem"}>
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
                    colorScheme="teal"
                    variant="solid"
                    color={colorMode === "dark" ? "black" : "white"}
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
                          colorScheme="teal"
                          variant="solid"
                          color={colorMode === "dark" ? "black" : "white"}
                          h="1.75rem"
                          size="sm"
                          onClick={() =>
                            copyToClipBoard(`${currentUrl}${short}`)
                          }
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
    </>
  );
}

export default ShortInput; 