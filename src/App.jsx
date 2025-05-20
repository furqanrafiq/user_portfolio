import './App.css'
import "./index.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Navbar from './components/auth/general/Navbar.jsx';
import Footer from './components/auth/general/Footer.jsx';
import PublicRoutes from './routes/PublicRoutes.jsx';
import ProtectedRoutes from './routes/ProtectedRoutes.jsx';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from 'react';
import api from '../axiosInterceptor.js';
import { useDispatch, useSelector } from 'react-redux';
import { storeUserReducer } from './screens/Auth/redux/authSlice.js';
import AuthChecker from './AuthChecker.jsx';

function App() {
  const user = useSelector((state) => state?.user?.user)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (user) {
  //     api.get("/user-details")
  //       .then((res) => {
  //         dispatch(storeUserReducer(res.data.user));
  //       })
  //       .catch(() => {
  //         dispatch(storeUserReducer(null));
  //       })
  //   }
  // }, [user, dispatch]);

  return (
    <>
      <Router>
        <Navbar />
        <AuthChecker>
          <PublicRoutes />
          {
            user?._id &&
            <ProtectedRoutes />
          }
        </AuthChecker>
        <Footer />
      </Router>
    </>
  )
}

export default App


