import "./index.css";

export default function Header({ title, description }) {
  return (
    <div className="header">
      <h1 className="title">{title}</h1>
      <p className="description">{description}</p>
    </div>
  );
}
