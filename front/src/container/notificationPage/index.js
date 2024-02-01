import "./index.css";
import BackArrow from "../../component/back";
import PageGray from "../../pageGray";
import Header from "../../component/header";
import WhiteBox from "../../component/whiteBox";

export default function NotificationsPage() {
  // const { id, password, email } = useContext();

  const list = [
    {
      id: 1,
      userId: 2,
      date: "2024-01-22T20:27:34.948Z",
      type: 0,
      message: "New login",
    },

    {
      id: 2,
      userId: 2,
      date: "2024-01-22T20:29:54.633Z",
      type: 1,
      message: "You send 200 USD",
    },

    {
      id: 3,
      userId: 3,
      date: "2024-01-22T20:32:31.300Z",
      type: 2,
      message: "New reward system 300 USD.",
    },
    {
      id: 4,
      userId: 3,
      date: "2024-01-22T20:32:31.300Z",
      type: 3,
      message: "New reward system 40 USD.",
    },
    {
      id: 5,
      userId: 3,
      date: "2024-01-22T20:32:31.300Z",
      type: 4,
      message: "Your friend send you 10 USD.",
    },
  ];

  const notifications = list.map((item) => (
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
