import './displayInvoice.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import SingleInvoice from './SingleInvoice';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const DisplayInvoice = () => {
    const [viewId, setViewId] = useState("");
    const [data, setData] = useState([]);
    const [tempData, setTempData] = useState("");
    const [isViewing, setIsViewing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "invoices"), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            setData(list);
        }, (err) => {
            console.log(err)
        });

        return () => {
            unsub();
        };
    }, []);

    const deleteData = async (id) => {
        try {
            await deleteDoc(doc(db, "invoices", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    console.log(data)

    return (
        <>
            {isViewing ? <SingleInvoice tempData={tempData} /> :
                (
                    <div className="invoice">
                        <Sidebar />
                        <div className="container">
                            <Navbar />
                            <div className="invoiceContainer">
                                <div className="header">
                                    <h1>Latest Tickets</h1>
                                    <Link to="/invoice/add" style={{ textDecoration: 'none' }}>
                                        <button className="addInvoice">Add Tickets</button>
                                    </Link>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="tableCell">Subject</th>
                                            <th className="tableCell">Fullname</th>
                                            <th className="tableCell">Date</th>
                                            <th className="tableCell">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={item.id}>
                                                <td className="tableCell">{item.subject}</td>
                                                <td className="tableCell">{item.fullname}</td>
                                                <td className="tableCell">{item.timeStamp.toDate().toDateString()}</td>
                                                <td className="tableCell">
                                                    <button
                                                        onClick={() => {
                                                            setViewId(item.id);
                                                            setTempData(item);
                                                            setIsViewing(true);
                                                        }}
                                                        className="greenButton"
                                                    >
                                                        View
                                                    </button>
                                                    <button className="redButton" onClick={() => deleteData(item.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
        </>

    );
};

export default DisplayInvoice;