import "./index.css";

export default function BackArrow() {
  const back = () => {
    window.history.back();
  };

  return <div className="backArrow" onClick={back}></div>;
}
