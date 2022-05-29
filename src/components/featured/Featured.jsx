import './featured.scss';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Login Stats</h1>
        <MoreVertOutlinedIcon fontSize = "small"/>
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value = {70} text = "70%" strokeWidth={5}/>
        </div>
        <p className="title">Total Logins Today</p>
        <p className="amount">120</p>
        <p className="desc">Total number of logins from all the user today</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
              <ArrowUpwardOutlinedIcon fontSize="small"/>
              <div className="resultAmount">400</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult negative">
              <ArrowDownwardOutlinedIcon fontSize="small"/>
              <div className="resultAmount">400</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult negative">
              <ArrowDownwardOutlinedIcon fontSize="small"/>
              <div className="resultAmount">400</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featured