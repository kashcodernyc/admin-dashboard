import './Stats.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import DisplayInvoice from '../tickets/DisplayTickets';

const Stats = () => {
  return (
    <div className='container'>
      <div className="sidebarContainer">
        <Sidebar />
      </div>
      <div className='invoiceContainer'>
        <Navbar />
        <div className='widgets'>
          <Widget type='Members' />
          <Widget type='Comments' />
          <Widget type='Invoices' />
          <Widget type='Emails' />
        </div>
      </div>
    </div>
  )
}

export default Stats