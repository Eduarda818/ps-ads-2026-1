import { Routes, Route } from 'react-router-dom'

import Homepage from '../pages/Homepage'

import CarsList from '../pages/cars/CarsList'
import CustomersList from '../pages/customers/CustomersList'

import LoginPage from '../pages/LoginPage'

export default function AppRoutes() {
 return <Routes>
   <Route path="/" element={ <Homepage /> } />
   <Route path="/login" element={ <LoginPage /> } />


   <Route path="/cars" element={ <CarsList /> } />
   <Route path="/customers" element={ <CustomersList /> } />

 </Routes>
}