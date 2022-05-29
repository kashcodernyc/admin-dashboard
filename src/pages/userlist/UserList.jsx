import UserList from '../../components/UserList/UserList'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './userList.scss'
import { Link } from 'react-router-dom';

const List = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="top">
                    <h1 className="title">Current Users</h1>
                    <Link to="/users/add" style={{ textDecoration: 'none' }}>
                        <button className="adduser">Add User</button>
                    </Link>
                </div>
                <div className="bottom">
                    <UserList />
                </div>
            </div>
        </div>
    )
}

export default List