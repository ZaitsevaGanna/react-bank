import BackArrow from "../../component/back";
import Page from "../../page";
import Header from "../../component/header";
import Field from "../../component/field";
import FieldPass from "../../component/fieldPass";
import ButtonWhite from "../../component/buttonWhite";
import Divider from "../../component/divider";
import { useAuth } from "../../component/authContext";

export default function SettingPage() {
  const { state, dispatch } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.assign("/signin");

    return dispatch({
      type: "LOGOUT",
      token: null,
    });
  };

  return (
    <Page>
      <div>
        <BackArrow />
        <Header title="Settings" />
      </div>
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
      <ButtonWhite text="Log Out" red onClick={handleSubmit} />
    </Page>
  );
}
