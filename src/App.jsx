import './App.css'
import Login from './screens/Auth/Login';
// import SignUp from './components/auth/SignUp'
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './screens/Home/Home';
import Navbar from './components/auth/general/Navbar';
import Footer from './components/auth/general/Footer';
import SignUp from './screens/Auth/SignUp';
import GuestList from './screens/GuestList';
import CheckList from './screens/Checklist.jsx';
import VendorManager from './screens/VendorManager/index.jsx';
import WeddingVenue from './screens/VenuesVendors/WeddingVenue.jsx';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/guest-list" element={<GuestList />} />
          <Route path="/check-list" element={<CheckList />} />
          <Route path="/vendor-manager" element={<VendorManager />} />
          <Route path="/wedding-venue" element={<WeddingVenue />} />
          <Route path="/dashboard" element={<WeddingVenue />} />
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App


