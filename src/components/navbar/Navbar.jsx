import './navbar.scss';
import { RxHamburgerMenu } from 'react-icons/rx'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../../store/reducers';



const Navbar = () => {
  const { loggedUser } = useContext(UserContext);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
    console.log(isSidebarOpen)
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div>
          <RxHamburgerMenu onClick={handleToggleSidebar} className="burger-menu" />
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