import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/ApproveFundRequest.css";

const ApproveFundRequest = () =>
{

    const [ data, setData ] = useState( [] );

    const columns = [
        {
            name: "RequestID",
            selector: ( row ) => row.id,
            width: "170px"
        },
        {
            name: "EmployeeID",
            selector: ( row ) => row.employeeid,
            width: "170px"
        },
        {
            name: "RequestedAmount",
            selector: ( row ) => row.requestamount,
            width: "138px"
        },
        {
            name: "RequestReason",
            selector: ( row ) => row.requestreason,
            width: "450px"
        },
        {
            name: "RequestDate",
            selector: ( row ) => new Date( row.requestdate.seconds * 1000 ).toDateString(),
            width: "140px"
        },
        {
            name: "Finalized",
            selector: ( row ) => row.finalized,
            width: "90px"
        },
        {
            name: "Action",
            selector: ( row ) => ( row.finalized === "No" ) ?
                <div class="action-butt-afr">
                    <button class="afr-grn-btn" onClick={ ( e ) => { approve( row ); } }>✓</button>
                    <button class="afr-red-btn" onClick={ ( e ) => { reject( row ); } }>✗</button>
                </div>
                :
                <div></div>
        }
    ];

    const approve = async ( row ) =>
    {
        const docRef = doc( db, "FundRequest", row.id );
        if ( sessionStorage.getItem( "department" ) === "manager" )
        {
            const data = {
                requeststatus: {
                    manager: {
                        status: "Approved",
                        time: new Date( Date.now() )
                    },
                    finance: {
                        status: row.requeststatus.finance.status,
                        time: (row.requeststatus.finance.time == null) ? null : new Date( row.requeststatus.finance.time.seconds * 1000 )
                    }
                }
            };
            await updateDoc( docRef, data );
            window.location.reload();
        } else if ( sessionStorage.getItem( "department" ) === "finance" )
        {
            const data = {
                requeststatus: {
                    finance: {
                        status: "Approved",
                        time: new Date( Date.now() )
                    },
                    manager: {
                        status: row.requeststatus.manager.status,
                        time: (row.requeststatus.manager.time == null) ? null : new Date( row.requeststatus.manager.time.seconds * 1000 )
                    }
                }
            };
            await updateDoc( docRef, data );
            window.location.reload();
        }
    };

    const reject = async ( row ) =>
    {
        const docRef = doc( db, "FundRequest", row.id );
        if ( sessionStorage.getItem( "department" ) === "manager" )
        {
            const data = {
                requeststatus: {
                    manager: {
                        status: "Rejected",
                        time: new Date( Date.now() )
                    },
                    finance: {
                        status: row.requeststatus.finance.status,
                        time: (row.requeststatus.finance.time == null) ? null : new Date( row.requeststatus.finance.time.seconds * 1000 )
                    }
                }
            };
            await updateDoc( docRef, data );
            window.location.reload();
        } else if ( sessionStorage.getItem( "department" ) === "finance" )
        {
            const data = {
                requeststatus: {
                    finance: {
                        status: "Rejected",
                        time: new Date( Date.now() )
                    },
                    manager: {
                        status: row.requeststatus.manager.status,
                        time: (row.requeststatus.manager.time == null) ? null : new Date( row.requeststatus.manager.time.seconds * 1000 )
                    }
                }
            };
            await updateDoc( docRef, data );
            window.location.reload();
        }
    };

    const fetchData = async () =>
    {
        const fundReqRef = collection( db, "FundRequest" );
        const documents = await getDocs( fundReqRef );
        setData( documents.docs.map( ( doc ) => ( {
            ...doc.data(), id: doc.id
        } ) ) );
    };

    useEffect( () =>
    {
        fetchData();
    }, [] );

    const expandableComponent = ( { data } ) =>
    {
        return (
            <div class="expandablecomponent-afr">
                <div class="verti-div-afr">
                    <div>
                        Manager
                    </div>
                    <div class="hori-div-afr">
                        <div class="status-manager-afr">
                            { data.requeststatus.manager.status }
                        </div>
                        <div class="time-manager-afr">
                            { ( String( data.requeststatus.manager.status ).match( "Waiting..." ) ) ? "-" : new Date( data.requeststatus.manager.time.seconds * 1000 ).toDateString() }
                        </div>
                    </div>
                </div>
                <div class="verti-div-afr">
                    <div>
                        Finance
                    </div>
                    <div class="hori-div-afr">
                        <div class="status-manager-afr">
                            { data.requeststatus.finance.status }
                        </div>
                        <div class="time-manager-afr">
                            { ( String( data.requeststatus.finance.status ).match( "Waiting..." ) ) ? "-" : new Date( data.requeststatus.finance.time.seconds * 1000 ).toDateString() }
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title-afreq" className="text-5xl font-mono font-bold">
                    Proposed Fund Requests
                </div>
                <DataTable
                    data={ data }
                    columns={ columns }
                    expandableRows
                    expandableRowsComponent={ expandableComponent }
                />
            </div>
        </div>
    );

};

export default ApproveFundRequest;