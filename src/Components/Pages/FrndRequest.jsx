import React, { useEffect, useState } from 'react'
import CommonUser from '../Common/CommonUser'
import ButtonV1 from '../Common/ButtonV1'
import { getDatabase, onValue, ref } from 'firebase/database';
import { useSelector } from 'react-redux';

const FrndRequest = () => {
    // -----------firebase variables---------
    const db = getDatabase();
    // ----------Redux data------------------
    const currentUser=useSelector((state)=>state.currentUser.value)

    // -----------custom variables----------
    const [allRequest , setAllRequest]=useState([])

    // -----------realtime database----------
      useEffect(()=>{
        onValue(ref(db , 'Allrequest/'), (snapshot) => {
          let arr =[]
          snapshot.forEach((item)=>{
              if(item.val().ReceverID == currentUser.uid){
                arr.push({...item.val() , key:item.key})
              }
          })
          setAllRequest(arr)
        });
      } ,[])



  return (
    <>
        <div className="container pt-[147px]">
            <div className="mai_user">
                <h1 className=' font-poppins font-bold text-[30px] text-[#413030]'>All Request</h1>
                {
                  allRequest.map((item)=>(
                    <div  className="flex items-center justify-between">
                          <CommonUser CommonUserName={item.SenderName} CommonUserPicture={item.SenderPhoto}/>
                          <div>
                              <ButtonV1 ButonV1Text={'Confirm'} ButonV1bg={'bg-red-500'}/>
                              <ButtonV1 ButonV1Text={'Remove'} ButonV1bg={'bg-red-500 ml-3'} />
                          </div>
                    </div>
                  ))
                }
            </div>
        </div>
    </>
  )
}

export default FrndRequest