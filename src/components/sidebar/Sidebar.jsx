import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';




const Sidebar = ({ isViewing, setIsViewing }) => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

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


  return (
    <div className="sidebar">
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="groupTitle">LISTS</p>

          <Link to="/users" style={{ textDecoration: 'none' }}>
            <li>
              <PeopleOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/invoice" style={{ textDecoration: 'none' }}>
            <li>
              <DescriptionOutlinedIcon className="icon" />
              <span>Tickets</span>
            </li>
          </Link>

          <li>
            <CalendarMonthIcon className="icon" />
            <span>Events</span>
          </li>



          <p className="groupTitle">LINKS</p>

          <li>
            <QueryStatsIcon className="icon" />
            <span>Stats</span>
          </li>

          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>

          <p className="groupTitle">ACCOUNT</p>

          <Link to="/users/profile" style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>

          <li onClick={handleLogout}>
            <LogoutIcon className="icon" />
            <span>Logout</span>

          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar