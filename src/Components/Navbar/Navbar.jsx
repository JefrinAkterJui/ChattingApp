import React, { useState } from 'react'
import './Navbar.css'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { CgProfile } from 'react-icons/cg'
import { BsPeople } from 'react-icons/bs'
import { BiMessageSquareDots } from 'react-icons/bi'
import { FiUserPlus } from 'react-icons/fi'
import { TbUserCheck } from 'react-icons/tb'
import { LuUserMinus } from 'react-icons/lu'

const Navbar = () => {
    const [showIcon , setShowIcon] =useState(false)

  return (
    <>
        <div className={`main_navbar ${showIcon? 'showMnue' : 'closeMnue'}`}>
            <div className={`icons icon2 ${showIcon? 'showIcons' : 'closeIcons'}`}>
                <ul>
                    <li><Link><CgProfile /></Link> <p>Profile</p> </li>
                    <li><Link><BsPeople /></Link> <p>Users</p> </li>
                    <li><Link><BiMessageSquareDots /></Link> <p>Messege</p> </li>
                </ul>
            </div>
            <div onClick={()=>setShowIcon(!showIcon)} className="nav_icon">
                <FaBars />
            </div>
            <div className={`icons icon2 ${showIcon? 'showIcons' : 'closeIcons'}`}>
                <ul>
                    <li><Link><FiUserPlus /></Link><p>Request</p></li>
                    <li><Link><TbUserCheck /></Link><p>Friends</p></li>
                    <li><Link><LuUserMinus /></Link><p>Block</p></li>
                </ul>
            </div>
        </div>
    </>
  )
}

export default Navbar