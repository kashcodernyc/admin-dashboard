import { useContext } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { Link } from 'react-router-dom'
import './widget.scss';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';


const Widget = ({ type }) => {
    const { data, comment, invoice } = useContext(UserContext)
    console.log('data' + data, 'comment' + comment);

    //temporary 
    let obj;
    const percentage = 20;
    switch (type) {
        case "Members":
            obj = {
                title: "Users Stats",
                link: <Link to="/users">view all users</Link>,
                stats: data.length,
                icon: (
                    <PeopleOutlineIcon className="icon" />
                )
            };
            break;
        case "Comments":
            obj = {
                title: "Comments",
                link: <Link to="/users">view all comments</Link>,
                stats: comment.length,
                icon: (
                    <ReceiptOutlinedIcon className="icon" />
                )
            };
            break;
        case "Invoices":
            obj = {
                title: "Invoices",
                link: <Link to="/invoice">view all invoices</Link>,
                icon: (
                    <LoginOutlinedIcon className="icon" />
                )
            };
            break;
        case "Emails":
            obj = {
                title: "Emails",
                link: "View All Emails",
                icon: (
                    <EmailOutlinedIcon className="icon" />
                )
            };
            break;
        default:
            break;
    }
    return (

        <div className="widget">
            <div className="left">
                <div className="title">{obj.title}</div>
                <div className="counter">{obj.stats}</div>
                <div className="link">{obj.link}</div>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <ArrowUpwardOutlinedIcon />
                    {percentage}%
                </div>
                {obj.icon}
            </div>
        </div>

    )
}

export default Widget