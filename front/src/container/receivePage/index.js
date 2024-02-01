import "./index.css";
import BackArrow from "../../component/back";
import PageGray from "../../pageGray";
import Header from "../../component/header";
import Field from "../../component/field";
import WhiteBox from "../../component/whiteBox";
import Divider from "../../component/divider";
import { useState } from "react";
import IconRow from "../../component/iconRow";

export default function ReceivePage() {
  const handleClick = () => {
    console.log(`Сума:`, receiveSum);
  };
  const [receiveSum, setReceiveSum] = useState("");

  const handleReceiveSum = (event) => {
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
            className={`notif_type notif_type2 buttonHover`}
            onClick={handleClick}
          ></button>
          <IconRow name="Stripe" />
        </WhiteBox>
        <WhiteBox>
          <button
            className={`notif_type notif_type3 buttonHover`}
            onClick={handleClick}
          ></button>
          <IconRow name="Coinbase" />
        </WhiteBox>
      </div>
    </PageGray>
  );
}
