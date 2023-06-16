import { useContext } from 'react';
import './userList.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../datatablesource';
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from '../../Contexts/UserContext'



const useStyles = makeStyles({
    datatable: {
        height: '400px',
        backgroundColor: '#1D63FF',
        color: 'white',
        fontSize: '12px'
    },
    cellAction: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    }
});


const Datatable = () => {
    const { userData } = useContext(UserContext)
    const classes = useStyles();



    return (
        <>
            <div className={classes.datatable}>
                <DataGrid
                    className={classes.datatable}
                    rows={userData}
                    columns={userColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </>
    )
}

export default Datatable