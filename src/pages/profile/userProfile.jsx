import './userProfile.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import EditUser from '../../components/edituser/EditUser';
import { AiFillCloseSquare } from 'react-icons/ai'

const UserProfile = () => {
  const { loggedUser } = useContext(UserContext);
  const [isEditingUser, setIsEditingUser] = useState(false);

  const openModal = () => {
    setIsEditingUser(true);
  };

  const closeModal = () => {
    setIsEditingUser(false);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="invoiceContainer">
        <Navbar />
        <div className="profileDetails">
          <div className="top">
            <div className="itemIng">
              <img src={loggedUser.img ? loggedUser.img : process.env.PUBLIC_URL + '/images/default.jpg'} alt="" className="profileImg" />
            </div>
            <h1 className="title">{loggedUser.username}</h1>
            <button onClick={openModal} className="button">Edit Profile</button>
          </div>

          <div className="details">
            <div className="detailItem">
              <span className="itemKey">Username:</span>
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
      {isEditingUser && (
        <div className="modalContainer">
          <div className="modalContent">
            <AiFillCloseSquare onClick={closeModal} className="closeIcon" />
            <EditUser userId={loggedUser?.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;