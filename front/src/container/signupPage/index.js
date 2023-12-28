import "./index.css";
import Button from "../../component/button";
import BackArrow from "../../component/back";
import Header from "../../component/header";
import Field from "../../component/field";
import FieldPass from "../../component/fieldPass";
import FieldLink from "../../component/fieldLink";
import AlarmBlock from "../../component/alarmBlock";
import Page from "../../page";
import React, { useState } from "react";

export default function SignupPage() {
  const [isFirstComponentVisible, setFirstComponentVisible] = useState(false);

  const handleSubmit = async (e) => {
    setFirstComponentVisible(false);
    e.preventDefault();

    try {
      // Отправка данных на сервер
      const response = await fetch("http://localhost:4000/myusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("SignupPage response: ", response);

      console.log("Отправлено:", { email, password });

      switch (response.status) {
        case 201:
          console.log("Пользователь создан");
          window.location.assign("/signup-confirm");
          break;
        case 400:
          console.log("Неправильно ввели данные");
          break;
        case 409:
          console.log("Пользователь с таким email уже существует");
          setFirstComponentVisible(true);
          break;
        case 500:
          console.log("Данные успешно отправлены на сервер!");
          break;
        default:
          console.log("Неопрацьований статус", response.status);
          break;
      }

      // if (response.ok) {
      //   //window.location.assign("/balance");
      //   console.log("Отправлено:", { email, password });
      //   console.log("Данные успешно отправлены на сервер!");
      // } else {
      //   console.error("Неправильно ввели данные");
      // }
    } catch (error) {
      console.error("Произошла ошибка на клиенте", error);
    }
  };

  // Ваша логика обработки формы

  const [email, setUseremail] = useState("");

  const [password, setPassword] = useState("");

  const handleUserEmailChange = (event) => {
    setUseremail(event.target.value);
    setFirstComponentVisible(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  console.log({ password, email });
  return (
    <Page>
      <div className="signupPage">
        <BackArrow />
        <Header title="Sign up" description="Choose a registration method" />
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
          href="/signin"
          text="Already have an account?"
          textLink="Sing In"
        />
        <Button text="Continue" href="/signup-confirm" onClick={handleSubmit} />
        {isFirstComponentVisible ? <AlarmBlock /> : null}
      </div>
    </Page>
  );
}
