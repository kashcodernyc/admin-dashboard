import './ticket.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { UserContext } from '../../Contexts/UserContext';
import { db } from '../../firebase';

const DisplayInvoice = () => {
    const { loggedUser } = useContext(UserContext);
    const [ticketData, setTicketData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "invoices"), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            setTicketData(list);
        }, (err) => {
            console.log(err)
        });

        return () => {
            unsub();
        };
    }, []);

    const deleteTicket = async (id) => {
        try {
            await deleteDoc(doc(db, "invoices", id));
            setTicketData(ticketData.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <>
            <div className="invoice">
                <Sidebar />
                <div className="container">
                    <Navbar />
                    <div className="invoiceContainer">
                        <div className="header">
                            <h1 className="title">Ticket List</h1>
                            <Link to="/tickets/add" style={{ textDecoration: 'none' }}>
                                <button className="button">Add Tickets</button>
                            </Link>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="tableCell">Subject</th>
                                    <th className="tableCell">Reporter</th>
                                    <th className="tableCell">Date</th>
                                    <th className="tableCell">Status</th>
                                    <th className="tableCell">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ticketData?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="tableCell">{item.subject}</td>
                                        <td className="tableCell">{item.reporter}</td>
                                        <td className="tableCell">{item.timeStamp ? item.timeStamp.toDate().toDateString() : ''}</td>
                                        <td className="tableCell">{item.status}</td>
                                        <td className="tableCell">
                                            <button
                                                onClick={() => navigate(`/tickets/${item.id}`)}
                                                className="greenButton"
                                            >
                                                View
                                            </button>
                                            <button className="redButton" onClick={() => deleteTicket(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>

    );
};

export default DisplayInvoice;