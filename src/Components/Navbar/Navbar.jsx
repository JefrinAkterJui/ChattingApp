import React, { useState } from 'react'
import './Navbar.css'
import { FaBars } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BsPeople } from 'react-icons/bs'
import { BiMessageSquareDots } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'
import { TbUserCheck } from 'react-icons/tb'
import { LuUserMinus } from 'react-icons/lu'
import { SlLogout } from 'react-icons/sl'
import { useDispatch } from 'react-redux'
import { UserData } from '../../Slice/userSlice'
import { IoIosNotificationsOutline, IoMdNotificationsOutline } from 'react-icons/io'
import { MdOutlineAddReaction } from 'react-icons/md'

const Navbar = () => {
    const [showIcon , setShowIcon] =useState(false)
    const dispatch =useDispatch()
    const navigate =useNavigate()
    const hendelLogout =()=>{
        localStorage.removeItem('currentUser')
        dispatch(UserData(null))
        navigate('/Login')
    }

  return (
    <>
    <div className="main ">
        <div className={`main_navbar ${showIcon? 'showMnue' : 'closeMnue'}`}>
            <div className={`icons icon2 ${showIcon? 'showIcons' : 'closeIcons'}`}>
                <ul>
                    <li><Link><CgProfile /></Link> <p>Profile</p> </li>
                    <li><Link to={'/Alluser'}><BsPeople /></Link> <p>Users</p> </li>
                    <li><Link to={'/Messege'} ><BiMessageSquareDots /></Link> <p>Messege</p> </li>
                    <li><Link><IoMdNotificationsOutline className='text-[22px]'/></Link> <p>Notification</p> </li>
                </ul>
            </div>
            <div onClick={()=>setShowIcon(!showIcon)} className="nav_icon">
                <FaBars />
            </div>
            <div className={`icons icon2 ${showIcon? 'showIcons' : 'closeIcons'}`}>
                <ul>
                    <li><Link to={'/FrndRequest'}><FiUserPlus /></Link><p>Request</p></li>
                    <li><Link to={'/Friends'}><TbUserCheck /></Link><p>Friends</p></li>
                    <li><Link to={'/BlockFrnd'}><LuUserMinus /></Link><p>Block</p></li>
                    <li><Link><MdOutlineAddReaction /></Link> <p>MyReq...</p> </li>
                </ul>
            </div>
        </div>
        <div className="container relative">
            <div className="logoutbutton flex absolute  mt-[60px] ">
                <SlLogout onClick={hendelLogout} className='text-[25px] text-[#423a3a]  cursor-pointer' />
            </div>

        </div>
    </div>
    </>
  )
}

export default Navbar