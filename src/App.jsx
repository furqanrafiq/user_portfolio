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
import { useDispatch } from 'react-redux';
import { storeUserReducer } from './screens/Auth/redux/authSlice.js';

function App() {

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }
  };

  const user = localStorage.getItem('easyShadiUser')
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      api.get("/user/user-details")
        .then((res) => {
          dispatch(storeUserReducer(res.data.user));
        })
        .catch(() => {
          dispatch(storeUserReducer(null));
        })
    }
  }, [user, dispatch]);

  const AnimatedRoutes = () => {
    const location = useLocation();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname} // Ensures animation on route change
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Render both route sets */}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <Router>
        <Navbar />
        {/* <AnimatedRoutes /> */}
        <PublicRoutes />
        <ProtectedRoutes />
        <Footer />
      </Router>
    </>
  )
}

export default App


