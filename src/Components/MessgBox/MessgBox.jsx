import { useSelector } from 'react-redux'
import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { FaPaperPlane } from 'react-icons/fa';
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const MessgBox = () => {
  const currentUser = useSelector((state) => state.currentUser.value)
  const chatUser = useSelector((state) => state.ChatUser.value)
  // -------------react input variable----------
  const [Satatetext, setText] = useState("");
  const [allMsge , setllmsg]=useState([])
  // ---------firebase variable---------------
  const db = getDatabase();
  // ------------function-----------------------
  function handleOnEnter(text) {
    set(push(ref(db, 'AllMge/')), {
      SenderID:currentUser.uid,
      ReceverID:chatUser.FriendID,
      Msg:Satatetext
    });
    setText('')
  }
  // -real time data base----------
  useEffect(()=>{
    onValue(ref(db , 'AllMge/'), (snapshot) => {
      let arry=[]
      snapshot.forEach((item)=>{
        if(item.val().SenderID==currentUser.uid && item.val().ReceverID==chatUser.FriendID){
          arry.push({...item.val() , key:item.key})
        }
        else if(item.val().ReceverID==currentUser.uid && item.val().SenderID==chatUser.FriendID){
          arry.push({...item.val() , key:item.key})
        }
      })
      setllmsg(arry)
    });
  },[chatUser])

  return (
    <>
      <div className="w-[70%] min-h-screen">
        {/* --msg bar part------------------ */}
        <div className="profileBar w-full h-[60px] bg-[#fff] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex items-center gap-3 p-6">
          <div className="w-[40px] h-[40px] bg-slate-400 rounded-full ">
            <img src={chatUser?.FriendPhoto} alt="user photo" />
          </div>
          <h2 className=' font-poppins font-medium text-[16px] text-[#413030] '>{chatUser?.FriendName}</h2>
        </div>
        {/* --------------messege box part-------------- */}
        <div className="w-full min-h-screen p-6 overflow-y-scroll">
          {
            allMsge.map((item)=>(
              item.ReceverID==currentUser.uid?
              // -----------friend messege------- */}
              <div className="bg-[#FF8383] py-2 px-4 w-fit rounded-[62px] mt-2 font-normal font-poppins text-[16px] text-[#fff]">
                <h2>{item.Msg} </h2>
              </div>
              :
              // ---------my mssege--------- */}
              <div className="bg-red-500 py-2 px-4 ml-auto w-fit rounded-[62px] mt-2 font-normal font-poppins text-[16px] text-[#fff]">
                <h2>{item.Msg} </h2>
              </div>
            ))
          }
        </div>
        {/* -----------messege input-------- */}
        <div className='flex items-center gap-[3px]'>
          <InputEmoji
            value={Satatetext}
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
            />
          <FaPaperPlane onClick={handleOnEnter} className='text-[20px] text-[#616161] mr-[24px] cursor-pointer'/>
        </div>
      </div>
    </>
  )
}

export default MessgBox