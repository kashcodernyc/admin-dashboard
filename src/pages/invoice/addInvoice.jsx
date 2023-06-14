import React, { useState, useEffect } from 'react';
import './ticket.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc, serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const Invoice = ({ inputs, title }) => {
    const [file, setFile] = useState('');
    const [data, setData] = useState({});
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
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...data, [id]: value });
        console.log(data);
    };

    const handleAddInvoice = async (e) => {
        e.preventDefault();

        try {
            // Add a new document with a generated id.
            await addDoc(collection(db, 'invoices'), {
                ...data,
                timeStamp: serverTimestamp(),
            });
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };
    const handleClose = () => {
        // Navigate back to the displayInvoice component
        navigate('/invoice');
    };

    return (
        <div className="invoice">
            <Sidebar />
            <div className="invoiceContainer">
                <Navbar />
                <div className="container">
                    <div className="title">
                        <h1>{title}</h1>
                    </div>
                    <form onSubmit={handleAddInvoice}>
                        <div className="formInput">
                            <label htmlFor="file">Upload Image or File</label>
                            <input type="file" id="file" style={{ border: 'none' }} />
                        </div>
                        {inputs.map((input) => (
                            <div className="formInput" key={input.id}>
                                <label>{input.label}</label>
                                <input
                                    id={input.id}
                                    onChange={handleInput}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                />
                            </div>
                        ))}
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
    );
};

export default Invoice;