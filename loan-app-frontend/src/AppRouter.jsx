import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './features/auth/pages/Login';
import ForgotPassword from './features/auth/pages/ForgotPassword';
import ResetPassword from './features/auth/pages/ResetPassword';
import Register from './features/auth/pages/Register';
import EmailVerified from './features/auth/pages/EmailVerified';
import NotFound from './pages/NotFound';

// Dashboard
import Home from './pages/dashboard/Home';
import About from './pages/dashboard/About';
import Services from './pages/dashboard/Services';
import Contact from './pages/dashboard/Contact';
import Users from './features/users/pages/Users';
import UserProfile from './features/users/pages/UserProfile';
import Models from './features/models/pages/Models';
import ViewModel from './features/models/pages/ViewModel';
import CreateCreditModel from './features/models/pages/CreateCreditModel';
import CreateRiskModel from './features/models/pages/CreateRiskModel';
import PreEvaluation from './features/scoring/pages/PreEvaluation';
import Evaluation from './features/scoring/pages/Evaluation';
import Application from './features/applications/pages/Application';
import ApplicationReport from './features/applications/pages/ApplicationReport';
import ApplicantDetails from './features/applications/pages/ApplicantDetails';
import UserApplication from './features/applications/pages/UserApplication';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email/verified" element={<EmailVerified />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/users" element={<Users />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/models" element={<Models />} />
      <Route path="/models/view" element={<ViewModel />} />
      <Route path="/models/credit/create" element={<CreateCreditModel />} />
      <Route path="/models/risk/create" element={<CreateRiskModel />} />
      <Route path="/creditscore/preevaluation" element={<PreEvaluation />} />
      <Route path="/creditscore/evaluation" element={<Evaluation />} />
      <Route path="/creditscoredata/application" element={<Application />} />
      <Route path="/creditscoredata/application/details" element={<ApplicantDetails />} />
      <Route path="/creditscoredata/application/report" element={<ApplicationReport />} />
      <Route path="/creditscoredata/application/user" element={<UserApplication />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
