import UserList from '../../components/UserList/UserList'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './userList.scss'

const List = () => {
    return (
        <div className="container">
            <Sidebar />
            <div className="invoiceContainer">
                <Navbar />
                <div className="tableContainer">
                    <div className="header">
                        <h1 className="title">Current Users</h1>
                    </div>
                    <UserList />
                </div>
            </div>
        </div>
    )
}

export default List