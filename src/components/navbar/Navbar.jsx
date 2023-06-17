import './navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
  const navigate = useNavigate();

  const { loggedUser } = useContext(UserContext);

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
          <div onClick={() => navigate('/users/profile')} className="item">
            <img src={!loggedUser.img ? process.env.PUBLIC_URL + '/images/default.jpg' : loggedUser.img} className="avatar" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar