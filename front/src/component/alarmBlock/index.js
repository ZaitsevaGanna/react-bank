import "./index.css";

export default function AlarmBlock({ text, green }) {
  return (
    <div className={`alarm_block ${green ? `green` : ``}`}>
      <div className={`stop  ${green ? `withoutStop` : ``}`}></div>
      <div>{text}</div>
    </div>
  );
}
