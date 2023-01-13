import { addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/IssueWarningLetter.css";


const IssueWarningLetter = () =>
{

    const employeeRef = collection( db, "Employee" );

    const [ employees, setEmployees ] = useState( [] );
    const [ currentUser, setCurrentUser ] = useState( {});

    const fetchEmployee = async () =>
    {
        const documents = await getDocs( employeeRef );
        setEmployees( documents.docs.map( ( doc ) => ( { ...doc.data(), id: doc.id } ) ) );
    };

    const fetchCurrentUser = () =>
    {
        const ref = collection( db, "Employee" );
        const eQuery = query( ref, where( "id", "==", sessionStorage.getItem( "active-user" ) ) );
        onSnapshot( eQuery, ( snapshot ) =>
        {
            setCurrentUser( snapshot.docs.map( ( doc ) => ( { ...doc.data(), id: doc.id } ) ) );
        } );
    };

    useState( () =>
    {
        fetchEmployee();
        fetchCurrentUser();
    }, [] );

    const [ employee, setEmployee ] = useState( "" );
    const [ violation, setViolation ] = useState( "" );
    const [ reason, setReason ] = useState( "" );

    const uploadData = async () => {
        const data = {
            employeeid: employee,
            issuedby: currentUser[0].id,
            violationtype: violation,
            finalized: "No",
            issuedreason: reason,
            issueddate: new Date(Date.now()),
            status: {
                manager: "Waiting...",
                approvedat: null
            }
        };
        const ref = collection(db, "WarningLetter")
        await addDoc(ref, data)
        window.location.reload()
    }

    const validateForm = () =>
    {
        if ( employee.length === 0 || employee === "" )
        {
            alert( "Choose 1 employee" );
        } else if ( violation.length === 0 || violation === "" )
        {
            alert( "Must choose violation" );
        } else if ( reason.length === 0 || reason === "" )
        {
            alert( "Must fill the reason" );
        } else
        {
            uploadData()
        }
    };


    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title-iwl" className="text-2xl font-mono font-bold">
                    Issue Warning Letter for Employee
                </div>
                <form>
                    <div class="hori-div-iswl">
                        <label htmlFor="employ-iwl">Employee</label>
                        <select id="employ-iwl" onChange={ ( e ) => { setEmployee( e.target.value ); } }>
                            <option value={ "" }></option>
                            { employees.map( employee => { return <option value={ employee.id }> { employee.name } - { employee.department } - { employee.id } </option>; } ) }
                        </select>
                    </div>
                    <div class="hori-div-iswl">
                        <label htmlFor="viola-type-iwl">Violation</label>
                        <select id="viola-type-iwl" onChange={ ( e ) => { setViolation( e.target.value ); } }>
                            <option value={ "" }></option>
                            <option value={ "Asleep during worktime" }>Asleep during worktime</option>
                            <option value={ "Playing games" }>Playing games</option>
                            <option value={ "Eating during worktime" }>Eating during worktime</option>
                            <option value={ "Faking information" }>Faking information</option>
                            <option value={ "Leaving job" }>Leaving job</option>
                            <option value={ "5 times late" }>5 times late</option>
                        </select>
                    </div>
                    <div id="verti-div-iswl" >
                        <label htmlFor="reason-iwl">Reason [detail] </label>
                        <textarea id="reason-iwl" onChange={ ( e ) => { setReason( e.target.value ); } } />
                    </div>
                    <button id="iwl-submit-btn" className="text-2xl font-bold font-mono" onClick={ ( e ) => { e.preventDefault(); validateForm(); } }>Submit</button>
                </form>
            </div>
        </div>
    );

};

export default IssueWarningLetter;