import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './displayInvoice.scss'
import Navbar from '../../components/navbar/Navbar'

const SingleInvoice = ({ tempData }) => {
    console.log(tempData)
    return (
        <div className="invoice">
            <Sidebar />
            <div className="container">
                <Navbar />
                <div className="invoiceContainer">
                    <div className="title">
                        <h1>{tempData.subject}</h1>
                    </div>
                    <p>Created by {tempData.fullname}</p>
                    <p>{tempData.textarea}</p>
                </div>

            </div>

        </div>
    )
}

export default SingleInvoice