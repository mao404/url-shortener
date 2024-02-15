import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
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
      navigate("/shorten");
      console.log(short);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      bg={"white"}
      w={"auto"}
      minH={"50vh"}
      overflow={"hidden"}
      border={"1px solid red"}
    >
      <AbsoluteCenter>
        <form onSubmit={handleSubmit}>
          <InputGroup size="md">
            <Input
              name="fullUrl"
              required
              w={"80vh"}
              pr="4.5rem"
              placeholder="Enter your link here"
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button type="submit" h="1.75rem" size="sm" height={"5vh"}>
                Shorten
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </AbsoluteCenter>
    </Box>
  );
}

export default Home;
