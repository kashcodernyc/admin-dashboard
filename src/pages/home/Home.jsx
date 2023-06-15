import './home.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Widget from '../../components/widget/Widget';
import Featured from '../../components/featured/Featured';
import Chart from '../../components/chart/Chart';
import DisplayInvoice from '../invoice/DisplayInvoice';

const Home = () => {
  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
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

export default Home