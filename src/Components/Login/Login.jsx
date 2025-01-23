import React, { useState } from 'react'
import './Login.css'
import formbg from '../../assets/Images/frombg.png'
import pata from '../../assets/Images/leaf.png'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from 'react-toastify'


const Login = () => {
      const [fromData , setfromData]     =useState({ UserEmail:'' , Password:''})
      const [Inputerror , setInputerror] =useState({ UserEmailerror:'', UserPassError:''})
    //   --------------firebase variable-------------
    const auth = getAuth();


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
                    console.log('login hoise')
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