import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Features from "./components/Features";
import Working from "./components/Working";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

import AdminHome from "./components/dashboard/AdminHome";

// Dashboard Components
import DashboardLayout from "./components/dashboard/DashboardLayout";
import AgentHome from "./components/dashboard/AgentHome";
import UserHome from "./components/dashboard/UserHome";
import RawQueries from "./components/dashboard/RawQueries";
import AgentPerformance from "./components/dashboard/AgentPerformance";
import TrackProperties from "./components/dashboard/TrackProperties";
import TransactionsRecord from "./components/dashboard/TransactionsRecord";
import MyProperties from "./components/dashboard/MyProperties";
import Notifications from "./components/dashboard/Notifications";
import Profile from "./components/dashboard/Profile";
import Settings from "./components/dashboard/Settings";
import AgentListings from "./components/dashboard/AgentListings";
import Holdings from "./components/dashboard/Holdings";
import About from "./components/dashboard/About";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page Layout (Nested Routes) */}
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Home onStart={() => {}} />} />
          <Route path="/home/features" element={<Features />} />
          <Route path="/home/how-it-works" element={<Working />} />
          <Route path="/home/about" element={<AboutUs />} />
        </Route>

        {/* External Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRole="ADMIN" />}>
          <Route path="/admin" element={<DashboardLayout role="ADMIN" />}>
            <Route index element={<Navigate to="/admin/home" replace />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="track" element={<TrackProperties />} />
            <Route path="queries" element={<RawQueries />} />
            <Route path="agents" element={<AgentPerformance />} />
            <Route path="transactions" element={<TransactionsRecord />} />
            <Route
              path="notifications"
              element={<Notifications role="ADMIN" />}
            />
            <Route path="profile" element={<Profile role="ADMIN" />} />
            <Route path="about" element={<About />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Agent Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRole="AGENT" />}>
          <Route path="/agent" element={<DashboardLayout role="AGENT" />}>
            <Route index element={<Navigate to="/agent/home" replace />} />
            <Route path="home" element={<AgentHome />} />
            <Route path="listings" element={<AgentListings />} />
            <Route path="holdings" element={<Holdings />} />
            <Route
              path="notifications"
              element={<Notifications role="AGENT" />}
            />
            <Route path="profile" element={<Profile role="AGENT" />} />
            <Route path="about" element={<About />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* User Dashboard Routes */}
        <Route element={<ProtectedRoute allowedRole="USER" />}>
          <Route path="/user" element={<DashboardLayout role="USER" />}>
            <Route index element={<Navigate to="/user/home" replace />} />
            <Route path="home" element={<UserHome />} />
            <Route path="properties" element={<MyProperties />} />
            <Route
              path="notifications"
              element={<Notifications role="USER" />}
            />
            <Route path="profile" element={<Profile role="USER" />} />
            <Route path="about" element={<About />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
