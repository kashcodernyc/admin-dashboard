import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="logo">Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>

          <Link to="/users" style={{ textDecoration: 'none' }}>
            <li>
              <PeopleOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/invoice" style={{ textDecoration: 'none' }}>
            <li>
              <DescriptionOutlinedIcon className="icon" />
              <span>Invoices</span>
            </li>
          </Link>

          <li>
            <CalendarMonthIcon className="icon" />
            <span>Events</span>
          </li>



          <p className="title">LINKS</p>

          <li>
            <QueryStatsIcon className="icon" />
            <span>Stats</span>
          </li>

          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>

          <p className="title">ACCOUNT</p>

          <Link to="/users/profile" style={{ textDecoration: 'none' }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>

          <li>
            <SettingsIcon className="icon" />
            <span>Settings</span>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  )
}

export default Sidebar