import { useState, useContext } from 'react';
import './userList.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../datatablesource';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { makeStyles } from "@material-ui/core/styles";
import EditUser from '../edituser/EditUser';
import { UserContext } from '../../Contexts/UserContext'



const useStyles = makeStyles({
    datatable: {
        height: '400px',
        padding: '20px',
        backgroundColor: '#00143e',
        color: 'white',
    },
    cellAction: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    editButton: {
        padding: '2px 5px',
        color: 'darkblue',
        cursor: 'pointer',
        marginRight: '10px',
    },
    deleteButton: {
        padding: '2px 5px',
        color: 'crimson',
        cursor: 'pointer',
    },
});


const Datatable = () => {
    const { userData, setUserData } = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState("");
    const classes = useStyles();


    const deleteData = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setUserData(userData.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err)
        }
    }

    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 200, renderCell: (params) => {
                return (
                    <div className={classes.cellAction}>
                        <EditOutlinedIcon className="editButton" onClick={() => {
                            setCurrentId(params.row.id); setIsEditing(true);
                        }} />
                        <ClearOutlinedIcon className="deleteButton" onClick={() => deleteData(params.row.id)} />
                    </div>
                )
            }
        }
    ]
    return (
        <>
            {!isEditing ?
                <div className={classes.datatable}>
                    <DataGrid
                        className={classes.datatable}
                        rows={userData}
                        columns={userColumns.concat(actionColumn)}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
                : <EditUser currentId={currentId} setIsEditing={setIsEditing} />}
        </>
    )
}

export default Datatable