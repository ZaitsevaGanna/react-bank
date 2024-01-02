import "./index.css";

export default function ButtonWhite({ href, text, red }) {
  return (
    <a className={`buttonWhite ${red ? `buttonRed` : ``}`} href={href}>
      {text}
    </a>
  );
}
