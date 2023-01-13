import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import "./styles/Page.css";
import "./styles/AddEmployee.css";
import "./styles/LoginView.css";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import { auth, db } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { Auth, createUserWithEmailAndPassword, SignInMethod, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AddEmployee = () =>
{

    let history = useNavigate();

    const position = sessionStorage.getItem( "department" );

    const [ name, setName ] = useState( "" );
    const [ salary, setSalary ] = useState( 0 );
    const [ gender, setGender ] = useState( "" );
    const [ dob, setDOB ] = useState( 0 );
    const [ department, setDepartment ] = useState( "" );
    const [ address, setAddress ] = useState( "" );
    const [ email, setEmail ] = useState( " " );
    const [ password, setPassword ] = useState( " " );

    let valid = false;

    const validate = () =>
    {
        let errText = document.getElementById( "err-messages" );
        if ( name.length <= 0 ) // error
        {
        }
        else if ( salary < 1 )
        {
        }
        else if ( gender != "male" && gender != "female" )
        {
        }
        else if ( dob == 0 )
        {
        }
        else if ( department.length == 0 )
        {
        }
        else if ( address.length == 0 )
        {
        }
        else
        {
            valid = true;
        }

        if ( valid )
        {
            createAccount();
        } else
        {
        }

    };

    const employeeRef = collection( db, "Employee" );

    const createAccount = async () =>
    {

        await createUserWithEmailAndPassword( auth, email, password ).then( ( e ) =>
        {
            const idx = e.user.uid;
            const obj = {
                address: address,
                department: department,
                dob: new Date( dob ),
                gender: gender,
                authid: idx,
                email: email,
                password: password,
                name: name,
                salary: Number( salary ),
            };
            // console.log(obj)
            addDoc( employeeRef,
                obj );
            setTimeout( () =>
            {
                window.location.reload();
            }, 500 );
        } );
    };

    const registerEmployee = () =>
    {
        validate();
    };

    useEffect( () =>
    {
        var tempEmail = name.split( " " );
        var resultEmail = tempEmail[ 0 ];

        for ( var i = 0; i < tempEmail.length; i++ )
        {
            if ( i == 0 ) continue;
            resultEmail += tempEmail[ i ];
        }

        resultEmail += "@sitm.com";

        setEmail( resultEmail );
        setPassword( "123456" );

    } );

    return (
        <div>
            <Headers />
            <Taskbar position={ position } />
            <div id="inner-page">
                <div>
                    <h1 id="title" className="font-mono font-bold text-6xl">
                        Add employee
                    </h1>
                </div>
                <div id="employee-form">
                    <div id="name-salary-form" className="font-mono font-semibold text-3xl">
                        <div id="name-form" >
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" onChange={ ( e ) => { setName( e.target.value ); } } />
                        </div>
                        <div id="salary-form">
                            <label htmlFor="salary" >Salary</label>
                            <input type="number" id="salary" class="num" onChange={ ( e ) => { setSalary( e.target.value ); } } />
                        </div>
                    </div>
                    <div id="gender-form" className="font-mono font-semibold text-3xl">
                        <div>
                            <label>Gender</label>
                        </div>
                        <div id="gender-select">
                            <label className="font-mono font-semibold text-1xl" class="gen" >Male</label>
                            <input type="radio" name="rad_button" id="male" class="radios" value="male" onChange={ ( e ) => { setGender( e.target.value ); } } />
                            <label className="font-mono font-semibold text-1xl" class="gen" value="male">Female</label>
                            <input type="radio" name="rad_button" id="female" class="radios" value="female" onChange={ ( e ) => { setGender( e.target.value ); } } />
                        </div>
                    </div>
                    <div id="date-form" className="font-mono font-semibold text-3xl">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="date" id="dob" onChange={ ( e ) => { setDOB( e.target.valueAsNumber ); } } />
                    </div>
                    <div id="department-form" className="font-mono font-semibold text-3xl">
                        <label htmlFor="missed">Department</label>
                        <select id="missed" class="selection" onChange={ e => { setDepartment( e.target.value ); } }>
                            <option value="-">-</option>
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
                    </div>
                    <div id="address-form" className="font-mono font-semibold text-3xl">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" onChange={ ( e ) => { setAddress( e.target.value ); } } />
                    </div>
                    <button type="submit" id="login-button-adEmp" onClick={ ( e ) =>
                    {
                        registerEmployee();
                    } } className="font-sans text-1xl font-bold font-mono" > Add employee</button>
                </div>
            </div>
        </div>
    );

};

export default AddEmployee;