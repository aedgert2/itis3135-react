import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/introduction">Introduction</Link>
        <span> | </span>
        <Link to="/contract">Contract</Link>
      </nav>
  );
}
