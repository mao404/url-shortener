import axios from "axios";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function Redirect() {
  const location = useLocation();
  const idShort = location.pathname;
  const dataFetchedRef = useRef(false);

  const getRedirect = async () => {
    try {
      const res = await axios.get(`/url${idShort}`);
      const url = res.data.data.fullUrl;
      window.location.replace(`${url}`);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    getRedirect();
  });
}

export default Redirect;
