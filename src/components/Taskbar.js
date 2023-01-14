import { BrowserRouter as Router, Link, Navigate, useNavigate } from "react-router-dom";
import "../views/styles/HomeView.css";
import ViewEmployee from "../views/ViewEmployee";

const Taskbar = ( position ) =>
{
    let history = useNavigate();

    switch ( position.position )
    {
        case "admin":
            return (
                <div id="task-bar" >
                    <div id="task-card" onClick={(e) => { history("/manage-menu") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Manage departments or employees access menu
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/reset-password") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Reset employees password
                        </h1>
                    </div>
                </div>
            );
        case "finance":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit resignation letter
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/fund-request-approval") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Accept or reject issued fund requests
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Add purchases reports based on fund requests details
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Calculate taxes
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View department's fund requests
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View department's fund requests details
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View expense reports
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View membership reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/view-revenue") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            View revenue reports
                        </h1>
                    </div>
                </div>
            );
        case "manager":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/fund-request-approval") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Accept or reject issued fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/approve-warning-letter") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Accept or reject issued warning letters
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Accept or reject resignation letter submitted by employees
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Show data visualization based on a specific time period
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {
                        history("/view-salary-adjustment")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            View employees' salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View movie schedule reports
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View expense reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/view-revenue") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            View revenue reports
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View purchase reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {
                        history("/view-membership")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            View memberships data
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Filter data based on important attributes
                        </h1>
                    </div>
                </div>
            );
        case "storage":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {
                        history("/add-equipment")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Add new facilities and equipments
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history("/view-broken-equipment-report")
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            View Fix or broken damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/view-equipment" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            View facilities and equipment
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/view-food-stock" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            View food and beverage data
                        </h1>
                    </div>
                </div>
            );
        case "promo":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/add-promo") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Add promos or events data
                        </h1>
                    </div>
                    {/* <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Create promos or events label
                        </h1>
                    </div> */}
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View promos or events data
                        </h1>
                    </div>
                </div>
            );
        case "external":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {
                        history("/add-external-parties")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Add external parties with its details
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Add summarized or recorded information with external parties
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-movie-schedule") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create movie schedules based on contract
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Generate advertising partners reports
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Generate movie producers reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {
                        history("/view-movie-producer")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            View Movie Producer data 
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {
                        history("/view-advertise-partner")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            View Advertising Partner data 
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {
                        history("/view-food-supplier")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            View Food or Beverage Supplier data 
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {
                        history("/view-food-stock")
                    }}> 
                        <h1 className="font-mono font-semibold text-1xl">
                            View food and beverage data
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View promos or events data
                        </h1>
                    </div>
                </div>
            );
        case "waiter":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Add to kitchen queue
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Scan membership card and apply point systems
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View foods and beverages available
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Choose payment methods
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            view kitchen queue
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Generate receipts based on inputted information
                        </h1>
                    </div>
                </div>
            );
        case "cook":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View kitchen queue
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Update kitchen queue state
                        </h1>
                    </div>
                </div>
            );
        case "hrd":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => history("/approve-leave-request")}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Accept or reject issued personal leave requests
                        </h1>
                    </div>  

                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Accept or reject issued termination letters
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {
                        history("/view-salary-adjustment")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            View employees' salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View issued warning letters
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/add-employee" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Add accepted employees' personal information
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Change employees' working time
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Issue a termination letter to employees
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/issue-warning-letter") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Issue a warning letter to employees
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View employee reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/view-employee" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            View employees' personal information
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View employees' working time using data visualization
                        </h1>
                    </div>
                </div>
            );
        case "operation":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Manage cinema studios
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View advertising partners data
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View promos or events data
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View running movie schedules
                        </h1>
                    </div>
                </div>
            );
        case "schedule":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View movie schedule reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {  history("/view-movie-schedule") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            View movie schedules with filters
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/update-movie-schedule") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Update movie schedule
                        </h1>
                    </div>
                </div>
            );
        case "ticket":
            return (
                <div id="task-bar">
                    <div id="task-card" onClick={(e) => {
                        history("/adjust-salary")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create a salary adjustment requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={ ( e ) =>
                    {
                        history( "/create-equipment-report" );
                    } }>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit damaged facilities and equipments reports
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-fund-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit fund requests
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => { history("/create-leave-request") }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Submit personal leave requests
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Choose payment methods
                        </h1>
                    </div>
                    <div id="task-card" onClick={(e) => {
                        history("/create-membership")
                    }}>
                        <h1 className="font-mono font-semibold text-1xl">
                            Create membership card with label
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Generate receipts and movie tickets based on inputted information
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Scan membership card and apply point systems
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            Scan voucher and apply automatically
                        </h1>
                    </div>
                    <div id="task-card">
                        <h1 className="font-mono font-semibold text-1xl">
                            View cinema studios along with the movies
                        </h1>
                    </div>
                </div>
            );
    }
};

export default Taskbar;