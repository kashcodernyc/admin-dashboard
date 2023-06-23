import Stats from './pages/stats/Stats';
import UserList from './pages/userlist/UserList';
import UserProfile from './pages/profile/userProfile';
import AddTicket from './pages/tickets/addTicket';
import DisplayTickets from './pages/tickets/DisplayTickets';
import SingleTicket from './pages/tickets/SingleTicket';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ticketInputs } from './formInputs';
import { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from './firebase';
import { AuthContext } from './components/context/AuthContext';
import { UserContext } from './Contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/forms/Signup';
import Login from './pages/forms/Login';
import EditUser from './components/edituser/EditUser';

const App = () => {

  const { currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState([])
  const [loggedUser, setLoggedUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const [tempData, setTempData] = useState(null);
  const [usersLength, setUsersLength] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(() => {
    const getUserData = () => {
      onSnapshot(collection(db, "users"), (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setUserData(list);
          setUsersLength(list.length);
        });

      }, (err) => {
        console.log(err);
      });

    }

    getUserData();


  }, [])


  useEffect(() => {
    const unsub = onSnapshot(collection(db, "invoices"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setTicketData(list);
      if (ticketData.length > 0) {
        console.log(ticketData);
      }
    }, (err) => {
      console.log(err)
    });

    return () => {
      unsub();
    };
  }, []);


  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        const snapshot = await getDoc(doc(db, "users", uid));

        if (snapshot.exists) {
          setLoggedUser({ id: uid, ...snapshot.data() });
        } else {
          console.log("user document missing")
        }
      } else {
        console.log("User not logged in")
      }
    });
  }, [])




  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />;
  }

  return (
    <UserContext.Provider value={{ userData, setUserData, usersLength, ticketData, setTicketData, tempData, setTempData, loggedUser, comments, setComments, userId, setUserId, isEditing, setIsEditing, isSidebarOpen, setIsSidebarOpen }}>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route index element={<RequireAuth><DisplayTickets /></RequireAuth>} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='users'>
                <Route index element={<RequireAuth><UserList /></RequireAuth>} />
                <Route path='profile' element={<UserProfile />} />
                <Route path='edit' element={<RequireAuth><EditUser /></RequireAuth>} />
                <Route path='stats' element={<RequireAuth><Stats /></RequireAuth>} />
              </Route>
              <Route path='tickets'>
                <Route index element={<RequireAuth><DisplayTickets /></RequireAuth>} />
                <Route path='add' element={<RequireAuth><AddTicket inputs={ticketInputs} title="Create a Ticket" /></RequireAuth>} />
                <Route path=':id' element={<RequireAuth><SingleTicket /></RequireAuth>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div >
      <ToastContainer position="top-center" />
    </UserContext.Provider>
  )
}

export default App