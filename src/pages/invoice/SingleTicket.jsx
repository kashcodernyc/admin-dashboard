import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar';
import './ticket.scss';
import Navbar from '../../components/navbar/Navbar';

const SingleTicket = () => {
    const { id } = useParams();
    const [ticketData, setTicketData] = useState(null);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const docRef = doc(db, 'invoices', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTicketData(docSnap.data());
                } else {
                    console.error('Ticket data not found');
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchTicketData();
    }, [id]);

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
        if (e.target.id === 'fullname') {
            setUserName(e.target.value);
        } else if (e.target.id === 'comment') {
            setComment(e.target.value);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            // Add comment to the 'comments' collection
            const commentData = {
                fullname: userName,
                comment: comment,
                ticketId: id,
            };
            const commentRef = await addDoc(collection(db, 'comments'), commentData);
            console.log('Comment added with ID: ', commentRef.id);

            // Clear the comment input fields
            setUserName('');
            setComment('');
        } catch (err) {
            console.log(err);
        }
    };

    if (ticketData === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="invoice">
            <Sidebar />
            <div className="container">
                <Navbar />
                <div className="invoiceContainer">
                    <div className="header">
                        <h1> Ticket Description </h1>
                        <button className="button" onClick={() => navigate('/invoice')}>
                            View All Tickets
                        </button>
                    </div>
                    <div className="ticketInfo">
                        <h3 className="title">Subject: {ticketData.subject}</h3>
                        <p>Created by: {ticketData.fullname}</p>
                        <h3>Description:</h3>
                        <p>{ticketData.textarea}</p>
                    </div>
                    <div className="commentSection">
                        <h3>Add a Comment</h3>
                        <form onSubmit={handleSubmitComment}>
                            <div>
                                <label htmlFor="fullname">Full Name:</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    value={userName}
                                    onChange={handleCommentChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="comment">Comment:</label>
                                <textarea
                                    id="comment"
                                    value={comment}
                                    onChange={handleCommentChange}
                                ></textarea>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="comments">
                        <h3>Comments</h3>
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.fullname}</p>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleTicket;
