import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
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
            arry.push({key: item.key , FriendID: item.val().FriendID , FriendName: item.val().FriendName , FriendPhoto:item.val().FriendPhoto })
          }
          else if(item.val().FriendID==currentUser.uid){
            arry.push({ key: item.key , FriendID:item.val().CurrentUserID , FriendName:item.val().CurrentUserName , FriendPhoto:item.val().CurrentUserPhoto})
          }
        })
        setallFriends(arry)
      })
    } ,[])
    // --------------block function----------------
    const HendelBlock =(BlockFriend)=>{
      set(push(ref(db,'BlockList/')), {
        BlockFriendID:BlockFriend.FriendID,
        BlockFriendrName:BlockFriend.FriendName,
        BlockFriendPhoto:BlockFriend.FriendPhoto,
        CurrentUserID: currentUser.uid,
      });
      remove(ref(db , 'AllFriends/' + BlockFriend.key))
    }
    // --------------Remove button function------------
    const hendelUnFriend =(UnFriend)=>{
      remove(ref(db , 'AllFriends/' + UnFriend.key))
    }
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
                              <ButtonV1 ButonV1Text={"UnFriend"} ButtonV1Clock={()=>hendelUnFriend(item)}  ButonV1bg={'bg-red-500 hover:bg-red-700 duration-500'}/>
                              <ButtonV1 ButonV1Text={"Block"} ButtonV1Clock={()=>HendelBlock(item)} ButonV1bg={'bg-red-500 hover:bg-red-700 duration-500 ml-3'}/>
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