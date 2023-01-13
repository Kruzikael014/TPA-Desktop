import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import "./styles/AccessMenu.css";


const AccessMenu = () =>
{

    const [department, setDepartment] = useState("")
    let history = useNavigate()


    const goLogin = () => {
        if(department === "") {
            alert("must choose")
        } else {
            sessionStorage.setItem("department", department)
            window.location.reload()
        }
    }

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title" className="text-5xl font-bold font-mono">
                    Manage Menu
                </div>
                <label htmlFor="missed-acm">Department</label>
                <select id="missed-acm" class="selection" onChange={ e => { setDepartment( e.target.value ); } }>
                    <option value=""></option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="finance">Finance</option>
                    <option value="storage">Storage</option>
                    <option value="promo">Promotion and event department</option>
                    <option value="external">External department</option>
                    <option value="hrd">Human resource department</option>
                    <option value="cook">Kitchen Division</option>
                    <option value="waiter">Front-office cafe</option>
                    <option value="schedule">Schedule division</option>
                    <option value="operation">Operation division</option>
                    <option value="ticket">Front-office movie</option>
                </select>
                <button id="acm-butt" onClick={(e) => {
                    goLogin()
                }}>Login</button>
            </div>
        </div>
    );

};

export default AccessMenu;