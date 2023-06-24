import './navbar.scss';
import { RxHamburgerMenu } from 'react-icons/rx'
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/sidebarReducer';



const Navbar = () => {
  const { loggedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div>
          <RxHamburgerMenu onClick={handleToggleSidebar} className="burger-menu" />
        </div>
        <div className="searchInput">
          <input type="text" placeholder="search..." /><BiSearchAlt className="searchIcon" />
        </div>
        <div className="items">
          <div className="item">
            Hello, {!loggedUser ? null : loggedUser.username}
          </div>
          <div onClick={() => navigate('/users/profile')} className="item">
            <img src={!loggedUser.img ? process.env.PUBLIC_URL + '/images/default.jpg' : loggedUser.img} className="avatar" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar