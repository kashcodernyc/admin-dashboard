import './signup.scss';
import { useState, useEffect } from 'react';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { db, auth, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate, Link } from 'react-router-dom';
import { signupInputs } from '../../formInputs';



const Signup = () => {
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
            navigate('/login')

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="signupContainer">
            <div className="newContainer">
                <div className="top">
                    <h1 className="title">Sign Up</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleAddUser}>
                            {signupInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleInput} required />
                                </div>
                            ))}
                            <button disabled={percent !== null && percent < 100} type="submit">Sign Up</button>
                            <Link to="/login">
                                <p>alreay a user? sign in now</p>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Signup