import { signInWithCredential, signInWithEmailAndPassword, updatePassword as updatePass } from "firebase/auth";
import { collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { auth, db } from "../firebase-config";
import "./styles/ResetPassword.css";

const ResetPassword = () =>
{

    const [ userData, setUserData ] = useState( [] );
    const [ id, setID ] = useState( "" );
    const [newPassword, setNewPassword] = useState("")

    const fetchUser = async () =>
    {
        const ref = collection( db, "Employee" );
        const data = await getDocs( ref );
        setUserData( data.docs.map( ( doc ) => ( { ...doc.data(), id: doc.id } ) ) );
    };

    useEffect( () =>
    {
        fetchUser();
    }, [] );

    const updatePassword = async () => {
        getUser();
    }
    
    const getUser =  () => {
        const docRef = doc(db, "Employee", id)
        onSnapshot(docRef, async snapshot => {
            const temp = []
            temp.push({...snapshot.data(), id: snapshot.id})
            const email = temp[0].email
            const pass = temp[0].password
            const user = await signInWithEmailAndPassword(auth, email, pass);
            updatePass(user.user, newPassword).then(async () => {
                await updateDoc(docRef, {password: newPassword})
                window.location.reload()
            }) 
        })
    }

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title" className="font-mono font-bold text-5xl">
                    Reset Password
                </div>
                <div id="res-pass-form">
                    <label htmlFor="alluser-respas" className="text-3xl font-mono font-bold">
                        User
                    </label><hr/>
                    <select id="alluser-respas" onChange={(e) => { 
                        setID(e.target.value)
                    }} >
                        <option value={ "" } ></option>
                        {
                            userData.map( data =>
                            {
                                return <option value={data.id} >{ data.id } - { data.name } - { data.department } - {data.authid}</option>;
                            } )
                        }
                    </select>
                </div>
                <div className="text-3xl font-mono font-bold">
                    <label htmlFor="newpass-respas">New password</label><hr/>
                    <input style={{width: "960px"}} id="newpass-respas" type={"password"} onChange={(e) => { setNewPassword(e.target.value) }} />
                </div>
                <button type="submit" id="respass-butt" className="text-2xl font-bold font-mono" onClick={(e) => {
                    updatePassword();
                }}>Submit</button>
            </div>
        </div>
    );

};


export default ResetPassword;
