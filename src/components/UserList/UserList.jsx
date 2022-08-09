import { useState, useEffect, useContext } from 'react';
import './userList.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from '../../datatablesource';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { onAuthStateChanged } from "firebase/auth";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import EditUser from '../edituser/EditUser';
import { UserContext } from '../../Contexts/UserContext'




const Datatable = () => {
    const { data, setData } = useContext(UserContext)
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState("");



    // useEffect(() => { 
    //     const getUserData = async () => {
    //         onSnapshot(collection(db, "users"), (snapshot) => {
    //             let list = [];
    //             snapshot.docs.forEach((doc) => {
    //                 list.push({ id: doc.id, ...doc.data() });
    //                 setData(list);
    //             });

    //         }, (err) => {
    //             console.log(err);
    //         });

    //     }

    //     getUserData();


    // }, [])

    // // const user = auth.currentUser;
    // // if (user) {
    // //     const loggedUser = data.filter((item) => item.id === user.uid)
    // //     console.log(loggedUser);
    // // } else {
    // //     console.log("user is not logged in");
    // // }


    // useEffect(() => {

    //     const getUser = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             const uid = user.uid;
    //             console.log(uid);
    //             if (data) {
    //                 const signedUser = data.filter((item) => item.id === uid);
    //                 console.log(signedUser);
    //             } else {
    //                 console.log("no matching data")
    //             }
    //         } else {

    //         }
    //     });

    //     getUser();
    // }, [])





    const deleteData = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.log(err)
        }
    }

    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 200, renderCell: (params) => {
                return (
                    <div className="cellAction">
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
                <div className="datatable">
                    <DataGrid
                        rows={data}
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