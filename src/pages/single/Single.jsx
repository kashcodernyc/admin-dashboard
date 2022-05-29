import './single.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Chart from '../../components/chart/Chart';
import Table from '../../components/table/Table';

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="itemTitle">Cindy Roberts</h1>
            <div className="editButton">Edit</div>
            <div className="item">
              <div className="itemIng">
                <img src="/images/Cindy.jpg" alt="" className="profileImg" />
              </div>
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">cindy@example.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 123 456 7890</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">54 Jam Ave, Myrtle Beach, SC</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Login Stats (Past 5 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Latest Invoices</h1>
          <Table />

        </div>
      </div>
    </div>
  )
}

export default Single