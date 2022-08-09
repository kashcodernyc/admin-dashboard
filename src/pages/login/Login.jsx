import './login.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../components/context/AuthContext';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom'
import { loginInputs } from '../../formInputs';





const Login = () => {
  const [error, setError] = useState(false);
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
        setError(true)
      });

  }

  return (

    <div className="signupContainer">
      <div className="newContainer">
        <div className="top">
          <h1 className="title">Sign In</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleLogin}>
              <div className="formInput">
                <label>Email</label>
                <input id="email" type="text" placeholder="type email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input id="password" type="password" placeholder="type paswsword" onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit">Sign In</button>
              <Link to="/signup">
                <p>new user? sign up now</p>
              </Link>
              {error && <span>Invalid Email or Password</span>}
            </form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login