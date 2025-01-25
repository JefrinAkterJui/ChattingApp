import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


const ForgotPass = () => {
    const [email , setEmail] =useState('')
    // --------------firebase variable---------
    const auth = getAuth();


    const hendelEmail=()=>{
        if(!email){
            toast.info('Please enter your user email', {
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
        else{
           sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.success('OTP Send', {
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
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
        }
    }

  return (
    <>
        <div className="w-full h-screen flex justify-center items-center ">
            <div className="p-10 border-[1px] border-[#424242]  rounded-lg flex flex-col">
                <div>
                    <input onChange={(e)=>setEmail(e.target.value)} type="text" className='w-[400px] h-[50px] outline-none bg-transparent ' placeholder='Enter your user Email'/>
                    <button onClick={hendelEmail}  className='font-poppins font-normal text-[16px] py-2 px-4 bg-green-600 rounded-lg text-[#fff] '>Send OTP</button>
                </div>
                <div className='mt-[30px]'>
                    <Link to={'/Login'}  className=' block font-poppins font-semibold text-[16px] text-[#fff]'>Go back to Login!</Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default ForgotPass