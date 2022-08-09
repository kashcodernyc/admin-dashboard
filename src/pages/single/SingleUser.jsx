import './singleuser.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';

const Single = () => {
  const { loggedUser } = useContext(UserContext);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="itemTitle">Profile</h1>
            <div className="item">
              <div className="itemIng">
                <img src={loggedUser.img} alt="" className="profileImg" />
              </div>

              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Full Name:</span>
                  <span className="itemValue">{loggedUser.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{loggedUser.email}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{loggedUser.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{loggedUser.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{loggedUser.country}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Single