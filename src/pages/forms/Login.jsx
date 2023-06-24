import './auth-forms.scss';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext)



  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user })
        navigate("/")
      })
      .catch((error) => {
        toast.error("Invalid email or password!");
      });
  }

  return (
    <>
      <div className="authContainer">
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="formInput">
            <label>Email</label>
            <input id="email" type="text" placeholder="type email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="formInput">
            <label>Password</label>
            <input id="password" type="password" placeholder="type password" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="button" type="submit">Sign In</button>
          <div className="register">
            <span>dont have account? <span className="spanBtn" onClick={() => navigate('/signup')}>Sign Up</span></span>
          </div>
          <div className="test-account">
            <p>Test Account: mali@gmail.com</p>
            <p>Test Password: nba1234</p>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login