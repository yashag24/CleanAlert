// UserDashboard.jsx
import { motion } from "framer-motion";
import Header from "../components/userDashboard/Header";
import MainCard from "../components/userDashboard/MainCard";
import Sidebar from "../components/userDashboard/Sidebar";
import Footer from "../components/userDashboard/Footer";
import { Routes ,Route} from "react-router-dom";
import UserMap from "../components/userDashboard/UserMap";
import UserSettings from "../components/userDashboard/UserSettings";
import UserReports from "../components/userDashboard/UserReports";
const UserDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6">
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<MainCard />}></Route>
              <Route path="/reports" element={<UserReports />} />
              <Route path="/map" element={<UserMap />} />
              <Route path="/settings" element={<UserSettings />} />
            
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;
