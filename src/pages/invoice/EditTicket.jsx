import React, { useState, useEffect } from 'react'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { ticketInputs } from '../../formInputs'

const EditTicket = ({ id, setIsEditingTicket }) => {
    const [prevTicketData, setPrevTicketData] = useState({
        fllname: "",
        subject: "",
        textarea: '',
    });
    const [newTicketData, setNewTicketData] = useState({
        fullname: "",
        subject: "",
        textarea: '',
    });

    useEffect(() => {
        const getTicketData = async () => {
            if (id) {
                const dataRef = doc(db, "invoices", id);
                const docSnap = await getDoc(dataRef);

                if (docSnap.exists()) {
                    setPrevTicketData(docSnap.data());
                    console.log(docSnap.data());
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
                setIsEditingTicket(false);
            }
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setNewTicketData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
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
                        <input
                            id={input.id}
                            value={newTicketData[input.id] || ''}
                            onChange={handleChange}
                            type={input.type}
                            placeholder={prevTicketData[input.id]}
                            required
                        />
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