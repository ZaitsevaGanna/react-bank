import "./index.css";
import BackArrow from "../../component/back";
import Page from "../../page";
import Header from "../../component/header";
import Field from "../../component/field";
import FieldPass from "../../component/fieldPass";
import ButtonWhite from "../../component/buttonWhite";
import Divider from "../../component/divider";
import AlarmBlock from "../../component/alarmBlock";
import { useAuth } from "../../component/authContext";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function SettingPage() {
  const { state, dispatch } = useAuth();
  const { token, user } = state;

  const urlParams = new URLSearchParams(useLocation().search);
  const userId = urlParams.get("id");

  const [isFirstComponentVisible, setFirstComponentVisible] = useState(false);
  const [isFirstComponentVisible1, setFirstComponentVisible1] = useState(false);
  const [isFirstComponentVisible2, setFirstComponentVisible2] = useState(false);
  const [isFirstComponentVisible3, setFirstComponentVisible3] = useState(false);
  const [oldEmail, setOldEmail] = useState("");
  const handleOldEmail = (event) => {
    setFirstComponentVisible2(false);
    setFirstComponentVisible(false);
    setOldEmail(event.target.value);
  };
  const [newEmail, setNewEmail] = useState("");
  const handleNewEmail = (event) => {
    setFirstComponentVisible2(false);
    setFirstComponentVisible(false);
    setNewEmail(event.target.value);
  };

  const [oldPass, setOldPass] = useState("");
  const handleOldPass = (event) => {
    setFirstComponentVisible1(false);
    setFirstComponentVisible3(false);
    setOldPass(event.target.value);
  };
  const [newPass, setNewPass] = useState("");
  const handleNewPass = (event) => {
    setFirstComponentVisible1(false);
    setFirstComponentVisible3(false);
    setNewPass(event.target.value);
  };

  const handleSaveEmail = async () => {
    console.log(oldEmail, newEmail);
    if (oldEmail && newEmail) {
      try {
        const response = await fetch(`http://localhost:4000/settingsEmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, oldEmail, newEmail }),
        });

        const data = await response.json();
        if (response.status === 400 || response.status === 500) {
          setFirstComponentVisible(true);
        } else if (response.status === 200) {
          setFirstComponentVisible2(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleSavePass = async () => {
    console.log(oldPass, newPass);
    if (oldPass && newPass) {
      try {
        const response = await fetch("http://localhost:4000/settingsPass", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, oldPass, newPass }),
        });

        const data = await response.json();

        if (response.status === 400 || response.status === 500) {
          setFirstComponentVisible1(true);
        } else if (response.status === 200) {
          console.log(".......", data);
          setFirstComponentVisible3(true);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(token, user, dispatch);

    dispatch({
      type: "LOGOUT",
      payload: {
        token: null,
        user: undefined,
      },
    });
    window.location.assign("/");
  };
  return (
    <Page>
      <div className="smallerHight">
        <BackArrow />
        <Header title="Settings" />
      </div>
      <div className="alarmBlock">
        <h2 className="title_field">Change email</h2>
        {isFirstComponentVisible ? <AlarmBlock text="Wrong email" /> : null}
        {isFirstComponentVisible2 ? <AlarmBlock text="Зроблено" /> : null}
      </div>
      <Field
        name="Old Email"
        type="text"
        placeholder="введіть свій email"
        action={handleOldEmail}
      />

      <Field
        name="New Email"
        type="text"
        placeholder="введіть свій email"
        action={handleNewEmail}
      />

      <ButtonWhite
        text="Save Email"
        onClick={handleSaveEmail}
        href={`/settings?id=${userId}`}
      />

      <div className="alarmBlock">
        <h2 className="title_field">Change password</h2>
        {isFirstComponentVisible1 ? <AlarmBlock text="Wrong password" /> : null}
        {isFirstComponentVisible3 ? <AlarmBlock text="Зроблено!" /> : null}
      </div>
      <FieldPass
        name="Old password"
        placeholder="******"
        action={handleOldPass}
      />

      <FieldPass
        name="New password"
        placeholder="******"
        action={handleNewPass}
      />
      <ButtonWhite
        text="Save password"
        onClick={handleSavePass}
        href={`/settings?id=${userId}`}
      />
      <Divider />
      <ButtonWhite text="Log Out" red onClick={handleSubmit} />
    </Page>
  );
}
