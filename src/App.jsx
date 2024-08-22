import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import CreateBooks from './pages/CreateBooks'
import DeleteBooks from './pages/DeleteBooks'
import EditBooks from './pages/EditBooks'
import Home from './pages/Home'
import ShowBooks from './pages/ShowBooks'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import UsersTable from './pages/UserManagement'
import Transaction from './pages/Transaction'
import UserInfo from './pages/UserInfo'
import UserHistory from './pages/UserHistory'
import ForgetPassword from './pages/ForgetPassword'


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} /> {/* Default route */}
      <Route path="/home/:userRole/:page" element={<Home/>} />
      <Route path='/login' element={<SignInPage/>}/>
      <Route path='/register' element={<SignUpPage/>}/>
      <Route path='/userMangement' element={<UsersTable/>}/>
      <Route path="/user/details/:userId" element={<UserInfo />} />
      <Route path="/user/history/:userId" element={<UserHistory />} />

      <Route path="/user/forgetpassword" element={<ForgetPassword />} />

      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/details/:id" element={<ShowBooks />} />
      <Route path="/books/edit/:id" element={<EditBooks />} />
      <Route path="/books/delete/:id" element={<DeleteBooks />} />
      <Route path="/borrow_transaction/:isbn" element={<Transaction />} />
    </Routes>
  )
}

// DmM@tKh@uKhoVl1

export default App
