import { Routes, Route } from 'react-router-dom'

import Homepage from '../pages/Homepage'

import CarsList from '../pages/cars/CarsList'
import CustomersList from '../pages/customers/CustomersList'

import LoginPage from '../pages/LoginPage'
import UsersList from '../pages/users/UsersList'
import UsersForm from '../pages/users/UsersForm'

export default function AppRoutes() {
 return <Routes>
   <Route path="/" element={ <Homepage /> } />
   <Route path="/login" element={ <LoginPage /> } />


   <Route path="/cars" element={ <CarsList /> } />
   <Route path="/customers" element={ <CustomersList /> } />

   

  <Route path="/users" element={ <UsersList /> } />
  <Route path="/users/new" element={ <UsersForm /> } />
  <Route path="/users/:id" element={ <UsersForm /> } />




 </Routes>
}