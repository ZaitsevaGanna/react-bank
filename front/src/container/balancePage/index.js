import "./index.css";
import { Fragment } from "react";

import { Link } from "react-router-dom";

export default function BalancePage() {
  //const { id, password, email } = useContext();

  const list = [
    {
      id: 1,
      name: "Stripe",
      price: 320,
      type: "send",
    },
    {
      id: 2,
      name: "Coinbase",
      price: 100,
      type: "receive",
    },
    { id: 3, name: "Oleg", price: 250, type: "send" },
    { id: 4, name: "Helen", price: 117, type: "receive" },
  ];

  // const handleClick = () => {

  // };

  const payments = list.map((item) => (
    <li
      className="payment"
      key={item.id}
      onClick={() => window.location.assign(`/transaction`)}
    >
      <div className="doubleDiv">
        <div className="paymentImg"></div>
        <div className="paymentName">
          {item.name}
          <span className="paymentType">{item.type}</span>
        </div>
      </div>
      <div className="price">${item.price}</div>
    </li>
  ));

  return (
    <Fragment>
      <div className="balancePage">
        <div className="nav">
          <Link to="/settings" className="divImg"></Link>
          <span className="mainWallet">Main wallet</span>
          <Link to="/notifications" className="divImg divImg1"></Link>
        </div>
        <h1 className="total">$100.20</h1>
        <div className="doubleIcon">
          <Link to="/receive" className="icon">
            <span className="iconName">Receive</span>
          </Link>
          <Link to="/send" className="icon icon1">
            <span className="iconName">Send</span>
          </Link>
        </div>

        <ul className="payments">{payments}</ul>
      </div>
    </Fragment>
  );
}
