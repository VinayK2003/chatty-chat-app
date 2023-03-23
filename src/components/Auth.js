import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import "../styles/Chat.css";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Auth = (props) => {
  const signInWithGoogle = async () => {
    const { setisAuth } = props;
    const result = await signInWithPopup(auth, provider);
    try {
      cookies.set("auth-token", result.user.refreshToken);
      setisAuth(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign_in">
      <p className="p">Sign In With Google To Continue</p>
      <button className="sign_in_button" onClick={signInWithGoogle}>
        Sign In With Google{" "}
      </button>
    </div>
  );
};
