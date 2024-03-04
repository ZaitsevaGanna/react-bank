import Button from "../../component/button";
import Field from "../../component/field";
import Header from "../../component/header";
import Page from "../../page";
import BackArrow from "../../component/back";
import FieldPass from "../../component/fieldPass";
import AlarmBlock from "../../component/alarmBlock";
import "./index.css";
import { useState } from "react";

export default function RecoveryConfirmPage() {
  const [isFirstComponentVisible, setFirstComponentVisible] = useState(false);
  const [newUserPassword, setnewPassword] = useState("");
  const [userCode, setCode] = useState("");

  const handleSetNewPassword = (e) => {
    setFirstComponentVisible(false);
    setnewPassword(e.target.value);
  };

  const handleSetCode = (e) => {
    setFirstComponentVisible(false);
    setCode(e.target.value);
  };

  const handleSubmit = async () => {
    if (userCode && newUserPassword) {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        // console.log(urlParams);
        const id = urlParams.get("id");
        // console.log(id);
        // const urlCode = urlParams.get("code");
        // console.log(urlCode);

        // if (urlCode == userCode) {
        const response = await fetch("http://localhost:4000/recovery-confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, userCode, newUserPassword }),
        });

        console.log(response);
        if (response.ok) {
          window.location.assign("/balance");
        } else {
          setFirstComponentVisible(true);
        }
      } catch (e) {
        console.error("Произошла ошибка на клиенте", e);
      }
    } else {
      setFirstComponentVisible(true);
    }
  };
  return (
    <Page>
      <div className="recoveryConfirmPage">
        <BackArrow />
        <Header
          title="Recover password"
          description="Write the code you received"
        />
        <Field
          name="Code"
          type="text"
          placeholder="введіть код"
          action={handleSetCode}
        />
        <FieldPass
          name="new Password"
          type="password"
          placeholder="введіть новий пароль"
          action={handleSetNewPassword}
        />
        <Button text="Restore password" onClick={handleSubmit} />
        {isFirstComponentVisible ? <AlarmBlock text="Wrong  code" /> : null}
      </div>
    </Page>
  );
}
