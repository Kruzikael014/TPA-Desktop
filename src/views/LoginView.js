import "./styles/LoginView.css"
import "../dist/output.css"
import logo from  "../components/icon.png";

function LoginView ()
{

    return (
        <div>
            <div id="navbar">
            <div id="center-logo">
                <img src={logo} alt="err"/>
            </div>
        </div>
            <div id="login-form"> 
                <div id="form">
                    <p className="font-sans">
                        LOGIN
                    </p>
                    <div>
                        <h3>Username</h3>
                        <input type="text" placeholder="Username"/>
                    </div>
                    <div>
                        <h3>Password</h3>
                        <input type="password" placeholder="Pasword"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginView;