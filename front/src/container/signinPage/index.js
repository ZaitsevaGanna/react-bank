import "./index.css";
import Button from "../../component/button";
import Page from "../../page";
import BackArrow from "../../component/back";
import Header from "../../component/header";
import Field from "../../component/field";
import FieldPass from "../../component/fieldPass";
import FieldLink from "../../component/fieldLink";
import AlarmBlock from "../../component/alarmBlock";
import { useAuth } from "../../component/authContext";

import { useState } from "react";

export default function SigninPage() {
  const { dispatch } = useAuth();
  const [isFirstComponentVisible, setFirstComponentVisible] = useState(false);

  const handleSubmit = async (e) => {
    setFirstComponentVisible(false);

    e.preventDefault();
    if (email && password) {
      try {
        // Отправка данных на сервер

        const response = await fetch("http://localhost:4000/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 400 || response.status === 500) {
          setFirstComponentVisible(true);
        } else if (response.status === 200) {
          //window.location.assign("/balance");

          console.log("В signin", data.token, data.user);

          return dispatch({
            type: "LOGIN",
            payload: {
              token: data.token,
              user: data.user,
            },
          });
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    } else {
      setFirstComponentVisible(true);
    }
  };

  // логика обработки формы

  const [email, setUseremail] = useState("");

  const [password, setPassword] = useState("");

  const handleUserEmailChange = (event) => {
    setFirstComponentVisible(false);
    setUseremail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setFirstComponentVisible(false);
    setPassword(event.target.value);
  };
  console.log({ password, email });
  return (
    <Page>
      <div className="signinPage">
        <BackArrow />
        <Header title="Sign in" description="Select login method" />
        <Field
          name="Email"
          type="text"
          placeholder="введіть Вашу електронну  адресу"
          action={handleUserEmailChange}
        />
        <FieldPass
          name="Password"
          placeholder="введіть Ваш пароль"
          action={handlePasswordChange}
        />

        <FieldLink
          href="/recovery"
          text="Forgot your password?"
          textLink="Restore"
        />
        <Button text="Continue" href="/balance" onClick={handleSubmit} />
        {isFirstComponentVisible ? (
          <AlarmBlock text="Wrong email or password" />
        ) : null}
      </div>
    </Page>
  );
}
