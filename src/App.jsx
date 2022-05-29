import Home from './pages/home/Home';
import UserList from './pages/userlist/UserList';
import Single from './pages/single/Single';
import AddUser from './pages/adduser/AddUser';
import AddInvoice from './pages/invoice/addInvoice';
import DisplayInvoice from './pages/invoice/DisplayInvoice';
import Login from './pages/login/Login';

import Table from './components/table/Table';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { userInputs, invoiceInputs } from './formInputs';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<UserList />} />
            <Route path='users'>
              <Route index element={<UserList />} />
              <Route path='profile' element={<Single />} />
              <Route path='add' element={<AddUser inputs={userInputs} title="Add New User" />} />
            </Route>
            <Route path='invoice'>
              <Route index element={<DisplayInvoice />} />
              <Route path='add' element={<AddInvoice inputs={invoiceInputs} title="Create a Invoice" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App