import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
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

const root = ReactDOM.createRoot( document.getElementById( 'root' ) );
root.render(
  <Router>
    <React.StrictMode>
      <SalaryRequestController />
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
      </Routes>
    </React.StrictMode>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
