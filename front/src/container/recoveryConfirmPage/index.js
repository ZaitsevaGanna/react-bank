import Button from "../../component/button";
import Field from "../../component/field";
import Header from "../../component/header";
import Page from "../../page";
import BackArrow from "../../component/back";
import FieldPass from "../../component/fieldPass";
import "./index.css";
import { useState } from "react";

export default function RecoveryConfirmPage() {
  const [newUserPassword, setnewPassword] = useState("");
  const [userCode, setCode] = useState("");

  const handleSetNewPassword = (e) => {
    setnewPassword(e.target.value);
  };

  const handleSetCode = (e) => {
    setCode(e.target.value);
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
        <Button
          href="/signin"
          text="Restore password"
          onClick={() =>
            console.log("Отправлено", { userCode, newUserPassword })
          }
        />
      </div>
    </Page>
  );
}
