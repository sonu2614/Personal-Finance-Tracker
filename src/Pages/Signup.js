import React from "react";
import SignupSigninComponent from "../Components/SignupSigninComponent/SignupSigninComponent";
import Header from "../Components/Headers/Header";

function Signup() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <SignupSigninComponent />
      </div>
    </div>
  );
}

export default Signup;
