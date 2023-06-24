import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar';
import './ticket.scss';
import Navbar from '../../components/navbar/Navbar';
import EditTicket from './EditTicket';

const SingleTicket = () => {
    const { id } = useParams();
    const { loggedUser } = useContext(UserContext);
    const [ticketData, setTicketData] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [isEditingTicket, setIsEditingTicket] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                if (id) {
                    const docRef = doc(db, 'invoices', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setTicketData(docSnap.data());
                    } else {
                        console.error('Ticket data not found');
                    }
                } else {
                    console.error('Ticket data not found');
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchTicketData();
    }, [id, isEditingTicket]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsRef = collection(db, 'comments');
                const q = query(commentsRef, where('ticketId', '==', id));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const commentList = [];
                    querySnapshot.forEach((doc) => {
                        commentList.push({ id: doc.id, ...doc.data() });
                    });
                    setComments(commentList);
                });

                return () => {
                    unsubscribe();
                };
            } catch (err) {
                console.log(err);
            }
        };

        fetchComments();
    }, [id]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            // Add comment to the 'comments' collection
            const commentData = {
                fullname: loggedUser.fullname,
                image: loggedUser.img,
                comment: comment,
                ticketId: id,
                timeStamp: serverTimestamp(),
            };
            const commentRef = await addDoc(collection(db, 'comments'), commentData);

            // Clear the comment input fields
            setComment('');
        } catch (err) {
            console.log(err);
        }
    };

    if (ticketData === null) {
        return <div>Loading...</div>;
    }
    const formatDate = (date) => {
        const options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        return date.toLocaleString('en-US', options);
    }

    return (
        <div className="container">
            <Sidebar />
            <div className="invoiceContainer">
                <Navbar />
                {isEditingTicket ? <EditTicket id={id} setIsEditingTicket={setIsEditingTicket} /> : (
                    <div className="description">
                        <div className="header">
                            <h1> Ticket Description </h1>
                            <button className="button" onClick={() => setIsEditingTicket(true)}>
                                Edit Ticket
                            </button>
                        </div>
                        <div className="ticketInfo">
                            <h3 className="h3title">Subject:</h3>
                            <p>{ticketData.subject}</p>
                            <h3 className="h3title">Reporter:</h3>
                            <p>{ticketData.reporter}</p>
                            <h3 className="h3title">Status:</h3>
                            <p>{ticketData.status}</p>
                            <h3 className="h3title">Assigne:</h3>
                            <p>{ticketData.assignee ? ticketData.assignee.fullname : 'unassigned'}</p>
                            <h3 className="h3title">Description:</h3>
                            <p>{ticketData.textarea}</p>
                        </div>
                        <div className="commentSection">
                            <form onSubmit={handleSubmitComment}>
                                <div className="formInput">
                                    <label className="h3title" htmlFor="comment">Add Comment:</label>
                                    <textarea
                                        id="comment"
                                        value={comment}
                                        onChange={handleCommentChange}
                                        required
                                    ></textarea>
                                </div>
                                <button className="button" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                )}
                <div className="comments">
                    <h3 className="title">Comments</h3>
                    {comments.length > 0 ? comments
                        .sort((a, b) => b.timeStamp.toDate() - a.timeStamp.toDate())
                        .map((comment) => (
                            <div className="post-container" key={comment.id}>
                                <div className="image-container">
                                    <img src={comment.image} alt={comment.fullname} className="user-image" />
                                </div>
                                <div className="comment-container">
                                    <p className="username">{comment.fullname}</p>
                                    <p className="comment">{comment.comment}</p>
                                    <p className="comment">
                                        {comment.timeStamp ? formatDate(comment.timeStamp.toDate()) : null}
                                    </p>
                                </div>
                            </div>
                        )) :
                        <div>
                            <p style={{ color: 'black' }}>no comment found.</p>
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default SingleTicket;
