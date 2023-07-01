import React, { useState, useEffect, useContext } from 'react'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { ticketInputs } from '../../formInputs'
import { UserContext } from '../../Contexts/UserContext';

const EditTicket = ({ id, setIsEditingTicket }) => {
    const { userData } = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [ticketData, setTicketData] = useState({
        subject: '',
        reporter: '',
        status: '',
        textarea: '',
        assignee: {},
    });

    useEffect(() => {
        const getTicketData = async () => {
            if (id) {
                const dataRef = doc(db, 'invoices', id);
                const docSnap = await getDoc(dataRef);

                if (docSnap.exists()) {
                    const ticketData = docSnap.data();
                    setTicketData((prevData) => ({
                        ...prevData,
                        ...ticketData,
                        assignee: ticketData.assignee || 'unassigned',
                    }));
                } else {
                    console.log('No such document!');
                }
            }
        };

        getTicketData();
    }, []);

    const handleEditTicket = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                const docRef = doc(db, 'invoices', id);
                await updateDoc(docRef, {
                    ...ticketData,
                    assignee: selectedUser || 'unassigned',
                    timestamp: serverTimestamp(),
                });
                console.log(ticketData);
                setIsEditingTicket(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === 'assignee') {
            setSearchQuery(value);
            const user = userData.find((user) => user.fullname.toLowerCase() === value.toLowerCase());
            setSelectedUser(user || 'unassigned');
        } else {
            setTicketData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    return (
        <div className="description">
            <div>
                <h1 className="h3title">Edit Ticket</h1>
            </div>
            <form onSubmit={handleEditTicket}>
                {ticketInputs.map((input) => (
                    <div className="formInput" key={input.id}>
                        <h3 className="h3title">{input.label}:</h3>
                        {input.type === 'select' ? (
                            <select
                                id={input.id}
                                value={ticketData[input.id] || ''}
                                onChange={handleChange}
                                required
                            >
                                {input.options.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                id={input.id}
                                value={ticketData[input.id] || ''}
                                onChange={handleChange}
                                type={input.type}
                                placeholder={ticketData[input.id]}
                                required
                            />
                        )}
                    </div>
                ))}
                <div className="formInput">
                    <h3 className="h3title">Assignee:</h3>
                    <input
                        id="assignee"
                        type="text"
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder={'Search by name...'}
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
                                            <ul>
                                                <li
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setSearchQuery(user.fullname);
                                                    }}
                                                    key={user.id}
                                                >
                                                    {user.fullname}
                                                </li>
                                            </ul>
                                        ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="formInput">
                    <h3 className="h3title">Description:</h3>
                    <textarea
                        id="textarea"
                        value={ticketData.textarea || ''}
                        type="text"
                        placeholder={ticketData.textarea}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="buttons">
                    <button className="greenButton" type="submit">
                        Post
                    </button>
                    <button className="redButton" onClick={() => setIsEditingTicket(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTicket;
