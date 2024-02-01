import Button from "../../component/button";
import Field from "../../component/field";
import Header from "../../component/header";
import Page from "../../page";
import BackArrow from "../../component/back";
import AlarmBlock from "../../component/alarmBlock";
import "./index.css";
import { useState } from "react";

export default function SignupConfirmPage() {
  const [isFirstComponentVisible, setFirstComponentVisible] = useState(false);

  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setFirstComponentVisible(false);

    setCode(e.target.value);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(">================= code:", code, "id:", id);
    const json = JSON.stringify({ id, code });
    console.log(">================= json:", json);
    try {
      if (code) {
        const response = await fetch("http://localhost:4000/signup-confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: json,
        });

        console.log("Ответ", response);

        if (response.ok) {
          window.location.assign("/signin");
        } else {
          setFirstComponentVisible(true);
        }
      } else {
        setFirstComponentVisible(true);
      }
    } catch (e) {
      console.error("Произошла ошибка на клиенте", e);
    }
  };

  return (
    <Page>
      <div className="signupConfirmPage">
        <BackArrow />
        <Header
          title="Confirm account"
          description="Write the code you received"
        />
        <Field
          name="Code"
          type="text"
          placeholder={"000000"}
          action={handleChange}
        />
        <Button text="Confirm" onClick={handleSubmit} />
        {isFirstComponentVisible ? <AlarmBlock text="Wrong code" /> : null}
      </div>
    </Page>
  );
}
