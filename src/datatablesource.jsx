
export const userColumns = [
    {
        field: "user", headerName: "Username", width: 200, renderCell: (params) => {
            return (
                <div className="cellWithImg">
                    <img className="cellImg" src={params.row.img ? params.row.img : process.env.PUBLIC_URL + '/images/default.jpg'} alt="avatar" />
                    {params.row.username}
                </div>
            )
        }
    },
    { field: "fullname", headerName: "Full Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 150 },

]


export const ticketColumns = [
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "timeStamp", headerName: "Date", width: 250 },
]

