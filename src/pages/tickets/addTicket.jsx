import React, { useState, useEffect, useContext } from 'react';
import './ticket.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { UserContext } from '../../Contexts/UserContext';

const Tickets = ({ inputs, title }) => {
    const { loggedUser, userData } = useContext(UserContext)
    const [file, setFile] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [ticketData, setTicketData] = useState({
        subject: "",
        reporter: loggedUser.fullname,
        status: "Unassigned",
        textarea: "",
        assignee: "",
    });
    const [isSearching, setIsSearching] = useState(true);
    const [percent, setPercent] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const uploadFile = () => {
    //         const name = new Date().getTime() + file.name;
    //         const storageRef = ref(storage, file.name);

    //         const uploadTask = uploadBytesResumable(storageRef, file);

    //         uploadTask.on(
    //             'state_changed',
    //             (snapshot) => {
    //                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //                 console.log('Upload is ' + progress + '% done');
    //                 setPercent(progress);
    //                 switch (snapshot.state) {
    //                     case 'paused':
    //                         console.log('Upload is paused');
    //                         break;
    //                     case 'running':
    //                         console.log('Upload is running');
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //             },
    //             (error) => {
    //                 console.log(error);
    //             },
    //             () => {
    //                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                     setData((prev) => ({ ...prev, img: downloadURL }));
    //                 });
    //                 // navigate(-1);
    //             }
    //         );
    //     };
    //     file && uploadFile();
    // }, [file]);

    const handleInput = (e) => {
        const { id, value } = e.target;
        if (id === 'assignedUser') {
            setSelectedUser(value);
        } else {
            setTicketData({ ...ticketData, [id]: value });
        }
    };

    const handleAddTicket = async (e) => {
        e.preventDefault();

        try {
            // Add a new document with a generated id.
            await addDoc(collection(db, 'invoices'), {
                ...ticketData,
                timeStamp: serverTimestamp(),
            });
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };
    const handleClose = () => {
        navigate('/tickets');
    };

    return (
        <div className="invoice">
            <Sidebar />
            <div className="container">
                <Navbar />
                <div className="invoiceContainer">
                    <div className="description">
                        <div>
                            <h1 className="title">{title}</h1>
                        </div>
                        <form onSubmit={handleAddTicket}>
                            <div className="formInput">
                                <label htmlFor="file">Upload Image or File</label>
                                <input type="file" id="file" style={{ border: 'none' }} />
                            </div>
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    {input.type === "select" ? (
                                        <select
                                            id={input.id}
                                            value={ticketData.status}
                                            onChange={handleInput}
                                            required
                                        >
                                            {input.options.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id={input.id}
                                            onChange={handleInput}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Assignee</label>
                                <input
                                    id="searchUser"
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name..."
                                />
                                <div>
                                    {searchQuery && (
                                        <ul>
                                            {userData &&
                                                userData
                                                    .filter(
                                                        (user) =>
                                                            user.fullname &&
                                                            user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
                                                    )
                                                    .map((user) => (
                                                        <li
                                                            onClick={() => {
                                                                setSelectedUser(user);
                                                                setSearchQuery(user.fullname);
                                                            }}
                                                            key={user.id}
                                                        >
                                                            {user.fullname}
                                                        </li>
                                                    ))}
                                        </ul>
                                    )}

                                </div>

                            </div>
                            <div className="formInput">
                                <textarea id="textarea" type="text" placeholder="enter text here..." onChange={handleInput}></textarea>
                            </div>
                            <div className="buttons">
                                <button className="greenButton" type="submit">Post</button>
                                <button className="redButton" onClick={handleClose}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tickets;