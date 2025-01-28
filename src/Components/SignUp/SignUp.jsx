import React, { useState } from 'react'
import './SignUp.css'
import formbg from '../../assets/Images/frombg.png'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword ,sendEmailVerification ,updateProfile ,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import google from '../../assets/Images/google.png'
import apple from '../../assets/Images/apple.png'
import pata from '../../assets/Images/leaf.png'

const SignUp = () => {
  const [fromData , setfromData]     =useState({Username:'' , UserEmail:'' , Password:''})
  const [Inputerror , setInputerror] =useState({UsernameError:'' , UserEmailerror:'', UserPassError:''})
  // ---------------firebase variable-----------------
  const auth = getAuth();
  // -----------nevigate------------------------------
  const nevigate =useNavigate()
  // -----------google variable-----------------------
  const provider = new GoogleAuthProvider();


  const hendelButton=(e)=>{
    e.preventDefault()

    if(fromData.Username==''){
        setInputerror((prev)=>({...prev ,UsernameError:'Enter your user name' }))

    }
    if(fromData.UserEmail==''){
      setInputerror((prev)=>({...prev ,UserEmailerror:'Enter your user Email' }))
    }
    if(fromData.Password==''){
      setInputerror((prev)=>({...prev ,UserPassError:'Enter your user Password' }))
    }
    else{
      createUserWithEmailAndPassword(auth, fromData.UserEmail, fromData.Password)
      .then((userCredential) => {
          const user =userCredential.user;
          console.log(user)
          // ----------update user profile---------
          updateProfile(auth.currentUser, {
            displayName: fromData.Username, photoURL: "https://play-lh.googleusercontent.com/V7hHj36C6ugHdnqQhp4oCPKPZKhImAnm80a6yOGZl6LVw3PlNY9cM4qkKPT5ZSHQhg"
          })
          .then(() => {
            // ---------send email verification-------
            sendEmailVerification(auth.currentUser)
            .then(() => {
              // -----nevigate----------
              toast.info('Email verificatin send', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
              nevigate('/Login')
            })
          .catch((error) => {});
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode)
        if(errorCode== 'auth/email-already-in-use'){
          // ------error tost----------
          toast.error('Email already has taken', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
        if(errorCode=='auth/weak-password'){
          // ------error tost----------
          toast.error('weak-password', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      });
    }
  }
  // --------------google sin in ------------------
  const GoogleSineIn =()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      nevigate('/Login')
    }).catch((error) => {
      const errorCode = error.code;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode)
    });

  }

  return (
    <>
      <div className="mina_all_signUp">
        <div style={{background:`url(${formbg})`}} className="signup_img_bg">
          <img src={pata} alt="pata"  className='pata'/>
        <div className="sign_up_form">
            <form>
              <div className="mina_form">
                <div className="signUp_head">
                  <h1>Get Started</h1>
                  <h2>Already have an Account ? <span> <Link to={'/Login'} >Log in</Link></span></h2>
                </div>
                <div className="form_info_text">
                    <h3>Name</h3>
                    <p className='text-red-600 font-Bebas text-[14px]'>{Inputerror.UsernameError}</p>
                    <input  type="text" onChange={(e)=>{setfromData((prev)=>({...prev , Username:e.target.value})) , setInputerror((prev)=>({...prev , UsernameError:''}))}}   className='s_input'  />
                    <h3>Email</h3>
                    <p className='text-red-600 font-Bebas text-[14px]'>{Inputerror.UserEmailerror}</p>
                    <input onChange={(e)=>{setfromData((prev)=>({...prev , UserEmail:e.target.value})) , setInputerror((prev)=>({...prev , UserEmailerror:''}))}} className='s_input' type="email" />
                    <h3>Password</h3>
                    <p className='text-red-600 font-Bebas text-[14px] '>{Inputerror.UserPassError}</p>
                    <input onChange={(e)=>{setfromData((prev)=>({...prev , Password:e.target.value})) , setInputerror((prev)=>({...prev , UserPassError:''}))}} className='s_input' type="password" />
                </div>
                <div className="Sign_button">
                  <button  onClick={hendelButton}>Sign Up</button>
                </div>
                <div className="or_part">
                  <div className="line1"></div>
                  <p>Or Sign Up with </p>
                  <div className="line2"></div>
                </div>
                <div className="Sine_icon">
                  <img onClick={GoogleSineIn} src={google} alt="google"  />
                  <img src={apple} alt="apple" />
                </div>
              </div>
            </form>
        </div>
        </div>
      </div>
    </>
  )
}

export default SignUp