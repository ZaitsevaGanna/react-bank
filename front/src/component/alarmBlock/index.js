import "./index.css";

export default function AlarmBlock({ text }) {
  return (
    <div className="alarm_block">
      <div className="stop"></div>
      <div>{text}</div>
    </div>
  );
}
