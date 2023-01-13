import React from 'react';
import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
import LoginView from './views/LoginView';
import HomeView from './views/HomeView';
import ViewEmployee from './views/ViewEmployee';
import "../src/views/styles/MyTailwind.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AddEmployee from './views/AddEmployee';
import ViewFoodStock from './views/ViewFoodStock';
import ViewEquipmentReport from './views/ViewEquipmentReport';
import CreateBrokenReport from './views/CreateBrokenReport';
import ViewBrokenEquipmentReport from './views/ViewBrokenEquipmentReport';
import AdjustSalary from './views/AdjustSalary';
import ViewSalaryAdjustment from './views/ViewSalaryAdjustment';
import SalaryRequestController from './controller/SalaryRequestController';
import CreateMembershipView from './views/CreateMembershipView';
import ViewMembership from './views/ViewMembership';
import AddEquipment from './views/AddEquipment';
import AddClient from './views/AddClient';
import ViewClient from './views/ViewMovieP';
import ViewMovieP from './views/ViewMovieP';
import ViewAdvertiseP from './views/ViewAdvertiseP';
import ViewFoodSupplier from './views/ViewFoodSupplier';
import CreateLeaveRequest from './views/CreateLeaveRequest';
import ApproveLeaveRequest from './views/ApproveLeaveRequest';
import CreateFundRequest from './views/CreateFundRequest';
import ApproveFundRequest from './views/ApproveFundRequest';
import FundRequestController from './controller/FundRequestController';
import IssueWarningLetter from './views/IssueWarningLetter';
import ApproveWarningLetter from './views/ApproveWarningLetter';
import ResetPassword from './views/ResetPassword';
import AccessMenu from './views/AccessMenu';
import CreateMovie from './views/CreateMovie';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <Router>
    <React.StrictMode>
      <SalaryRequestController />
      <FundRequestController />
      <Routes>
        <Route exact path="/" element={ <LoginView /> }></Route>
        <Route exact path="/home" element={ <HomeView /> }></Route>
        <Route exact path="/view-employee" element={ <ViewEmployee /> }></Route>
        <Route exact path='/add-employee' element={ <AddEmployee /> }></Route>
        <Route exact path='/view-food-stock' element={ <ViewFoodStock /> }></Route>
        <Route exact path='/view-equipment' element={ <ViewEquipmentReport /> }></Route>
        <Route exact path='/create-equipment-report' element={ <CreateBrokenReport /> }></Route>
        <Route exact path='/view-broken-equipment-report' element={ <ViewBrokenEquipmentReport /> }></Route>
        <Route exact path='/adjust-salary' element={ <AdjustSalary /> }></Route>
        <Route exact path='/view-salary-adjustment' element={ <ViewSalaryAdjustment /> }></Route>
        <Route exact path='/create-membership' element={ <CreateMembershipView /> }></Route>
        <Route exact path='/view-membership' element={ <ViewMembership /> }></Route>
        <Route exact path='/add-equipment' element={ <AddEquipment /> }></Route>
        <Route exact path='/add-external-parties' element={ <AddClient /> }></Route>
        <Route exact path='/view-movie-producer' element={ <ViewMovieP /> }></Route>
        <Route exact path='/view-advertise-partner' element={ <ViewAdvertiseP /> }></Route>
        <Route exact path='/view-food-supplier' element={ <ViewFoodSupplier /> }></Route>
        <Route exact path='/create-leave-request' element={ <CreateLeaveRequest /> }></Route>
        <Route exact path='/approve-leave-request' element={ <ApproveLeaveRequest /> }></Route>
        <Route exact path='/create-fund-request' element={ <CreateFundRequest /> }></Route>
        <Route exact path='/fund-request-approval' element={ <ApproveFundRequest /> }></Route>
        <Route exact path='/issue-warning-letter' element={ <IssueWarningLetter /> }></Route>
        <Route exact path='/approve-warning-letter' element={ <ApproveWarningLetter /> }></Route>
        <Route exact path='/reset-password' element={ <ResetPassword /> }></Route>
        <Route exact path='/manage-menu' element={ <AccessMenu /> }></Route>
        <Route exact path='/create-movie-schedule' element={ <CreateMovie /> }></Route>
      </Routes>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
