import React from 'react'
import MessgBox from '../MessgBox/MessgBox'
import MessegList from '../MessegList/MessegList'

const Messege = () => {
  return (
    <>
        <div className=" pt-[147px] flex">
            <MessegList/>
            <MessgBox/>
        </div>
    </>
  )
}

export default Messege