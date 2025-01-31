import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CommonUser from '../Common/CommonUser';
import ButtonV1 from '../Common/ButtonV1';

const Friends = () => {
    // -----------firebase variables---------
    const db = getDatabase();
    // ----------Redux data------------------
    const currentUser=useSelector((state)=>state.currentUser.value)

    // -----------custom variables----------
    const [allFriends , setallFriends ]=useState([])

    // -----------realtime database----------
    useEffect(()=>{
      onValue(ref(db , 'AllFriends/') , (snapshot)=>{
        let arry=[]
        snapshot.forEach((item)=>{
          if(item.val().CurrentUserID==currentUser.uid){
            arry.push({FriendID: item.val().FriendID , FriendName: item.val().FriendName , FriendPhoto:item.val().FriendPhoto })
          }
          else if(item.val().FriendID==currentUser.uid){
            arry.push({FriendID:item.val().CurrentUserID , FriendName:item.val().CurrentUserName , FriendPhoto:item.val().CurrentUserPhoto})
          }
        })
        setallFriends(arry)
      })
    } ,[])
    
    // console.log(allFriends)

  return (
    <>
        <div className="container pt-[147px]">
            <div className="mai_user">
                <h1 className=' font-poppins font-bold text-[30px] text-[#413030]'>All Friends</h1>
                {
                  allFriends.map((item ,i)=>(
                    <div key={i} className="flex items-center justify-between">
                          <CommonUser CommonUserName={item.FriendName} CommonUserPicture={item.FriendPhoto}/>
                          <div>
                              <ButtonV1  ButonV1bg={'bg-red-500 hover:bg-red-700 duration-500'}/>
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