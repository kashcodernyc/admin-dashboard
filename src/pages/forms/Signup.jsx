import './auth-forms.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { db, auth, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { signupInputs } from '../../formInputs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = ({ setActiveTab }) => {
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const [percent, setPercent] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPercent(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default: break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, img: downloadURL }))
                    });
                    // navigate(-1);
                }
            );

        }
        file && uploadFile();
    }, [file])

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });
    }

    const handleAddUser = async (e) => {
        e.preventDefault();

        try {
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
            // Add a new user in collection
            await setDoc(doc(db, "users", res.user.uid), {
                ...data,
                isAdmin: false,
                timeStamp: serverTimestamp(),
            });
            toast.success("Successfully Signed Up!");
            navigate("/login")


        } catch (err) {
            console.log(err)
            toast.error("Registration Unsuccessful!");
        }
    }

    return (
        <>
            <div className="authContainer">
                <h1 className="whiteTitle">Sign Up</h1>
                <form onSubmit={handleAddUser}>
                    {signupInputs.map((input) => (
                        <div className="formInput" key={input.id}>
                            <label>{input.label}</label>
                            <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput} required />
                        </div>
                    ))}
                    <button disabled={percent !== null && percent < 100} className="button" type="submit">Sign Up</button>
                    <div className="register">
                        <span>Already have an account? <button className="button" style={{ marginLeft: '10px' }} onClick={() => navigate('/login')}>Sign In</button></span>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup