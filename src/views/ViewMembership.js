import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/ViewMembership.css";
import { async } from "@firebase/util";
import QRCode from "react-qr-code";


const ViewMembership = () =>
{

    const [ members, setMembers ] = useState( [] );
    const memberReference = collection( db, "Member" );
    const [ qrs, setQrs ] = useState( [] );

    useEffect( () =>
    {
        // fetch member
        ( async function ()
        {
            const documents = await getDocs( memberReference );
            let temp = [];
            documents.docs.map( ( doc ) =>
            {
                temp.push( { ...doc.data(), id: doc.id } );
            } );
            setMembers( temp );
        } )();
    }, [] );

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title-container">
                    <h1 id="title" className="font-bold font-mono font-6xl">
                        Membership data
                    </h1>
                </div>
                <div id="vmem-container">
                    {
                        members.map( ( member, index ) =>
                        {
                            return (
                                <div id="vmem-card" className="font-bold font-mono">
                                    <h1 class="vmem-id">
                                        { member.id + " " + index }
                                    </h1>
                                    <QRCode value={ member.id } class="qr" />
                                    <h1 class="vm-typeof">{member.membershiptype}</h1>
                                    <div class="vm-hori-compartment">
                                        <div class="vm-verti-compartment1">
                                            <div>
                                                Name : { member.name }
                                            </div>
                                            <div>
                                                Email : { member.email }
                                            </div>
                                        </div>
                                        <div class="vm-verti-compartment1">
                                            <div>
                                                Gender : { member.gender }
                                            </div>
                                            <div>
                                                DOB : {  new Date(member.dob.seconds*1000).toDateString() }
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

export default ViewMembership;