import React, { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { ticketInputs } from '../../formInputs'

const EditTicket = ({ id, setIsEditingTicket }) => {
    const [prevTicketData, setPrevTicketData] = useState({
        subject: "",
        reporter: "",
        status: "",
        textarea: '',
    });
    const [newTicketData, setNewTicketData] = useState({
        subject: "",
        reporter: "",
        status: "",
        textarea: '',
    });

    useEffect(() => {
        const getTicketData = async () => {
            if (id) {
                const dataRef = doc(db, "invoices", id);
                const docSnap = await getDoc(dataRef);

                if (docSnap.exists()) {
                    const ticketData = docSnap.data();
                    setPrevTicketData(ticketData);
                    setNewTicketData((prevData) => ({
                        ...prevData,
                        ...ticketData,
                    }));
                    console.log(ticketData);
                } else {
                    console.log("No such document!");
                }
            }
        };

        getTicketData();
    }, []);

    const handleEditTicket = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                const docRef = doc(db, 'invoices', id)
                await updateDoc(docRef, {
                    ...newTicketData,
                    timestamp: serverTimestamp()
                })
                console.log('this is after updating', docRef);
                setIsEditingTicket(false);
            }
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        if (id === "status") {
            setNewTicketData((prevFormData) => ({
                ...prevFormData,
                status: value,
            }));
        } else {
            setNewTicketData((prevFormData) => ({
                ...prevFormData,
                [id]: value,
            }));
        }
    };

    return (
        <div className="description">
            <div>
                <h1 className="title">Edit Ticket</h1>
            </div>
            <form onSubmit={handleEditTicket}>
                {ticketInputs.map((input) => (
                    <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
                        {input.type === "select" ? (
                            <select
                                id={input.id}
                                value={newTicketData[input.id] || ""}
                                onChange={handleChange}
                                required
                            >
                                {input.options.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                id={input.id}
                                value={newTicketData[input.id] || ""}
                                onChange={handleChange}
                                type={input.type}
                                placeholder={prevTicketData[input.id]}
                                required
                            />
                        )}
                    </div>
                ))}
                <div className="formInput">
                    <textarea
                        id="textarea"
                        value={newTicketData.textarea || ''}
                        type="text"
                        placeholder={prevTicketData.textarea}
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
    )
}

export default EditTicket