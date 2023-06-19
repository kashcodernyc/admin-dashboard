import './ticket.scss';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from '../../Contexts/UserContext';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';


const DisplayInvoice = () => {
    const { ticketData, setTicketData, loggedUser } = useContext(UserContext)
    if (loggedUser) {
        console.log(loggedUser);
    }
    if (ticketData) {
        console.log(ticketData);
    }
    const navigate = useNavigate();


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
            <div className="container">
                <Sidebar />
                <div className="invoiceContainer">
                    <Navbar />
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
                                <th className="tableCell">Assignee</th>
                                <th className="tableCell">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ticketData &&
                                ticketData
                                    .filter((ticket) => {
                                        if (window.location.pathname === '/') {
                                            // Display tickets of loggedUser
                                            return ticket.assignee?.id === loggedUser?.id;
                                        } else if (window.location.pathname === '/tickets') {
                                            // Display all tickets
                                            return true;
                                        }
                                        return false;
                                    })
                                    .map((item, index) => (
                                        <tr key={item.id}>
                                            <td className="tableCell">{item.subject}</td>
                                            <td className="tableCell">{item.reporter}</td>
                                            <td className="tableCell">{item.timeStamp ? item.timeStamp.toDate().toDateString() : ''}</td>
                                            <td className={`tableCell-${item.status}`}>{item.status}</td>
                                            <td className="tableCell">{item.assignee ? item.assignee.fullname : 'unassigned'}</td>
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
        </>

    );
};

export default DisplayInvoice;