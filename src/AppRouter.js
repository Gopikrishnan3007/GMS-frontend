import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import './index.css';
import Home from './components/Home/Home';
import LoginComponent from './components/Auth/LoginComponent';
import ProtectedRoute from './components/Prodect/ProtectedRoute';
import Error404 from './components/Error/Error404';
import UserDashboard from './components/User/UserDashboard';
import AddGrievance from './components/User/AddGrievance';
import DepartmentList from './components/User/DepartmentList';
import AdminDashboard from './components/Admin/AdminDashboard';
import DepartmentManagement from './components/Admin/DepartmentManagement';
import UpdateDepartment from './components/Admin/UpdateDepartment';
import AddDepartment from './components/Admin/AddDepartment';
import DepartmentHeadDashboard from './components/DepartmentHead/DepartmentHeadDashboard';
import AssignEmployee from './components/DepartmentHead/AssignEmployee';
import EmployeeList from './components/DepartmentHead/EmployeeList';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import GrievanceUpdate from './components/Employee/GrievanceUpdate';
import UserGrievances from './components/User/Confirmation';
import Confirmation from './components/User/Confirmation';
import LoginHome from './components/Home/LoginHome';
import Register from './components/User/Register';



function AppRouter() {
  return (
    <Router class="head">
      <Routes>
        <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<LoginHome />} />


        <Route path="/user/userdashboard" element={<UserDashboard />} />
        <Route path="/user/addgrievance/:departmentId" element={<AddGrievance />} />
        <Route path="/user/department" element={<DepartmentList />} />
        <Route path="/user/confirm/grievance" element={<Confirmation />} />

        <Route path="/admin/admindaShboard" element={<AdminDashboard />} />
        <Route path="/admin/departmentmanage" element={<DepartmentManagement />} />
        <Route path="/admin/department/update/:id" element={<UpdateDepartment />} />
        <Route path="/admin/department/add" element={<AddDepartment />} />

        <Route path="/head/headdashboard" element={<DepartmentHeadDashboard />} />
        <Route path="/dept/empasign" element={<AssignEmployee />} />
        <Route path="/assign-employee/:id" element={<EmployeeList />} />

        <Route path="/emp/empdashboard" element={<EmployeeDashboard />} />
        <Route path="/grievances/update/:grievanceId" element={<GrievanceUpdate />} />
          <Route path="*" element={<Error404 />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  )
}

export default AppRouter;