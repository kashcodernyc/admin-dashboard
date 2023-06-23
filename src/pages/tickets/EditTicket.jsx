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
                        assignee: ticketData.assignee || '',
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
                    assignee: selectedUser || ticketData.assignee,
                    timestamp: serverTimestamp(),
                });
                setIsEditingTicket(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setTicketData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    return (
        <div className="description">
            <div>
                <h1 className="h3title">Edit Ticket</h1>
            </div>
            <form onSubmit={handleEditTicket}>
                {ticketInputs.map((input) => (
                    <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
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
                    <label>Assignee</label>
                    <input
                        id="searchUser"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={ticketData?.assignee?.fullname || 'unassigned'}
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
