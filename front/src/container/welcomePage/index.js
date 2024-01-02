import "./index.css";
import Button from "../../component/button";
import ButtonWhite from "../../component/buttonWhite";

export default function WelcomePage() {
  return (
    <div className="welcomePage">
      <div>
        <div className="hello">Hello!</div>
        <p className="descrіption">Welcome to bank app</p>
      </div>
      <div>
        <Button href="/signup" text="Sign Up" />
        <ButtonWhite href="/signin" text="Sign In" />
      </div>
    </div>
  );
}
