import React from 'react'
import './addInvoice.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar';
import Table from '../../components/table/Table';

const Invoice = ({ inputs, title }) => {
    return (
        <div className="invoice">
            <Sidebar />
            <div className="invoiceContainer">
                <Navbar />
                <div className="top">
                    <h1 className="title">{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        left</div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">Upload Image or File</label>
                                <input type="file" id="file" style={{ border: 'none' }} />
                            </div>
                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} />
                                </div>
                            ))}
                            <div className="formInput">
                                <textarea placeholder="enter text here...">
                                </textarea>
                            </div>
                            <button>SEND</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoice