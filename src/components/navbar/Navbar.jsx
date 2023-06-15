import './navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';



const Navbar = () => {

  const { loggedUser } = useContext(UserContext);
  // console.log(loggedUser);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="search..." /><SearchIcon />
        </div>
        <div className="items">
          <div className="item">
            Hello, {!loggedUser ? null : loggedUser.username}
          </div>
          <div className="item">
            <img src={!loggedUser ? '/images/default.jpg' : loggedUser.img} className="avatar" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar