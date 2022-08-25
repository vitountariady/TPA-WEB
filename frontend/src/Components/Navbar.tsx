import React, { useState } from 'react'
import {AiFillHome, AiFillMessage} from 'react-icons/ai'
import {BsPeopleFill, BsLinkedin, BsPersonCircle} from 'react-icons/bs'
import {FaSuitcase} from 'react-icons/fa'
import {IoMdNotifications} from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../contexts/authContext'
export default function Navbar() {

  const userContext = UserAuth();
  const navigate = useNavigate();

  const [Dropdown, setDropdown] = useState(false);

  const handleActivePage = (state:any) =>{
    if(state.isActive){
      return 'navbar-items-active'
    }else{
      return 'navbar-items'
    }
  }

  const logout = () =>{
    userContext.setUser({});
  }

  return (
    <div className='white-bg w-screen navbar'>
      <BsLinkedin className='navbar-logo'></BsLinkedin>
      {/* <img src="../../assets/AppIcon.png" alt="" className='logo' /> */}
      <input type="text" className='searchbar white-bg' placeholder='Search' />
      <div className='navbar-menu-container'>
        <NavLink to="/home" className= {handleActivePage}>
          <AiFillHome className='navbar-icon'></AiFillHome>
          <p className='item-label'>Home</p>
        </NavLink>
        <NavLink to="/mynetwork" className= {handleActivePage}>
          <BsPeopleFill className='navbar-icon'></BsPeopleFill>
          <p className='item-label'>My Network</p>
        </NavLink>
        <NavLink to="/jobs" className= {handleActivePage}>
          <FaSuitcase className='navbar-icon'></FaSuitcase>
          <p className='item-label'>Jobs</p>
        </NavLink>
        <NavLink to="/messaging" className= {handleActivePage}>
          <AiFillMessage className='navbar-icon'></AiFillMessage>
          <p className='item-label'>Messaging</p>
        </NavLink>
        <NavLink to="/notifications" className= {handleActivePage}>
          <IoMdNotifications className='navbar-icon'></IoMdNotifications>
          <p className='item-label'>Notifications</p>
        </NavLink>
        {/* <NavLink to='/profile' className= {handleActivePage}>
          <BsPersonCircle className='navbar-icon'></BsPersonCircle>
          <p className='item-label'>Profile</p>
        </NavLink> */}
        <NavLink to={"/profile/"+userContext.user.id} onMouseEnter={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className= {handleActivePage}>
          <img src={userContext.user.profile_picture} className='navbar-picture'></img>
          <p className='item-label'>{userContext.user.first_name}</p>
          {Dropdown && (
            <div className='dropdown'>
              <div onClick={logout}>Logout</div>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  )
}
