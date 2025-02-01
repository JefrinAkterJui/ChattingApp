import React, { useEffect, useState } from 'react'
import ButtonV1 from '../Common/ButtonV1'
import CommonUser from '../Common/CommonUser'
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';

const Blocklist = () => {
    // -----------firebase variables---------
    const db = getDatabase();
    // ----------Redux data------------------
    const currentUser=useSelector((state)=>state.currentUser.value)

    // -----------custom variables----------
    const [Blockfrnd , setBlockfrnd]=useState([])

    // ---------create frend ---------------
    // const HeldelFriend=(FriendData)=>{
      
    // }

    // -----------realtime database----------
    useEffect(()=>{
      onValue(ref(db , 'BlockList/'), (snapshot) => {
        let arr =[]
        snapshot.forEach((item)=>{
            if(item.val().CurrentUserID==currentUser.uid){
                arr.push({...item.val(), key:item.key})
            }
        })
        setBlockfrnd(arr)
      });
    } ,[])


    // --------------UnBlock button function------------
    const HendelunBlock=(FriendData)=>{
            set(push(ref(db,'AllFriends/')), {
              CurrentUserID:currentUser.uid,
              CurrentUserName:currentUser.displayName,
              CurrentUserPhoto:currentUser.photoURL,
              FriendID: FriendData.BlockFriendID,
              FriendName: FriendData.BlockFriendrName,
              FriendPhoto: FriendData. BlockFriendPhoto
            });
        remove(ref(db , 'BlockList/' + FriendData.key))
    }



  return (
    <>
        <div className="container pt-[147px]">
            <div className="mai_user">
                <h1 className=' font-poppins font-bold text-[30px] text-[#413030]'>All Friends</h1>
                {
                    Blockfrnd.map((item ,i)=>(
                        <div key={i} className="flex items-center justify-between">
                            <CommonUser CommonUserName={item.BlockFriendrName} CommonUserPicture={item.BlockFriendPhoto}/>
                            <div>
                                <ButtonV1 ButtonV1Clock={()=>HendelunBlock(item)} ButonV1Text={"UnBlock"} ButonV1bg={'bg-red-500 hover:bg-red-700 duration-500'}/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default Blocklist