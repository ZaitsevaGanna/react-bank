import "./index.css";

import { useState } from "react";

export default function FieldPass({ name, placeholder, action }) {
  const [type, setType] = useState(true);

  const [password, setPassword] = useState("");

  const [showMessage, setShowMessage] = useState(false);

  const handlePasswordCheckHere = (event) => {
    const password = event.target.value;
    setPassword(password);

    if (password.length < 6) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  };

  const onOpenClick = () => {
    setType(!type);
  };

  return (
    <div className="field">
      <label
        className={showMessage ? "field_label_wrong " : "field_label "}
        htmlFor={name}
      >
        {name}
      </label>
      <div className="cont">
        <input
          onChange={handlePasswordCheckHere}
          onInput={action}
          type={type ? "password" : "text"}
          className={showMessage ? "field_input_wrong " : "field_input_pass "}
          name={name}
          placeholder={placeholder}
          value={password}
        />
        <div className={type ? "eye" : "eye_close"} onClick={onOpenClick}></div>
      </div>

      <p style={showMessage ? { color: "#F23152" } : { visibility: "hidden" }}>
        Sorry,the password is too simple
      </p>
    </div>
  );
}
