import Button from "../../component/button";
import Field from "../../component/field";
import Header from "../../component/header";
import Page from "../../page";
import BackArrow from "../../component/back";
import "./index.css";

export default function RecoveryPage() {
  return (
    <Page>
      <div className="recoveryPage">
        <BackArrow />
        <Header
          title="Recover password"
          description="Choose a recovery method"
        />
        <Field
          name="Email"
          type="email"
          placeholder="введіть Вашу електронну  адресу"
        />
        <Button href="/recovery-confirm" text="Confirm" onClick={""} />
      </div>
    </Page>
  );
}
