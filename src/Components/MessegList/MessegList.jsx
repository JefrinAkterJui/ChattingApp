import React, { useEffect, useState } from 'react'
import CommonUser from '../Common/CommonUser'
import { getDatabase, onValue, ref, remove } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { chatData } from '../../Slice/MessgSlice'

const MessegList = () => {
  // -----------firebase variables---------
  const db = getDatabase()
  // ----------Redux data------------------
  const currentUser = useSelector((state) => state.currentUser.value)
  const dispatch =useDispatch()
  // -----------custom variables----------
  const [allFriends, setallFriends] = useState([])

  // -----------realtime database----------
  useEffect(() => {
    onValue(ref(db, 'AllFriends/'), (snapshot) => {
      let arry = []
      snapshot.forEach((item) => {
        if (item.val().CurrentUserID == currentUser.uid) {
          arry.push({
            key: item.key,
            FriendID: item.val().FriendID,
            FriendName: item.val().FriendName,
            FriendPhoto: item.val().FriendPhoto
          })
        } else if (item.val().FriendID == currentUser.uid) {
          arry.push({
            key: item.key,
            FriendID: item.val().CurrentUserID,
            FriendName: item.val().CurrentUserName,
            FriendPhoto: item.val().CurrentUserPhoto
          })
        }
      })
      setallFriends(arry)
    })
  }, [])
  const HendelMssgFd =(chatfrndData)=>{
    localStorage.setItem('ChatUser' , JSON.stringify(chatfrndData))
    dispatch(chatData(chatfrndData))
  }


  return (
    <>
      <div className="w-[30%] min-h-screen bg-red-500 p-6 pl-10 rounded-tr-[10px] rounded-br-[10px] overflow-y-scroll">
        <h2 className="text-[30px] text-[#fff] font-poppins font-semibold">
          Friends
        </h2>
        {
        allFriends.map((item, i) => (
          <div onClick={()=>HendelMssgFd(item)} key={i} className="Singlefrnd my-5 cursor-pointer">
            <CommonUser CommonUserName={item.FriendName}  CommonUserPicture={item.FriendPhoto} />
          </div>
        ))}
      </div>
    </>
  )
}

export default MessegList
