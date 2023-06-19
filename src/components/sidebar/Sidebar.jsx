import { useState } from 'react';
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { AiOutlineCloseSquare } from 'react-icons/ai'
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/reducers';




const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();
  const dispatchNav = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signOut(auth).then((userCredential) => {
      dispatch({ type: "LOGOUT", payload: userCredential })
      navigate('/login')
    }).catch((error) => {
      console.log(error);
    });

  }

  const handleToggleSidebar = () => {
    dispatchNav(toggleSidebar());
  };



  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="center">
          <ul>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <li>
                <DashboardIcon className="icon" />
                <span className="navLinks">Dashboard</span>
              </li>
            </Link>

            <Link to="/users" style={{ textDecoration: 'none' }}>
              <li>
                <PeopleOutlineIcon className="icon" />
                <span className="navLinks">Users</span>
              </li>
            </Link>

            <Link to="/tickets" style={{ textDecoration: 'none' }}>
              <li>
                <DescriptionOutlinedIcon className="icon" />
                <span className="navLinks">Tickets</span>
              </li>
            </Link>

            <li>
              <CalendarMonthIcon className="icon" />
              <span className="navLinks">Events</span>
            </li>


            <Link to="/users/stats" style={{ textDecoration: 'none' }}>
              <li>
                <QueryStatsIcon className="icon" />
                <span className="navLinks">Stats</span>
              </li>
            </Link>

            <Link to="/users/profile" style={{ textDecoration: 'none' }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span className="navLinks">Profile</span>
              </li>
            </Link>

            <li onClick={handleLogout}>
              <LogoutIcon className="icon" />
              <span className="navLinks">Logout</span>

            </li>
          </ul>
        </div>
      </div>

    </>
  )
}

export default Sidebar