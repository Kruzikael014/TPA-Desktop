import Headers from "../components/Header";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import "./styles/HomeView.css";
import Taskbar from "../components/Taskbar";
import "./styles/Page.css";

function HomeView ()
{

    const [ position, setPosition ] = useState( "" );

    const activeUser = sessionStorage.getItem( "active-user" );
    const positionQ = query( collection( db, "Employee" ), where( "authid", "==", activeUser ) );

    onSnapshot( positionQ, ( snapshot ) =>
    {
        let resultSet = [];

        snapshot.docs.forEach( ( doc ) =>
        {
            resultSet.push( { ...doc.data(), id: doc.id } );
        } );
        setPosition( resultSet[ 0 ].department );
        // console.log(resultSet)
        savePassword();
    } );

    const savePassword = () => {
        
    }

    sessionStorage.setItem( "department", position );

    if(sessionStorage.getItem("department") === "admin") {
        sessionStorage.setItem( "isAdmin", true );
    } else {
        sessionStorage.setItem( "isAdmin", false );
    }

    return (
        <div>
            <Headers />
            <Taskbar position={ position } />
            <div id="inner-page">
                <div id="title-container">
                    <h1 id="title">
                        Work Announcement
                    </h1>
                </div>
            </div>
        </div>
    );

}

export default HomeView;