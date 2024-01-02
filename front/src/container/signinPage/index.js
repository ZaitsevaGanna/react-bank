import "./index.css";
import Button from "../../component/button";
import Page from "../../page";
import BackArrow from "../../component/back";
import Header from "../../component/header";
import Field from "../../component/field";
import FieldPass from "../../component/fieldPass";
import FieldLink from "../../component/fieldLink";

import React, { useState } from "react";

export default function SigninPage() {
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Отправка данных на сервер
  //     const response = await fetch("http://localhost:4000/myusers", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     console.log("SigninPage response: ", response);

  //     if (response.ok) {
  //       window.location.assign("/balance");
  //       console.log("Отправлено:", { email, password });
  //       console.log("Данные успешно отправлены на сервер!");
  //     } else {
  //       console.error("Ошибка при отправке данных на сервер");
  //     }
  //   } catch (error) {
  //     console.error("Произошла ошибка:", error);
  //   }
  // };

  // // Ваша логика обработки формы

  // const [email, setUseremail] = useState("");

  // const [password, setPassword] = useState("");

  // const handleUserEmailChange = (event) => {
  //   setUseremail(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };
  // console.log({ password, email });
  return (
    <Page>
      <div className="signinPage">
        <BackArrow />
        <Header title="Sign in" description="Select login method" />
        <Field
          name="Email"
          type="text"
          placeholder="введіть Вашу електронну  адресу"
          // action={handleUserEmailChange}
        />
        <FieldPass
          name="Password"
          placeholder="введіть Ваш пароль"
          // action={handlePasswordChange}
        />

        <FieldLink
          href="/recovery"
          text="Forgot your password?"
          textLink="Restore"
        />
        <Button
          text="Continue"
          href="/balance"
          // onClick={handleSubmit}
        />
      </div>
    </Page>
  );
}
