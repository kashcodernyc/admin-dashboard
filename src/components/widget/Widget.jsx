import './widget.scss';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';


const Widget = ({type}) => {
  let data;

//temporary 
  const amount = 100;
  const percentage = 20;
  switch(type){
    case "Members":
        data={
            title: "Members",
            link: "View All Members",
            icon: (
                <PeopleOutlineIcon className="icon"/>
            )
        };
    break;
    case "Invoices":
        data={
            title: "Invoices",
            link: "View All Invoices",
            icon: (
                <ReceiptOutlinedIcon className="icon"/>
            )
        };
    break;
    case "Login":
        data={
            title: "Login Stats",
            link: "View All Logins",
            icon: (
                <LoginOutlinedIcon className="icon"/>
            )
        };
    break;
    case "Emails":
        data={
            title: "Emails",
            link: "View All Emails",
            icon: (
                <EmailOutlinedIcon className="icon"/>
            )
        };
    break;
    default:
        break;
  }
  return (

    <div className="widget">
        <div className="left">
             <div className="title">{data.title}</div>
             <div className="counter">{amount}</div>
             <div className="link">{data.link}</div>
        </div>
        <div className="right">
            <div className="percentage positive">
            <ArrowUpwardOutlinedIcon/>
            {percentage}%
            </div>
            {data.icon} 
        </div>
    </div>
    
  )
}

export default Widget