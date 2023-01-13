import { async } from "@firebase/util";
import { collection, updateDoc, doc, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/ApproveLeaveRequest.css";

const ApproveLeaveRequest = () =>
{

    const [ data, setData ] = useState( [] );

    useEffect( () =>
    {
        const fetchRequest = async () =>
        {
            const leaveReqRef = collection( db, "LeaveRequest" );
            const temp = await getDocs( leaveReqRef );
            setData( temp.docs.map( doc => ( { ...doc.data(), id: doc.id } ) ) );
        };
        fetchRequest();
    }, [] );


    const columns = [
        {
            name: "RequestID",
            selector: ( row ) => row.id
        },
        {
            name: "EmployeeID",
            selector: ( row ) => row.employeeid
        },
        {
            name: "Type",
            selector: ( row ) => row.requesttype
        },
        {
            name: "Reason",
            selector: ( row ) => row.requestreason
        },
        {
            name: "Leaving Date",
            selector: ( row ) => new Date( row.requestdate.seconds * 1000 ).toDateString()
        },
        {
            name: "Status",
            selector: ( row ) => row.requeststatus.hrd,
            sortable: true
        },
        {
            name: "Action",
            selector: ( row ) => ( row.requeststatus.hrd == "Waiting..." ) ? 
                    <div class="action-butt-alr">
                        <button class="alr-grn-btn" onClick={ ( e ) => { approve( row.id ); } }>✓</button>
                        <button class="alr-red-btn" onClick={(e) => { reject( row.id ) }}>✗</button>
                    </div> 
                    : 
                    <div></div>
        }
    ];

    const approve = async ( id ) =>
    {
        const docRef = doc( db, "LeaveRequest", id );
        const data = {
            requeststatus: {
                hrd: "Accepted"
            },
            finalized: "Yes"
        };
        await updateDoc(docRef, data)
        window.location.reload()
    };

    const reject = async ( id ) =>
    {
        const docRef = doc( db, "LeaveRequest", id );
        const data = {
            requeststatus: {
                hrd: "Rejected"
            },
            finalized: "Yes"
        };
        await updateDoc(docRef, data)
        window.location.reload()
    };

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title-alr" className="font-bold font-mono text-4xl">
                    Proposed Leave Requests
                </div>
                <div id="lreq-container">
                    <DataTable
                        columns={ columns }
                        data={ data }
                    />
                </div>
            </div>
        </div>
    );

};

export default ApproveLeaveRequest;