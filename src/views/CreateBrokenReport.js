
import { addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/Page.css";
import "./styles/CreateBrokenReport.css";
import { async } from "@firebase/util";

const CreateBrokenReport = () =>
{

    const userID = sessionStorage.getItem( "active-user" );
    const userPosition = sessionStorage.getItem( "department" );

    const [ equipmentData, setEquipmentData ] = useState( [] );

    const equipmentRef = collection( db, "Equipment" );

    const process = async () =>
    {

        const eqReportRef = collection( db, "EquipmentReport" );

        await addDoc( eqReportRef, {
            employeeid: userID,
            reportdate: new Date( Date.now() ),
            equipmentid: inventory,
            reason: reason,
            requestedfund: fund,
        } );

        const updateReferredEquipment = async () =>
        {
            const tobeReplace = doc( db, "Equipment", inventory );
            const replacement = {
                status: "Waiting..."
                // nanti tinggal query yang waiting saat show broken eq report
            };
            await updateDoc( tobeReplace, replacement );
        };
        updateReferredEquipment();
        window.location.reload();
        // } );
    };

    useEffect( () =>
    {
        const fetchEquipment = () =>
        {

            // const data = await getDocs( equipmentRef );

            // setEquipmentData( data.docs.map( ( e ) => ( { ...e.data(), id: e.id } ) ) );


            const dataq = query( equipmentRef, where( "status", "==", "Good" ) );

            onSnapshot( dataq, ( snapshot ) =>
            {
                let wanted = [];
                snapshot.docs.forEach( ( doc ) =>
                {
                    wanted.push( { ...doc.data(), id: doc.id } );
                } );
                setEquipmentData(wanted)
            } );
        };
        fetchEquipment();
        setInventory( "-" );
        // others V
    }, [] );

    const [ inventory, setInventory ] = useState( "" );
    const [ fund, setFund ] = useState( 0 );
    const [ reason, setReason ] = useState( "" );

    const processData = () =>
    {

        if ( inventory == "-" )
        {
            console.log( "Gaboleh kosong woy harus pilih" );
        } else if ( fund <= 0 )
        {
            console.log( "Gaboleh 0 woy harus tinggi" );
        } else if ( reason.length === 0 )
        {
            console.log( "Ini gaboleh kosong reasonnya woy" );
        } else
        {
            process();
        }
    };

    return (
        <div>
            <Headers />
            <Taskbar position={ userPosition } />
            <div id="inner-page">
                <div id="title-container">
                    <h1 id="title" className="font-mono font-bold text-6xl">
                        Create Broken Equipment Report
                    </h1>
                </div>
                <div id="formulir">
                    {/* record reporter name automatically, and report date automatically */ }
                    {/* Ask for inventoryID, fund amount, Reason */ }
                    <div id="inventory-form" className="font-mono font-semibold text-3xl">
                        <label htmlFor="inventory">Inventory</label>
                        <select id="inventory" className="font-mono font-semibold text-2xl" onChange={ ( e ) =>
                        {
                            setInventory( e.target.value );
                        } }>
                            <option value="-">-</option>
                            {
                                equipmentData.map( ( e ) =>
                                {
                                    return <option value={ e.id }> { e.id } - { e.name } - { e.status }</option>;
                                } )
                            }
                        </select>
                    </div>
                    <div id="fund-amount-form" className="font-mono font-semibold text-3xl">
                        <label htmlFor="spinner"> Fund Amount </label>
                        <div id="number-input">
                            <h1 id="prefix"> Rp. </h1>
                            <input type="number" id="spinner" onChange={ ( e ) =>
                            {
                                setFund( Number( e.target.value ) );
                            } } />
                        </div>
                    </div>
                    <div id="reason-form" className="font-mono font-semibold text-3xl">
                        <label htmlFor="reason"> Report reason </label>
                        <textarea id="reason" className="font-mono font-semibold text-1xl" onChange={ ( e ) =>
                        {
                            setReason( e.target.value );
                        } } />
                    </div>
                    <button id="submit-button" className="font-sans text-2xl font-bold font-mono" onClick={ ( e ) =>
                    {
                        processData();
                    } }>Submit</button>
                </div>
            </div>
        </div>
    );

};

export default CreateBrokenReport;