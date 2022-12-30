import { async } from "@firebase/util";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import SalaryRequest from "../components/SalaryRequest";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/ViewSalaryAdjustment.css";

const ViewSalaryAdjustment = () =>
{

    const position = sessionStorage.getItem( "department" );
    const [ requests, setRequests ] = useState( [] );
    const salaryRequestRef = collection( db, "SalaryChangeRequest" );


    useEffect( () =>
    {
        const fetchRequest = async () =>
        {
            const data = await getDocs( salaryRequestRef );
            setRequests( data.docs.map( ( e ) => ( { ...e.data(), id: e.id } ) ) );
        };
        fetchRequest();

        // fetch employee
    }, [] );

    return (
        <div>
            <Headers />
            <Taskbar position={ position } />
            <div id="inner-page">
                <div id="title-container-vsa">
                    <h1 id="title-vsa" className="text-4xl font-mono font-bold">
                        Salary Adjustment Request
                    </h1>
                </div>
                <div id="requests-container-vsa" >
                    <div id="unconfirmed-vsa">
                        {
                            requests.map( ( data ) =>
                            {
                                return <SalaryRequest data={data}/>
                            } )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSalaryAdjustment;