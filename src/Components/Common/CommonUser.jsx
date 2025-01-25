import React from 'react'
import './CommonUser.css'

const CommonUser = ({CommonUserPicture , CommonUserName}) => {
  return (
    <>
        <div className="user">
            <div className="User_profilepicture">
                <img src={CommonUserPicture} alt="CommonUserPicture" />
            </div>
            <h2 className='userName'>{CommonUserName}</h2>
        </div>
    </>
  )
}

export default CommonUser