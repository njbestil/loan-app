import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Register from './pages/auth/Register';
import EmailVerified from './pages/auth/EmailVerified';
import NotFound from './pages/NotFound';

// Dashboard
import Home from './pages/dashboard/Home';
import About from './pages/dashboard/About';
import Services from './pages/dashboard/Services';
import Contact from './pages/dashboard/Contact';
import Users from './pages/dashboard/users/Users';
import UserProfile from './pages/dashboard/users/UserProfile';
import Models from './pages/dashboard/models/Models';
import ViewModel from './pages/dashboard/models/ViewModel';
import CreateCreditModel from './pages/dashboard/models/CreateCreditModel';
import CreateRiskModel from './pages/dashboard/models/CreateRiskModel';
import PreEvaluation from './pages/dashboard/creditscore/PreEvaluation';
import Evaluation from './pages/dashboard/creditscore/Evaluation';
import Application from './pages/dashboard/creditdata/Application';
import ApplicationReport from './pages/dashboard/creditdata/ApplicationReport';
import ApplicantDetails from './pages/dashboard/creditdata/ApplicantDetails';
import UserApplication from './pages/dashboard/creditdata/UserApplication';

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