import './navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';



const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type = "text" placeholder = "search..."/><SearchIcon/>
        </div>
      <div className="items">
        <div className="item">
          <LanguageIcon className = "icon"/>
          ENG
        </div>
        <div className="item">
          <FullscreenExitIcon className = "icon"/>
        </div>
        <div className="item">
          <DarkModeIcon className = "icon"/>
        </div>
        <div className="item">
          <NotificationsNoneIcon className = "icon"/>
          <div className="counter">1</div>
        </div>
        <div className="item">
          <ChatBubbleOutlineIcon className = "icon"/>
          <div className="counter">2</div>
        </div>
        <div className="item">
          <FormatListBulletedIcon className = "icon"/>
        </div>
        <div className="item">
        <img src = '/images/myAvatar.png' className = "avatar" alt = ""/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Navbar