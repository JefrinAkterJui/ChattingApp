import React from 'react'
import './UserProfile.css'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const currentUser=useSelector((state)=>state.currentUser.value)


  return (
    <>
    <div className="User_profile">
        <div className="container  mt-[137px] flex justify-center items-center">
            <div className="main_user_profile">
                <h3>{currentUser?.displayName}</h3>
                <div className="profile">
                    <div className="profilephoto overflow-hidden">
                        <img src={currentUser?.photoURL} alt="" />
                    </div>
                    <div className="profileName">{currentUser?.displayName}</div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default UserProfile