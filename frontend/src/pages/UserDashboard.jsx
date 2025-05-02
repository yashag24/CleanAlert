// UserDashboard.jsx
import { motion } from 'framer-motion';
import Header from '../components/userDashboard/Header';
import MainCard from '../components/userDashboard/MainCard';
import Sidebar from '../components/userDashboard/Sidebar';
import Footer from '../components/userDashboard/Footer';

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6">
        <Header />
        <MainCard />
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;