import { NavLink } from "react-router-dom"
import { BsHouseDoor } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { TbBrandMessenger } from 'react-icons/tb';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { memo } from "react";


function Navbar() {
    return (
        <div className="navbar">
            <div className="icons" title='Home'><NavLink className={({ isActive }) => isActive ? 'click' : 'content'} to={'/main/'} ><BsHouseDoor /></NavLink></div>
            <div className="icons" title='Friends'><NavLink className={({ isActive }) => isActive ? 'click' : 'content'} to={'/main/dfriends'}><FiUsers /></NavLink></div>
            <div className="icons" title='Messenger'><NavLink className={({ isActive }) => isActive ? 'click' : 'content'} to={'/main/dmessenger'} ><TbBrandMessenger /></NavLink></div>
            <div className="icons" title='Online'><NavLink className={({ isActive }) => isActive ? 'click' : 'content'} to={'/main/donline'}><HiOutlineStatusOnline /></NavLink></div>
        </div >
    )
}

export default memo(Navbar)
