import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import "../views/styles/Page.css";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import "./styles/ViewEmployee.css";
import male from "../components/male.png";
import female from "../components/female.png";

const ViewEmployee = () =>
{

    const id = sessionStorage.getItem( "active-user" );
    const position = sessionStorage.getItem( "department" );

    const [ employee, setEmployee ] = useState( [] );

    const connection = collection( db, "Employee" );

    useEffect( () =>
    {
        const getEmployee = async () =>
        {
            const data = await getDocs( connection );

            setEmployee( data.docs.map( ( data ) => ( { ...data.data(), id: data.id } ) ) );

        };
        getEmployee();
    }, [] );

    return (
        <div>
            <Headers />
            <Taskbar position={ position } />
            <div id='inner-page'>
                <h1 id="title" className="text-4xl font-mono font-bold">
                    Employee information
                </h1>
                <div id="employees">
                    {
                        employee.map( ( employeeData ) =>
                        {

                            return (
                                <div id="employee-card">
                                    <div id="id-img-compartment">
                                        <div>
                                            <img src={ ( employeeData.gender === "male" ) ? male : female } />
                                        </div>
                                        <div>
                                            <h1 className="text-1xl font-mono font-bold" >EID : { employeeData.id } </h1>
                                        </div>
                                    </div>
                                    <div id="text-data-compartment">
                                        <div id="name-depart-compartment" className="text-2xl font-mono font-bold">
                                            <h1 className="text-1xl font-mono font-bold" >{ employeeData.name } [{ employeeData.department }] </h1>
                                        </div>
                                        <div id="others-compartment">
                                            <div class="verti">
                                                <h1 className="text-1xl font-mono font-bold" >DOB : { new Date( employeeData.dob.seconds * 1000 ).toDateString().replace( " ", ", " ) }  </h1>
                                                <h1 className="text-1xl font-mono font-bold" >Address : { employeeData.address }  </h1>
                                            </div>
                                            <div class="verti">
                                                <h1 className="text-1xl font-mono font-bold" >Gender : { employeeData.gender }  </h1>
                                                <h1 className="text-1xl font-mono font-bold" >Salary : { employeeData.salary }  </h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        } )
                    }
                </div>
            </div>
        </div>
    );
};


export default ViewEmployee;