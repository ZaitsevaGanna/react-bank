import BackArrow from "../../component/back";
import PageGray from "../../pageGray";
import Header from "../../component/header";
import Field from "../../component/field";
import Button from "../../component/button";

export default function SendPage() {
  return (
    <PageGray>
      <BackArrow />
      <Header title="Send" />
      <Field name="Email" type="email" placeholder="ann_zz@ukr.net" white />
      <Field name="Sum ($)" type="number" placeholder="500" white />
      <Button text="Send" />
    </PageGray>
  );
}
