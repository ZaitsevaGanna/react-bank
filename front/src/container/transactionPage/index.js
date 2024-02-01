import "./index.css";
import BackArrow from "../../component/back";
import PageGray from "../../pageGray";
import Header from "../../component/header";
import Divider from "../../component/divider";

export default function TransactionPage() {
  const data = {
    id: 1,
    name: "Stripe",
    price: 320,
    type: "send",
    date: "2024-01-22T20:32:31.300Z",
  };

  return (
    <PageGray>
      <BackArrow />
      <Header title="Transaction" />
      <h1 className="sum">{data.price} USD</h1>

      <div className="column">
        <div className="info">
          <div>Date</div>
          <div>{data.date}</div>
        </div>
        <Divider />
        <div className="info">
          <div>Adress</div>
          <div>{data.name}</div>
        </div>
        <Divider />
        <div className="info">
          <div>Type</div>
          <div>{data.type}</div>
        </div>
      </div>
    </PageGray>
  );
}
