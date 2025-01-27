import React, { useEffect, useState } from 'react'
import CommonUser from '../Common/CommonUser'
import ButtonV1 from '../Common/ButtonV1'
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from 'react-redux';


const Alluser = () => {
  // -----------firebase variables---------
  const db = getDatabase();
  // ----------Redux data------------------
  const currentUser=useSelector((state)=>state.currentUser.value)

  // -----------custom variables----------
  const [allUsers , setAllusers]=useState([])



  // ---------function---------------
  const HendelRequest =(UserData)=>{
    set(push(ref(db, 'Allrequest/')), {
        SenderID: currentUser.uid,
        SenderName: currentUser.displayName,
        SenderPhoto: currentUser.photoURL,
        ReceverID: UserData.key    
    });
  }



  // -----------realtime database----------
  useEffect(()=>{
    onValue(ref(db , 'AllUsers/'), (snapshot) => {
      let arr =[]
      snapshot.forEach((item)=>{
        if(item.key != currentUser.uid){
          arr.push({...item.val() , key:item.key})
        }
      })
      setAllusers(arr)
    });
  } ,[])

  return (
    <>
        <div className="container pt-[147px]">
            <div className="mai_user">
                <h1 className=' font-poppins font-bold text-[30px] text-[#413030]'>All Users</h1>
                {
                  allUsers.map((item , i)=>(
                  <div key={i} className="flex items-center justify-between">
                      <CommonUser CommonUserName={item.userName} CommonUserPicture={item.userPhoto}/>
                      <ButtonV1 ButtonV1Clock={()=>HendelRequest(item)} ButonV1bg={'bg-red-500'} ButonV1Text={'Add'}/>
                  </div>

                  ))
                }
            </div>
        </div>
    </>
  )
}

export default Alluser