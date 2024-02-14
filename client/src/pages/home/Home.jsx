import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  AbsoluteCenter,
} from "@chakra-ui/react";

function Home() {
  return (
    <Box
      bg={"white"}
      w={"auto"}
      minH={"50vh"}
      overflow={"hidden"}
      border={"1px solid red"}
    >
      <AbsoluteCenter>
        <InputGroup size="md">
          <Input w={"80vh"} pr="4.5rem" placeholder="Enter your link here" />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" height={"5vh"}>
              Shorten
            </Button>
          </InputRightElement>
        </InputGroup>
      </AbsoluteCenter>
    </Box>
  );
}

export default Home;
