function Shorten({ data }) {
  if (!data) {
    return <h1>There is no data</h1>;
  } else {
    return <h1>{data}</h1>;
  }
}

export default Shorten;
