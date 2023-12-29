import "./SignupSigninComponent.css";
import React, { useState } from 'react'
import Input from '../Input/Input';
import Button from '../Button/Button';
import { toast } from 'react-toastify';
import { auth, db, provider } from '../../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';// for email
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";// for google
import { useNavigate } from "react-router-dom";

const SignupSigninComponent = () => { // Main function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("false");
  const [loginForm, setLoginForm] = useState(false)
  const navigate = useNavigate();// this is for navigate to page


  function signupWithEmail() {
    setLoading(true);
    // Authencitcate the user , or basically create a new accout using email and password
    if (name !== "" && email !== "" && Password !== "" && confirmPassword !== "") {

      if (Password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, Password)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // console.log("user>>>", user);
            toast.success("User Created!")
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage)
            // console.log(errorMessage, errorCode);
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password should be same")
        setLoading(false)
      }

    } else {
      toast.error("All feilds are mandatory")
      setLoading(false)
    }
  }// Signup with email done here with this closing tag


  function loginUsingEmail(){
  setLoading(true)
  if (email !== "" && Password !== ""){
    signInWithEmailAndPassword(auth, email, Password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      toast.success("Login Successfully");
      setEmail("");
      setPassword("");
      // console.log(user)
      setLoading(false)
      // createDoc(user)
      navigate("/dashboard");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorMessage, errorCode);
      toast.error(errorMessage)
      setLoading(false)
    });
  }
  else{
    toast.error("All feilds are mandatory")
    setLoading(false)
    }  
  }//loginUsingEmail ending here


  function googleAuth(){
   setLoading(true);
   try{
   signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    // console.log(token)
    // console.log("user>>>", user)
    createDoc(user);
    setLoading(false)
    toast.success("Signup Succesfully")
    navigate("/dashboard");
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.log(errorMessage,errorCode)
    toast.error(errorMessage,errorCode)
    setLoading(false)
  });
   }
   catch(e){
    toast.error(e.message)
   }
  }

  async function createDoc(user) {
    // make sure that the doc with the uid does'nt exist
    // Create the doc
    setLoading(true)
    if(!user)return;

    // console.log(user);

    const userRef = doc(db, "users", user.uid);
    const userData= await getDoc(userRef);
    const createdAt = new Date();
    // console.log(userData  );

    if(!userData.exists()){ // if user does'nt exist then do it 
      try{
        await setDoc(doc(db, "users", user.uid), {
          name:user.displayName ? user.displayName : name,
          email:user.email,
          photoURL:user.photoURL ? user.photoURL : "",
          createdAt:createdAt,
          Password:Password
        });
        toast.success("Doc Created");
        setLoading(false)
      }
      catch(e){
        // console.log(e);
        toast.error(e.message);
        setLoading(false)
      }
    }else{
      // toast.error("Doc already exist")
      setLoading(false)
    }
  }// Create doc that is containing user basic information



  return (
    <>
      {loginForm ? (//for login
        <>
          <div className='SignupSignin-wrapper'>
            <h2 className='title'>
              Login on <span>Financely.</span>
            </h2>
            <form action="">
              {/* Imported Input */}
              <Input label={"Email"} state={email} setState={setEmail} placeholder={"example@xyz.com"} />
              <Input label={"Password"} state={Password} setState={setPassword} placeholder={"xyz123"} type="Password" />
              <Button text="Login" loading={loading} onClick={loginUsingEmail} />
              <p style={{textAlign: "center"}} >or</p>
              <Button text="Login Using with Google" loading={loading} onClick={googleAuth} blue="true" />
              <p className="p-login" onClick={()=>setLoginForm(!loginForm)} >Or Don't Have an Account? Click here</p>
            </form>
          </div>
        </>
      ) : (// For signup
        <div className='SignupSignin-wrapper'>
          <h2 className='title'>
            Signup on <span>Financely.</span>
          </h2>
          <form action="">
            {/* Imported Input */}
            <Input label={"Full Name"} state={name} setState={setName} placeholder={"Jhon leaki"} />
            <Input label={"Email"} state={email} setState={setEmail} placeholder={"Jhon@gmail.com"} />
            <Input label={"Password"} state={Password} setState={setPassword} placeholder={"123#abc"} type="Password" />
            <Input label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"123#abc"} type="Password" />
            <Button text="Signup Using Email and Password" loading={loading} onClick={signupWithEmail} />
            <p style={{textAlign: "center"}}>or</p>
            <Button text="Signup Using with Google" loading={loading} onClick={googleAuth} blue="true"/>
            <p className="p-login" onClick={()=>setLoginForm(!loginForm)}>Or Have an Account Already? Click here</p>
          </form>
        </div>
      )}

    </>
  )
}

export default SignupSigninComponent