import BackArrow from "../../component/back";
import Page from "../../page";
import Header from "../../component/header";
import Field from "../../component/field";
import FieldPass from "../../component/fieldPass";
import ButtonWhite from "../../component/buttonWhite";
import Divider from "../../component/divider";

export default function SettingPage() {
  return (
    <Page>
      <BackArrow />
      <Header title="Settings" />
      <h2>Change email</h2>
      <Field name="Old Email" type="text" placeholder="введіть свій email" />
      <Field name="New Email" type="text" placeholder="введіть свій email" />

      <ButtonWhite text="Save Email" onClick={""} />
      <Divider />
      <h2>Change password</h2>

      <FieldPass name="Old password" placeholder="******" />
      <FieldPass name="New password" placeholder="******" />
      <ButtonWhite text="Save password" onClick={""} />
      <Divider />
      <ButtonWhite text="Log Out" red onClick={""} />
    </Page>
  );
}
