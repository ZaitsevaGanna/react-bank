import "./index.css";
import { Link } from "react-router-dom";

export default function Button({ href, text, onClick }) {
  return (
    <Link className="buttonBlue" to={href} onClick={onClick}>
      {text}
    </Link>
  );
}
