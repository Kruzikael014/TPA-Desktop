import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/Page.css";
import EquipmentCard from "../components/EquipmentCard.js";
import "./styles/ViewEquipmentReport.css";

const BrokenEquipmentReport = () =>
{

    const userPosition = sessionStorage.getItem( "department" );

    const docRef = collection( db, "Equipment" );

    const [ equipments, setEquipment ] = useState( [] );

    useEffect( () =>
    {
        const getData = async () =>
        {
            const data = await getDocs( docRef );

            setEquipment( data.docs.map( ( data ) => ( { ...data.data(), id: data.id } ) ) );
        };
        getData();
    }, [] );

    return (
        <div>
            <Headers />
            <Taskbar position={ userPosition } />
            <div id="inner-page">
                <div id="title-container">
                    <h1 id="title" className="text-4xl font-mono font-bold">
                        Equipment Reports
                    </h1>
                </div>
                <div id="data-container">
                    {
                        equipments.map( ( equipment ) =>
                        {
                            return <EquipmentCard obj={equipment}/>
                        } )
                    }
                </div>
            </div>
        </div>
    );

};

export default BrokenEquipmentReport;