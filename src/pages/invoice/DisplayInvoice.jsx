import './displayInvoice.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Table from '../../components/table/Table';
import { Link } from 'react-router-dom';

const DisplayInvoice = () => {
    return (
        <div className="invoice">
            <Sidebar />
            <div className="invoiceContainer">
                <Navbar />
                <div className="top">
                    <h1 className="title">Latest Invoices</h1>
                    <Link to="/invoice/add" style={{ textDecoration: 'none' }}>
                        <button>Add Invoice</button>
                    </Link>
                </div>
                <div className="bottom">
                    <Table />
                </div>
            </div>
        </div>
    )
}

export default DisplayInvoice