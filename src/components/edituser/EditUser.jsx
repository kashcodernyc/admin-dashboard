import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { doc, serverTimestamp, updateDoc, getDoc } from "firebase/firestore";
import { db, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import '../../pages/single/userProfile.scss'




const EditUser = () => {

    const { loggedUser } = useContext(UserContext);
    const userId = loggedUser.id;
    console.log(loggedUser, userId);

    const [file, setFile] = useState("");
    const [prevData, setPrevData] = useState("");
    const [editedData, setEditedData] = useState({});
    const [percent, setPercent] = useState(null);


    useEffect(() => {
        const getUserData = async () => {
            const dataRef = doc(db, "users", userId);
            const docSnap = await getDoc(dataRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                setPrevData(userData);
                setEditedData((oldData) => ({
                    ...oldData,
                    ...userData,
                }))
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
        userId && getUserData();
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

            const docRef = doc(db, 'users', userId);
            // Update the timestamp field with the value from the server
            await updateDoc(docRef, {
                ...editedData,
                timestamp: serverTimestamp()
            })

        } catch (err) {
            console.log(err)
        }
    }




    return (
        <div className="editUser">
            <div className="top">
                <h1 className="title">Edit User</h1>
            </div>
            <div className="imageContainer">
                <div>
                    <img className="editedImg" src={file ? URL.createObjectURL(file) : prevData.img} alt="" />
                </div>
            </div>
            <form className="editForm" onSubmit={handleAddUser}>

                <div className="formInput">
                    <label htmlFor="file">Upload Image</label>
                    <input style={{ borderBottom: 'none' }} type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className="formInput">
                    <label>Full Name</label>
                    <input id="fullname" type="text" value={editedData.fullname} placeholder={prevData.fullname} onChange={handleInput} />
                </div>
                <div className="formInput">
                    <label>Email</label>
                    <input id="email" required type="email" value={editedData.email} placeholder={prevData.email} onChange={handleInput} />
                </div>
                <div className="formInput">
                    <label>Username</label>
                    <input id="username" required type="text" value={editedData.username} placeholder={prevData.username} onChange={handleInput} />
                </div>
                <div className="formInput">
                    <label>Password</label>
                    <input id="password" required type="password" value={editedData.password} placeholder="Type password" onChange={handleInput} />
                </div>
                <div className="formInput">
                    <label>Country</label>
                    <input id="country" type="text" value={editedData.country} placeholder={prevData.country} onChange={handleInput} />
                </div>
                <button className="button" disabled={percent !== null && percent < 100} type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EditUser