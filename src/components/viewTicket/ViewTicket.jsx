import './viewticket.scss';
import { useState, useEffect, useContext } from 'react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { serverTimestamp, addDoc, collection, onSnapshot, } from "firebase/firestore";
import { db } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';

const ViewTicket = ({ tempData, setIsViewing }) => {

    const { loggedUser } = useContext(UserContext);
    const { comment } = useContext(UserContext);
    const [data, setData] = useState([]);
    const navigate = useNavigate();



    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;
        setData({ ...comment, [id]: value })

    }

    const handleAddComment = async (e) => {
        e.preventDefault();

        try {
            // Add a new document with a generated id.
            await addDoc(collection(db, "comment"), {
                ...data,
                timeStamp: serverTimestamp()
            });


        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div className="container">
            <div className="singleContainer">
                <div className="details" style={{ position: "relative" }}>
                    <ClearOutlinedIcon style={{ color: "red", position: "absolute", right: "10px" }} className="cancel" onClick={() => setIsViewing(false)} />
                    <h1>{tempData.subject}</h1>
                    <p>posted by: {tempData.fullname}</p>
                    <p>email: {tempData.email}</p>
                    <p>description: {tempData.textarea}</p>
                    <form onSubmit={handleAddComment}>
                        <input type="text" placeholder="enter name" id="entername" onChange={handleInput} />
                        <textarea placeholder="add comment here" type="text" id="textarea" onChange={handleInput} />
                        <button type="submit">SEND</button>
                    </form>
                    {comment.map((item) => (
                        <div key={item.id}>
                            <p>{item.textarea} - {item.entername}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ViewTicket