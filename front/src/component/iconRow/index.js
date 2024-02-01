import { Fragment } from "react";
import "./index.css";

export default function IconRow({ name }) {
  return (
    <Fragment>
      <div className="text">{name}</div>
      <div className="iconRow">
        <div className=" geometry first" />
        <div className=" geometry second" />
        <div className="geometry third" />
        <div className="geometry fought" />
        <div className="geometry fifth" />
        <div className="geometry sixth" />
        {/* <img src="1.png" />
            <img src="2.png" />
            <img src="3.png" />
            <img src="4.png" />
            <img src="5.png" />
            <img src="6.png" /> */}
      </div>
    </Fragment>
  );
}
