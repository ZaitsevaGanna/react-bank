import "./index.css";
import { Link } from "react-router-dom";

export default function ButtonWhite({ href, text, red, onClick }) {
  return (
    <Link
      className={`buttonWhite ${red ? `buttonRed` : ``}`}
      to={href}
      onClick={onClick}
    >
      {text}
    </Link>
  );
}
