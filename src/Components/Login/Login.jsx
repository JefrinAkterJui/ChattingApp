import React, { useState } from 'react'
import './Login.css'
import formbg from '../../assets/Images/frombg.png'
import pata from '../../assets/Images/leaf.png'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { UserData } from '../../Slice/userSlice'
import { getDatabase, push, ref, set } from "firebase/database";


const Login = () => {
      const [fromData , setfromData]     =useState({ UserEmail:'' , Password:''})
      const [Inputerror , setInputerror] =useState({ UserEmailerror:'', UserPassError:''})
    //   --------------firebase variable-------------
    const auth = getAuth();
    // ----------------navigate-----------
    const Navigate =useNavigate()
    // ------------redux variable--------
    const dispatch =useDispatch()
    // ----------red data----------------
    const db = getDatabase();


    const hendelButton=(e)=>{
        e.preventDefault()
        if(fromData.UserEmail==''){
          setInputerror((prev)=>({...prev ,UserEmailerror:'Enter your user Email' }))
        }
        if(fromData.Password==''){
          setInputerror((prev)=>({...prev ,UserPassError:'Enter your user Password' }))
        }
        else{
            signInWithEmailAndPassword(auth, fromData.UserEmail , fromData.Password)
            .then((userCredential) => {
                const user = userCredential.user;
                if(user.emailVerified== true){
                    // --------------navigate to home page------------
                    Navigate('/')
                    // -------------success tost-----------------
                    toast.success('Login success', {
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
                    // --------------store the user data--------
                    dispatch(UserData(user))
                    // ---------------set the user data to locatstore--------
                    localStorage.setItem("currentUser" , JSON.stringify(user))
                    // ---------------set data to the realtime data base--------
                    set(ref(db, 'AllUsers/' + user.uid), {
                        userPhoto: user.photoURL,
                        userName: user.displayName
                    });
                }
                else{
                    toast.error('Email is not verified', {
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
                
            })
            .catch((error) => {
                const errorCode = error.code;
                if(errorCode){
                    toast.error('Something went worng', {
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


  return (
    <>
        <div className="mina_all_signUp ">
            <div style={{background:`url(${formbg})`}} className="signup_img_bg">
                <img src={pata} alt="pata"  className='pata'/>
                <div className="sign_up_form">
                    <form>
                        <div className="mina_form hum">
                            <div className="signUp_head">
                                <h1>Get Started</h1>
                                <h2>Already have an Account ? <span> <Link to={'/SinUp'} >SinUp</Link></span></h2>
                            </div>
                            <div className="form_info_text">
                                <h3>Email</h3>
                                <p className='text-red-600 font-Bebas text-[14px]'>{Inputerror.UserEmailerror}</p>
                                <input onChange={(e)=>{setfromData((prev)=>({...prev , UserEmail:e.target.value})) , setInputerror((prev)=>({...prev , UserEmailerror:''}))}} className='s_input' type="email" />
                                <h3>Password</h3>
                                <p className='text-red-600 font-Bebas text-[14px] '>{Inputerror.UserPassError}</p>
                                <input onChange={(e)=>{setfromData((prev)=>({...prev , Password:e.target.value})) , setInputerror((prev)=>({...prev , UserPassError:''}))}} className='s_input' type="password" />
                                <h2 className='forgot'><Link to={'/ForgotPass'}>Forgot password?</Link></h2>
                            </div>
                            <div className="Sign_button">
                                <button  onClick={hendelButton}>Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login