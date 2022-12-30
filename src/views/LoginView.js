import "./styles/LoginView.css";
import { auth } from "../firebase-config";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Headers from "../components/Header";

function LoginView ()
{

    let history = useNavigate();

    const [ username, setUsername ] = useState( "" );
    const [ password, setPassword ] = useState( "" );

    const [ user, setUser ] = useState( {} );

    const validateLogin = async () =>
    {
        try
        {
            const SignedIn = await signInWithEmailAndPassword( auth, username, password );

            sessionStorage.setItem( "active-user", auth.currentUser.uid );
            sessionStorage.setItem("active-password", password)

            if ( user )
            {
                history( "/home" );
            }
        } catch ( error )
        {
            let mess = document.getElementById( "err-message" );
            const showError = async () =>
            {
                mess.style.display = "block";
            };

            await showError();
        }
    };

    return (
        <div>
            <Headers />
            <p id="err-message">Login failed</p>
            <div id="login-form">
                <div id="form" className="input-container">
                    <p className="font-sans text-6xl font-semibold font-mono">
                        LOGIN
                    </p>
                    <div className="font-mono font-semibold text-2xl">
                        <h3>Username</h3>
                        <input type="text" placeholder="Username" onChange={ ( e ) =>
                        {
                            setUsername( e.target.value );
                        } } />
                    </div>
                    <div className="font-mono font-semibold text-2xl">
                        <h3>Password</h3>
                        <input type="password" placeholder="Pasword" onChange={ ( e ) =>
                        {
                            setPassword( e.target.value );
                        } } />
                    </div>
                    <div id="login-container">
                        <button type="submit" id="login-button-1" className="font-sans text-2xl font-bold font-mono" onClick={ validateLogin }> Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default LoginView;