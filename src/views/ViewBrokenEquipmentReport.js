import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/Page.css";
import "./styles/ViewBrokenEquipmentReport.css";
import RequestCard from "../components/RequestCard";
import { async } from "@firebase/util";
import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import { map } from "jquery";

function ViewBrokenEquipmentReport ()
{

    const userPosition = sessionStorage.getItem( "department" );
    const reqRef = collection( db, "EquipmentReport" );
    const eqRef = collection( db, "Equipment" );
    
    const [ waitingInventory, setWaitingInventory ] = useState( [] );
    const [ waitingReport, setWaitingReport ] = useState( [] );
    
    let reqEqData = [];

    const fetchEquipment = async () =>
    {
        return await new Promise( ( resolve, reject ) =>
        {
            // fetch code (equipment)
            let temp = [];
            const unConfirmedQ = query( eqRef, where( "status", "==", "Waiting..." ) );
            onSnapshot( unConfirmedQ, ( snapshot ) =>
            {
                snapshot.docs.forEach( ( doc ) =>
                {
                    temp.push( { ...doc.data(), id: doc.id } );
                } );
                if ( temp.length !== 0 )
                {
                    resolve( temp );
                    setWaitingInventory( temp );
                } else
                {
                    reject( "Failed while fetching inventory" );
                }
            } );
        } );
    };

    let init = 0;

    useEffect( () =>
    {
        fetchEquipment().then( ( a ) =>
        {
            // fetch code (report)
            const fetchUnconfirmedR = () =>
            {
                let temp = [];
                a.forEach( ( equipment ) =>
                {
                    const reportQ = query( reqRef, where( "equipmentid", "==", equipment.id ) );
                    onSnapshot( reportQ, ( snapshot ) =>
                    {
                        snapshot.docs.forEach( ( doc ) =>
                        {
                            temp.push( { ...doc.data(), id: doc.id } );
                        } );
                    } );
                } );
                setWaitingReport( temp );
            };
            fetchUnconfirmedR();
            // end of fetch code
        } ).catch( ( b ) =>
        {
            console.log( "cant due to : " + b );
        } );


        let idx = 0
        
        waitingInventory.forEach( e =>
        {
            let obj = {
                report: waitingReport[idx],
                inventory: e
            }
            reqEqData.push(obj)
            idx++;
        } );
    }, [] );

const [index, setIndex] = useState(0);

    return (

        <div>
            <Headers />
            <Taskbar position={ userPosition } />
            <div id='inner-page'>
                <h1 id="title" className="text-4xl font-mono font-bold">
                    Unconfirmed Request
                </h1>
                <div id="requests" >
                    {/* {
                        waitingInventory.map((eq) => {
                            const report = waitingReport.shift()
                            const ob = {
                                equipment: eq,
                                report: report,
                            }
                            return <RequestCard equRep={ob} />
                        })
                    } */}
                </div>
                <a onClick={(E) => {
                    waitingInventory.map((eq) => {
                        const report = waitingReport.shift()
                        const ob = {
                            equipment: eq,
                            report: report,
                        }
                        return <RequestCard equRep={ob} />
                    })
                }}>
                  debug  
                </a>
            </div>
        </div >
    );

}

export default ViewBrokenEquipmentReport;