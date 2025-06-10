import { useState, useEffect, useRef } from "react";
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
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface UrlData {
  _id: string;
  fullUrl: string;
  shortUrl: string;
  clicks: number;
}

const Shorten: React.FC = () => {
  const [fullUrl, setFullUrl] = useState<UrlData[]>([]);
  const dataFetchedRef = useRef(false);

  const fetchAllUrl = async () => {
    try {
      const res = await axios.get("/url");
      setFullUrl(res.data.data);
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (short: string) => {
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
      <Navbar />
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
      <Footer />
    </>
  );
}

export default Shorten; 