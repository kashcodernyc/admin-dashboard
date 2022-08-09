import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";




const New = ({ currentId, setIsEditing }) => {

    const [file, setFile] = useState("");
    const [tempData, setTempData] = useState("");
    const [editedData, setEditedData] = useState({});
    const [percent, setPercent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            const dataRef = doc(db, "users", currentId);
            const docSnap = await getDoc(dataRef);

            if (docSnap.exists()) {
                setTempData(docSnap.data());
                console.log(docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        currentId && getUserData();
    }, [])


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
                        setEditedData((prev) => ({ ...prev, img: downloadURL }))
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
        setEditedData({ ...editedData, [id]: value })

    }

    const handleAddUser = async (e) => {
        e.preventDefault();

        try {

            const docRef = doc(db, 'users', currentId);
            // Update the timestamp field with the value from the server
            await updateDoc(docRef, {
                ...editedData,
                timestamp: serverTimestamp()
            })
            setIsEditing(false);

        } catch (err) {
            console.log(err)
        }
    }




    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1 className="title">Edit User</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img src={file ? URL.createObjectURL(file) : tempData.img} alt="" />
                    </div>
                    <div className="right">
                        <form onSubmit={handleAddUser}>
                            <div className="formInput">
                                <label htmlFor="file">Upload Image</label>
                                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                            <div className="formInput">
                                <label>Username</label>
                                <input id={"username"} type={"text"} placeholder={tempData.username} onChange={handleInput} />
                            </div>
                            <div className="formInput">
                                <label>Full Name</label>
                                <input id={"fullname"} type={"text"} placeholder={tempData.fullname} onChange={handleInput} />
                            </div>
                            <div className="formInput">
                                <label>Email</label>
                                <input id={"email"} type={"email"} placeholder={tempData.email} onChange={handleInput} />
                            </div>
                            <div className="formInput">
                                <label>Phone</label>
                                <input id={"phone"} type={"text"} placeholder={tempData.phone} onChange={handleInput} />
                            </div>
                            <div className="formInput">
                                <label>Password</label>
                                <input id={"password"} type={"password"} placeholder={"type password"} onChange={handleInput} />
                            </div>
                            <div className="formInput">
                                <label>Address</label>
                                <input id={"address"} type={"text"} placeholder={tempData.address} onChange={handleInput} />
                            </div>
                            <div className="formInput">
                                <label>Country</label>
                                <input id={"country"} type={"text"} placeholder={tempData.country} onChange={handleInput} />
                            </div>
                            <button disabled={percent !== null && percent < 100} type="submit">SEND</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default New