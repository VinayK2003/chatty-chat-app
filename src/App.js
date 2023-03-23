import "./App.css";
import { Auth } from "./components/Auth";
import React, { useState, useRef } from "react";
import { Chat } from "./components/Chat";
import Cookies from "universal-cookie";
import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
const cookies = new Cookies();

function App() {
  const [isAuth, setisAuth] = useState(cookies.get("auth-token")); //imported cookies for this
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setisAuth(null);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setisAuth={setisAuth} />
      </div>
    );
  }

  return (
    <>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="room">
          <div className="label">
            <label className="room1">Enter Room Number</label>
          </div>
          <div className="input">
            {/* <input onChange={(e) => setRoom(e.target.value)}/> */}
            <input ref={roomInputRef} />
          </div>
          <div className="button">
            <button
              className="enter_chat_button"
              onClick={() => setRoom(roomInputRef.current.value)}
            >
              Enter Chat
            </button>
          </div>
        </div>
      )}

      <div className="sign_out">
        <button className="sign_out_button" onClick={signUserOut}>
          Sign Out
        </button>
      </div>
    </>
  );
}

export default App;
