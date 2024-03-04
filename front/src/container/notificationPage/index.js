import "./index.css";
import BackArrow from "../../component/back";
import PageGray from "../../pageGray";
import Header from "../../component/header";
import WhiteBox from "../../component/whiteBox";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NotificationsPage() {
  const [data, setData] = useState([]);

  const urlParams = new URLSearchParams(useLocation().search);
  const userId = urlParams.get("id");

  useEffect(() => {
    fetch(`http://localhost:4000/notifications?id=${userId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Нотификации", data);
        setData(data);
      });
  }, []);

  const notifications = data.map((item) => (
    <li key={item.id}>
      <WhiteBox>
        <div className={`notif_type notif_type${item.type}`}></div>
        <div className="notif_message">
          {item.message}
          <div className="notif_data">{item.date}</div>
        </div>
      </WhiteBox>
    </li>
  ));

  return (
    <PageGray>
      <BackArrow />
      <Header title="Notifications" />
      <ul className="notifications">{notifications}</ul>
    </PageGray>
  );
}
