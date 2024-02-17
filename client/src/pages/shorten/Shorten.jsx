function Shorten({ props }) {
  if (!props) {
    return <h1>There is no data</h1>;
  } else {
    return <h1>{props}</h1>;
  }
}

export default Shorten;
