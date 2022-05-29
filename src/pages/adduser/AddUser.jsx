import { useState } from 'react';
import './adduser.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("")
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 className="title">{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "/images/default.jpg"} alt="" />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">Upload Image</label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <button>SEND</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New