import Home from './pages/home/Home';
import UserList from './pages/userlist/UserList';
import SingleUser from './pages/single/SingleUser';
import AddUser from './pages/adduser/AddUser';
import AddInvoice from './pages/invoice/addInvoice';
import DisplayInvoice from './pages/invoice/DisplayInvoice';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { userInputs, invoiceInputs } from './formInputs';
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

const App = () => {

  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState([])
  const [loggedUser, setLoggedUser] = useState("");
  const [data, setData] = useState([]);
  const [viewId, setViewId] = useState("");
  const [userId, setUserId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getUserData = () => {
      onSnapshot(collection(db, "users"), (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setData(list);
        });

      }, (err) => {
        console.log(err);
      });

    }

    getUserData();


  }, [])

  useEffect(() => {
    const getCommentData = async () => {
      onSnapshot(collection(db, "comment"), (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setComment(list);
        });

      }, (err) => {
        console.log(err);
      });

    }

    getCommentData();


  }, [])

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        const snapshot = await getDoc(doc(db, "users", uid));

        if (snapshot.exists) {
          setLoggedUser(snapshot.data());
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
    <div className='App'>
      <UserContext.Provider value={{ data, setData, loggedUser, comment, setComment, userId, setUserId, isEditing, setIsEditing, viewId, setViewId }}>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route index element={<RequireAuth><Home /></RequireAuth>} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='users'>
                <Route index element={<RequireAuth><UserList /></RequireAuth>} />
                <Route path='profile' element={<SingleUser />} />
                <Route path='add' element={<RequireAuth><AddUser inputs={userInputs} title="Add New User" /></RequireAuth>} />
              </Route>
              <Route path='invoice'>
                <Route index element={<RequireAuth><DisplayInvoice /></RequireAuth>} />
                <Route path='add' element={<RequireAuth><AddInvoice inputs={invoiceInputs} title="Create a Ticket" /></RequireAuth>} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
      <ToastContainer position="top-center" />
    </div>
  )
}

export default App