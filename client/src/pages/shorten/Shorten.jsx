import { useState, useEffect, useRef } from "react";
import ThemeToggler from "../../components/ThemeToggler";
import axios from "axios";
import {
  Heading,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function Shorten() {
  const [fullUrl, setFullUrl] = useState([]);
  const dataFetchedRef = useRef(false);

  const fetchAllUrl = async () => {
    try {
      const res = await axios.get("/url");
      setFullUrl(res.data.data);
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (short) => {
    try {
      await axios.delete(`/url/${short}`);
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchAllUrl();
  }, []);

  return (
    <>
      <ThemeToggler />
      <Heading textAlign={"center"}>All URLs</Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>FullUrl</Th>
              <Th>Short</Th>
              <Th isNumeric>Clicks</Th>
            </Tr>
          </Thead>
          {fullUrl.map((data) => (
            <Tbody key={data._id}>
              <Tr>
                <Td>{data.fullUrl}</Td>
                <Td>{data.shortUrl}</Td>
                <Td isNumeric>{data.clicks}</Td>
                <Button
                  leftIcon={<DeleteIcon />}
                  colorScheme="pink"
                  variant="solid"
                  onClick={() => handleDelete(data.shortUrl)}
                >
                  Delete
                </Button>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
    </>
  );
}

export default Shorten;
