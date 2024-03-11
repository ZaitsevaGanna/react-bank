import "./index.css";
import BackArrow from "../../component/back";
import PageGray from "../../pageGray";
import Header from "../../component/header";
import Field from "../../component/field";
import WhiteBox from "../../component/whiteBox";
import Divider from "../../component/divider";
import { useState } from "react";
import IconRow from "../../component/iconRow";
import { PaymentSystem } from "../../emums/paymentSystem";
import AlarmBlock from "../../component/alarmBlock";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../component/authContext";

export default function ReceivePage() {
  const { state, dispatch } = useAuth();
  const { user, token } = state;
  console.log("В reseive...................", user.id, token);

  const urlParams = new URLSearchParams(useLocation().search);
  const userId = urlParams.get("id");

  console.log(userId);

  const [isFirstComponentVisible, setFirstComponentVisible] = useState(false);
  const [isFirstComponentVisible1, setFirstComponentVisible1] = useState(false);
  const [isFirstComponentVisible2, setFirstComponentVisible2] = useState(false);

  const btnS = "btnS";
  const btnC = "btnC";

  const handleClick = async (event) => {
    setFirstComponentVisible(false);
    setFirstComponentVisible1(false);
    setFirstComponentVisible2(false);
    event.preventDefault();
    const systemType =
      event.target.id === btnS ? PaymentSystem.STRIPE : PaymentSystem.COINBASE;

    console.log(
      `Сума:`,
      receiveSum,
      `Тип системы`,
      systemType,
      "ID user",
      userId
    );
    if (!receiveSum || receiveSum === "" || isNaN(Number(receiveSum))) {
      setFirstComponentVisible1(true);
    } else if (receiveSum || systemType) {
      try {
        // Отправка данных на сервер

        const response = await fetch("http://localhost:4000/receive", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, receiveSum, systemType }),
        });

        const data = await response.json();
        console.log(`полученый ответ`, response);
        if (response.status === 200) {
          console.log("Деньги отправлены", data);
          setFirstComponentVisible(true);
        } else if (response.status === 400 || response.status === 500) {
          setFirstComponentVisible2(true);
        }
      } catch (error) {
        console.error("Произошла ошибка:", error);
      }
    }
  };

  const [receiveSum, setReceiveSum] = useState("");

  const handleReceiveSum = (event) => {
    setFirstComponentVisible(false);
    setFirstComponentVisible1(false);
    setFirstComponentVisible2(false);
    setReceiveSum(event.target.value);

    console.log(event.target.value);
  };
  return (
    <PageGray>
      <BackArrow />
      <Header title="Receive" />
      <Field
        white
        name="Receive amount ($)"
        type="number"
        placeholder="0"
        action={handleReceiveSum}
      />
      <Divider />
      <div className="field_label">
        {" "}
        Payment system
        <WhiteBox>
          <button
            id={btnS}
            className={`notif_type notif_type2 buttonHover`}
            onClick={handleClick}
          ></button>
          <IconRow name="Stripe" />
        </WhiteBox>
        <WhiteBox>
          <button
            id={btnC}
            className={`notif_type notif_type3 buttonHover`}
            onClick={handleClick}
          ></button>
          <IconRow name="Coinbase" />
        </WhiteBox>
      </div>
      {isFirstComponentVisible ? <AlarmBlock text="Гроші відправлені!" green /> : null}
      {isFirstComponentVisible1 ? (
        <AlarmBlock text="Не вірно введена сума" />
      ) : null}
      {isFirstComponentVisible2 ? (
        <AlarmBlock text="Повторіть спробу!" />
      ) : null}
    </PageGray>
  );
}
