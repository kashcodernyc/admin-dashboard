import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { Link } from 'react-router-dom';
import ViewTicket from '../viewTicket/ViewTicket';



const Tables = () => {
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
            })

            setData(list)


        }, (err) => {
            console.log(err)
        });


        return () => {
            unsub();
        }

    }, [])




    const deleteData = async (id) => {
        try {
            await deleteDoc(doc(db, "invoices", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err)
        }
    }




    return (
        <div className="conatainer">
            <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="tableCell">Subject</TableCell>
                            <TableCell className="tableCell">Fullname</TableCell>
                            <TableCell className="tableCell">Email</TableCell>
                            <TableCell className="tableCell">Date</TableCell>
                            <TableCell className="tableCell">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="tableCell">{item.subject}</TableCell>
                                <TableCell className="tableCell">{item.fullname}</TableCell>
                                <TableCell className="tableCell">{item.email}</TableCell>
                                <TableCell className="tableCell">{item.timeStamp.toDate().toDateString()}</TableCell>
                                <TableCell className="tableCell">
                                    <RemoveRedEyeOutlinedIcon onClick={() => {
                                        setViewId(item.id);
                                        setTempData(item);
                                        setIsViewing(true);
                                    }} className="viewButton" />
                                    <ClearOutlinedIcon className="deleteButton" onClick={() => deleteData(item.id)} />
                                </TableCell>
                                <TableCell className="tableCell">
                                    <div className="cellWrapper">
                                        <img src={item.img} alt="" className="image" />
                                        {item.customer}
                                    </div>
                                </TableCell>
                                <TableCell className="tableCell"><span className={`status ${item.status}`}>{item.status}</span></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                {!isViewing ? null :
                    <ViewTicket viewId={viewId} tempData={tempData} setIsViewing={setIsViewing} />
                }
            </div>
        </div>

    )
}

export default Tables