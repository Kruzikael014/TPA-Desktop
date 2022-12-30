import "../views/styles/LoginView.css";
import logo from "../components/icon.png";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { async } from "@firebase/util";
import { useEffect } from "react";

function Headers ()
{
    let history = useNavigate();
    const user = sessionStorage.getItem( "active-user" );

    const addLogout = () =>
    {
        if ( user !== null )
        {
            if ( user.length != 0 )
            {
                return (
                    < div id="logout-container" onClick={ ( e ) =>
                    {
                        signUserOut();
                    } } >
                        <h1 id="logout-button" className="font-mono font-bold text-3xl">
                            Logout
                        </h1>
                    </div >
                );
            }
        }
    };

    const signUserOut =  () =>
    {
        sessionStorage.clear();
        auth.signOut();
        history( "/" );
    };

    return (
        <div id="all">
            <div id="navbar">
                <div id="center-logo">
                    <img src={ logo } alt="err" onClick={ ( e ) =>
                    {
                        if(sessionStorage.getItem("department").length != 0) {
                            history( "/home" );
                        }
                    } } />
                </div>
            </div>
            {
                addLogout()
            }
        </div>
    );
}

export default Headers;