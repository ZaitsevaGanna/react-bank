import Button from "../../component/button";
import Field from "../../component/field";
import Header from "../../component/header";
import Page from "../../page";
import BackArrow from "../../component/back";
import "./index.css";

export default function SignupConfirmPage() {
  return (
    <Page>
      <div className="signupConfirmPage">
        <BackArrow />
        <Header
          title="Confirm account"
          description="Write the code you received"
        />
        <Field name="Code" type="text" placeholder={"000000"} />
        <Button href="/balance" text="Confirm" onClick={""} />
      </div>
    </Page>
  );
}
