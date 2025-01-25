import React from 'react'
import CommonUser from '../Common/CommonUser'
import ButtonV1 from '../Common/ButtonV1'

const Alluser = () => {
  return (
    <>
        <div className="container pt-[147px]">
            <div className="mai_user">
                <h1 className=' font-poppins font-bold text-[30px] text-[#fff]'>All Users</h1>
                <div className="flex items-center justify-between">
                    <CommonUser CommonUserName={'lallala'}/>
                    <ButtonV1 ButonV1bg={'bg-red-500'} ButonV1Text={'Add'}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Alluser