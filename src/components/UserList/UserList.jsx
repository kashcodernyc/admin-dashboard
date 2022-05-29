import { useState } from 'react';
import './userList.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datatablesource';
import { Link } from 'react-router-dom';
const Datatable = () => {
    const [data, setData] = useState(userRows);

    const deleteData = (id) => {
        setData(data.filter(item => item.id !== id))
    }

    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 200, renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/profile" style={{ textDecoration: 'none' }}>
                            <button className="viewButton">View</button>
                        </Link>
                        <button className="deleteButton" onClick={() => deleteData(params.row.id)}>Delete</button>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="datatable">
            <DataGrid
                rows={userRows}
                columns={userColumns.concat(actionColumn)}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )
}

export default Datatable