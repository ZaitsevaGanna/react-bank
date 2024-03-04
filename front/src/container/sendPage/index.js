import BackArrow from "../../component/back";
import PageGray from "../../pageGray";
import Header from "../../component/header";
import Field from "../../component/field";
import Button from "../../component/button";
import AlarmBlock from "../../component/alarmBlock";

import { useState } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../component/authContext";

export default function SendPage() {
  const { state, dispatch } = useAuth();
  const { user, token } = state;
  console.log("В send...................", user.id, token);

  const urlParams = new URLSearchParams(useLocation().search);
  const userId = urlParams.get("id");

  console.log(userId);

  const [isFirstComponentVisible, setFirstComponentVisible] = useState(false);
  const [isFirstComponentVisible1, setFirstComponentVisible1] = useState(false);
  const [isFirstComponentVisible2, setFirstComponentVisible2] = useState(false);
  const [isFirstComponentVisible3, setFirstComponentVisible3] = useState(false);
  const [isFirstComponentVisible4, setFirstComponentVisible4] = useState(false);

  const [agentEmail, setUseremail] = useState("");

  const [sum, setUserSum] = useState("");

  const handleUserEmailChange = (event) => {
    setFirstComponentVisible1(false);
    setFirstComponentVisible(false);
    setFirstComponentVisible2(false);
    setFirstComponentVisible3(false);
    setFirstComponentVisible4(false);
    setUseremail(event.target.value);

    console.log(dispatch);
  };

  const handleUserSumChange = (event) => {
    setFirstComponentVisible(false);
    setFirstComponentVisible1(false);
    setFirstComponentVisible2(false);
    setFirstComponentVisible3(false);
    setFirstComponentVisible4(false);
    setUserSum(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agentEmail) {
      setFirstComponentVisible3(true);
    } else if (!sum || sum === "" || isNaN(Number(sum))) {
      setFirstComponentVisible2(true);
    } else {
      try {
        // Отправка данных на сервер
        const response = await fetch("http://localhost:4000/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, agentEmail, sum }),
        });

        // const response = { status: 200 };
        console.log(response);

        const data = await response.json();
        if (response.status === 400 || response.status === 500) {
          setFirstComponentVisible(true);
        } else if (response.status === 403) {
          setFirstComponentVisible4(true);
        } else if (response.status === 200) {
          setFirstComponentVisible1(true);
          console.log("Деньги отправлены", data);
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    }
  };

  return (
    <PageGray>
      <BackArrow />
      <Header title="Send" />
      <Field
        name="Email"
        type="email"
        placeholder="Введіть email адресата"
        white
        action={handleUserEmailChange}
      />
      <Field
        name="Sum ($)"
        type="number"
        placeholder="Введіть суму"
        white
        action={handleUserSumChange}
      />
      <Button text="Send" onClick={handleSubmit} />
      {isFirstComponentVisible ? (
        <AlarmBlock text="A user with this email is not registered" />
      ) : null}
      {isFirstComponentVisible1 ? <AlarmBlock text="Гроші переведені" /> : null}
      {isFirstComponentVisible2 ? (
        <AlarmBlock text="Не вірно введена сума" />
      ) : null}
      {isFirstComponentVisible3 ? (
        <AlarmBlock text="Не вірно введена адреса" />
      ) : null}
      {isFirstComponentVisible4 ? (
        <AlarmBlock text="Відсилати самому собі ЗАБОРОНЕНО!" />
      ) : null}
    </PageGray>
  );
}
