import "./index.css";
import BackArrow from "../../component/back";
import PageGray from "../../pageGray";
import Header from "../../component/header";
import Divider from "../../component/divider";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function TransactionPage() {
  const [data, setData] = useState({});

  const urlParams = new URLSearchParams(useLocation().search);
  const transId = urlParams.get("transId");

  useEffect(() => {
    fetch(`http://localhost:4000/transaction?transId=${transId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  return (
    <PageGray>
      <BackArrow />
      <Header title="Transaction" />
      <h1 className={`sum sum${data.type}`}>
        {data.type === 1 ? "-" : ""}
        {data.operationAmount} USD
      </h1>

      <div className="column">
        <div className="info">
          <div>Date</div>
          <div>{data.date}</div>
        </div>
        <Divider />
        <div className="info">
          <div>Adress</div>
          <div>
            {data.type === 2 ? "STRIPE" : ""}
            {data.type === 3 ? "COINBASE" : ""}
            {data.type !== 2 ? data.agentEmail : ""}
          </div>
        </div>
        <Divider />
        <div className="info">
          <div>Type</div>

          <div>{data.type === 1 ? "sending" : "receive"}</div>
        </div>
      </div>
    </PageGray>
  );
}
