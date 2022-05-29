import './table.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Tables = () => {
    const rows = [
        {
            id: 1,
            subject: "Cant see the icons in dashboard",
            customer: "James Lee",
            img: "images/James.jpg",
            date: "Mar 27",
            status: "completed"
        },
        {
            id: 2,
            subject: "Cant see the icons in dashboard",
            customer: "Sydney Holmes",
            img: "images/Sydney.jpg",
            date: "Mar 27",
            status: "pending"
        },
        {
            id: 3,
            subject: "Cant see the icons in dashboard",
            customer: "Cindy Roberts",
            img: "images/Cindy.jpg",
            date: "Mar 27",
            status: "pending"
        },
        {
            id: 4,
            subject: "Cant see the icons in dashboard",
            customer: "Catherine Smith",
            img: "images/Catherine.jpg",
            date: "Mar 27",
            status: "completed"
        }
    ]
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Invoice Id</TableCell>
                        <TableCell className="tableCell">Subject</TableCell>
                        <TableCell className="tableCell">Customer</TableCell>
                        <TableCell className="tableCell">Date</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="tableCell">{row.id}</TableCell>
                            <TableCell className="tableCell">{row.subject}</TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img src={row.img} alt="" className="image" />
                                    {row.customer}
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">{row.date}</TableCell>
                            <TableCell className="tableCell"><span className={`status ${row.status}`}>{row.status}</span></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Tables