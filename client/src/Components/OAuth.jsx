import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { SigninSuccess } from "../Redux/user/UserSlice";
import { useDispatch } from "react-redux";

export default function OAuth() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleGoogelsubmit = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ promt: "select_account" });
    try {
      const ResultfromGoogle = await signInWithPopup(auth, provider);
      //console.log(ResultfromGoogle);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: ResultfromGoogle.user.displayName,
          email: ResultfromGoogle.user.email,
          profilePic: ResultfromGoogle.user.photoURL,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(SigninSuccess(data));
        navigation("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Button
        className="w-full"
        gradientDuoTone="pinkToOrange"
        outline
        onClick={handleGoogelsubmit}
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-3" />
        Continue with Google
      </Button>
    </div>
  );
}
