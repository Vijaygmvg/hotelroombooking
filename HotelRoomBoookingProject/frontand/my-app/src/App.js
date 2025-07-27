
import './App.css';
import AddRoom from './Componenets/Room/AddRoom';
import ExistingRooms from './Componenets/Room/ExistingRooms';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './Componenets/Home.js/Home';
import EditRoom from './Componenets/Room/EditRoom';
import Navbar from './Componenets/LayOut/Navbar';
import RoomCard from './Componenets/Room/RoomCard';
import RoomListing from './Componenets/Room/RoomListing';
import Admin from './Componenets/Admin/Admin';
import OurServices from './Componenets/Common/Services';
import CheckOut from './Componenets/Bookings/CheckOut';
import BookingSuccess from './Componenets/Bookings/BookingSuccess';
import Bookings from "./Componenets/Bookings/Bookings"
import FindBooking from './Componenets/Bookings/FindBooking';
import Profile from './Componenets/Auth/Profile'

import Login from './Componenets/Auth/Login';
import Registration from './Componenets/Auth/Registration';
import AuthProvider from './Componenets/Auth/AuthProvider';
import Mybooking from './Componenets/Auth/Mybooking';
import OAuthLogin from './Componenets/Auth/OAuthLogin';
import SendResetPasswordLink from './Componenets/Password/SendResetPasswordLink';
import ResetPassword from './Componenets/Password/ResetPassword';
import ShowBooking from './Componenets/Bookings/ShowBooking';
import PaymentPage from './payment/PaymentPage';
import RegHistory from './Componenets/Admin/RegHistory';
function App() {
  return (
     <AuthProvider>

       <main>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="edit/room/:roomId" element={<EditRoom/>}/>
            <Route path="/existing-rooms" element={<ExistingRooms/>}/>
          <Route path="/add-room" element={<AddRoom/>}/>
          <Route path="/book-room/:roomId" element={<CheckOut/>}/>
          <Route path="/navbar"  element={<Navbar/>}/>
          <Route path="/card" element={<RoomCard/>}/>
          <Route path="/browse-all-rooms" element={<RoomListing/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/services" element={<OurServices/>}/>
          <Route path="/existing-bookings" element={<Bookings/>}/>
          <Route path="/booking-success" element={<BookingSuccess/>}/>
          <Route path="find-booking" element={<FindBooking/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/logout" element={<FindBooking/>}/>
          <Route path="/my-booking" element={<Mybooking/>}/>
          <Route path="/oauth2/redirect" element={<OAuthLogin/>}/>
          <Route path="/forget-password" element={<SendResetPasswordLink/>}/>
          <Route path="/reset-password-link" element={<ResetPassword/>}/>
          <Route path="/show-booking" element={<ShowBooking/>}/>
          <Route path="/payment" element={<PaymentPage/>}></Route>
          <Route path="/register-history" element={<RegHistory/>}/>
            </Routes>
          </Router>
       </main>



    
     </AuthProvider>
  );
}

export default App;
