import { getDatabase } from 'firebase/database';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const Friends = () => {
    // -----------firebase variables---------
    const db = getDatabase();
    // ----------Redux data------------------
    const currentUser=useSelector((state)=>state.currentUser.value)

    // -----------custom variables----------
    const [allRequest , setAllRequest]=useState([])

    // -----------realtime database----------


  return (
    <>
        <div className="container pt-[147px]">
            <div className="mai_user">
                <h1 className=' font-poppins font-bold text-[30px] text-[#413030]'>All Friends</h1>
                {
                  allRequest.map((item , i)=>(
                    <div key={i} className="flex items-center justify-between">
                          <CommonUser CommonUserName={item.SenderName} CommonUserPicture={item.SenderPhoto}/>
                          <div>
                              <ButtonV1 ButonV1Text={'Confirm'} ButonV1bg={'bg-red-500 hover:bg-red-700 duration-500'}/>
                          </div>
                    </div>
                  ))
                }
            </div>
        </div>
    </>
  )
}

export default Friends