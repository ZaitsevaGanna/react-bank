import "./index.css";
import { Link } from "react-router-dom";

export default function FieldLink({ text, textLink, href }) {
  return (
    <div className="field_link">
      <p className="text">{text}</p>
      <Link className="textLink" to={href}>
        {textLink}
      </Link>
    </div>
  );
}
