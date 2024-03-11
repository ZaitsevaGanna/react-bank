import "./index.css";
import { useEffect, useState } from "react";
import { Fragment } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../component/authContext";

export default function BalancePage() {
  const { state } = useAuth();
  const { user, token } = state;
  console.log("В balance......................... ", user.id, token);
  const navigation = useNavigate();
  
  // const localStorageToken = localStorage.getItem("token");
  // const localStorageUserId = localStorage.getItem("userId");

  const [data, setData] = useState([]);

  const urlParams = new URLSearchParams(useLocation().search);
  const userId = urlParams.get("id");
  console.log(userId);

  useEffect(() => {
    fetch(`http://localhost:4000/balance?id=${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  let payments = null;

  if (data && data.transactions) {
    try {
      payments = data.transactions.map((item) => (
        <li
          className="payment"
          key={item.id}
          onClick={() => navigation(`/transaction?transId=${item.id}`)}
        >
          <div className="doubleDiv">
            <div
              className={`paymentImg paymentImg${item.transactionType}`}
            ></div>
            <div className="paymentName">
              {item.transactionType === 4 ? "Your friend" : ""}
              {item.transactionType === 2 ? "STRIPE" : ""}
              {item.transactionType === 3 ? "COINBASE" : ""} {"  "}
              {item.agentEmail}
              <span className="paymentType">
                {item.date}
                {"  "}
                {item.transactionType === 1 ? "sending" : "receive"}
              </span>
            </div>
          </div>
          <div className={`price price_sending${item.transactionType}`}>
            {item.transactionType === 1 ? "-" : ""}
            {item.operationAmount}$
          </div>
        </li>
      ));
      console.log("OK!");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Fragment>
      <div className="balancePage">
        <div className="nav">
          <Link to={`/settings?id=${userId}`} className="divImg"></Link>
          <span className="mainWallet">Main wallet</span>
          <Link
            to={`/notifications?id=${userId}`}
            className="divImg divImg1"
          ></Link>
        </div>
        <h1 className="total">{`${data.balanceAmount}$`}</h1>
        <div className="doubleIcon">
          <Link to={`/receive?id=${userId}`} className="icon">
            <span className="iconName">Receive</span>
          </Link>
          <Link to={`/send?id=${userId}`} className="icon icon1">
            <span className="iconName">Send</span>
          </Link>
        </div>

        <ul className="payments">{payments}</ul>
      </div>
    </Fragment>
  );
}
