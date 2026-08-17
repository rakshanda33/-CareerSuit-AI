import JobMatch from "../pages/JobMatch";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import BulletRewriter from "../pages/BulletRewriter";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
        path="/job-match"
        element={
          <ProtectedRoute>
            <JobMatch />
          </ProtectedRoute>
        }
      />
      <Route
      path="/bullet-rewriter"
      element={
        <ProtectedRoute>
         <BulletRewriter />
        </ProtectedRoute>
      }
    />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;