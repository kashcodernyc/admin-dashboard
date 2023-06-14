import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import './widget.scss';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';


const Widget = ({ type }) => {
    const [ticketDataLength, setTicketDataLength] = useState(0)
    const [commentsLength, setCommentsLength] = useState(0)
    const [usersLength, setUsersLength] = useState(0)

    useEffect(() => {
        onSnapshot(collection(db, "invoices"), (snapshot) => {
            setTicketDataLength(snapshot.docs.length)
        })
    }, []);

    useEffect(() => {
        onSnapshot(collection(db, "comments"), (snapshot) => {
            setCommentsLength(snapshot.docs.length)
        })
    }, []);

    useEffect(() => {
        onSnapshot(collection(db, "users"), (snapshot) => {
            console.log(snapshot.docs.length)
            setUsersLength(snapshot.docs.length)
        })
    }, []);

    let obj;
    const percentage = 20;
    switch (type) {
        case "Members":
            obj = {
                title: "Users Stats",
                link: <a className="custom-link" href="/users">view all users</a>,
                stats: usersLength,
                icon: (
                    <PeopleOutlineIcon className="icon" />
                )
            };
            break;
        case "Comments":
            obj = {
                title: "Comments",
                link: <a className="custom-link" href="/users">view all comments</a>,
                stats: commentsLength,
                icon: (
                    <ReceiptOutlinedIcon className="icon" />
                )
            };
            break;
        case "Invoices":
            obj = {
                title: "Tickets",
                link: <a className="custom-link" href="/invoice">view all tickets</a>,
                stats: ticketDataLength,
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