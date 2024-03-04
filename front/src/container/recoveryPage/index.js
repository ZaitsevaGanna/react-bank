import Button from "../../component/button";
import Field from "../../component/field";
import Header from "../../component/header";
import Page from "../../page";
import BackArrow from "../../component/back";
import AlarmBlock from "../../component/alarmBlock";
import { useState } from "react";
import "./index.css";

export default function RecoveryPage() {
  const [isFirstComponentVisible, setFirstComponentVisible] = useState(false);

  const [email, setUseremail] = useState("");

  const handleUserEmailChange = (event) => {
    setFirstComponentVisible(false);
    setUseremail(event.target.value);
  };

  const handleSubmit = async (e) => {
    setFirstComponentVisible(false);

    e.preventDefault();
    if (email) {
      try {
        // Отправка данных на сервер

        const response = await fetch("http://localhost:4000/recovery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        // const response = { status: 200 };
        console.log(response);
        const data = await response.json();

        if (response.status === 400 || response.status === 500) {
          setFirstComponentVisible(true);
        } else if (response.status === 200) {
          window.location.assign(`/recovery-confirm?&id=${data.id}`);
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    } else {
      setFirstComponentVisible(true);
    }
  };

  return (
    <Page>
      <div className="recoveryPage">
        <BackArrow />
        <Header
          title="Recover password"
          description="Choose a recovery method"
        />
        <Field
          name="Email"
          type="email"
          placeholder="введіть Вашу електронну  адресу"
          action={handleUserEmailChange}
        />
        <Button
          href="/recovery-confirm"
          text="Confirm"
          onClick={handleSubmit}
        />
        {isFirstComponentVisible ? (
          <AlarmBlock text="A user with this email is not registered" />
        ) : null}
      </div>
    </Page>
  );
}
