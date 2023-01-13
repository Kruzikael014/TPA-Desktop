import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/CreateLeaveRequest.css";


const CreateLeaveRequest = () =>
{


    const [ date, setDate ] = useState( 0 );
    const [ reason, setReason ] = useState( "" );
    const [ type, setType ] = useState( "" );
    const [ user, setUser ] = useState( "" );


    const validateForm = () =>
    {
        const saveRequest = async () => {
            const obj = {
                employeeid: user.id,
                requesttype: type,
                requestreason: reason,
                requestdate: new Date(date),
                requeststatus: {
                    hrd: "Waiting..."
                },
                finalized: "No"
            }
            await addDoc(collection(db, "LeaveRequest"), obj).then((resolve) => {
                window.location.reload()
            })
        }

        if ( date === 0 )
        {
            alert( "Must choose date" );
        }
        else if ( reason.length === 0 )
        {
            alert( "Must input reason" );
        }
        else if ( type.length === 0 )
        {
            alert( "Must choose 1 type" );
        }
        else
        {
            // console.log( new Date( date ) + ", " + reason + ", " + type + ", " + user.id );
            saveRequest()
        }
    };

    useEffect( () =>
    {
        const employeeRef = collection( db, "Employee" );
        const userQ = query( employeeRef, where( "id", "==", sessionStorage.getItem( "active-user" ) ) );

        const temp = [];
        onSnapshot( userQ, ( snapshot ) =>
        {
            snapshot.docs.forEach( ( doc ) =>
            {
                temp.push( { ...doc.data(), id: doc.id } );
            } );
            setUser( temp[ 0 ] );
        } );
    }, [] );


    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title" className="font-bold font-mono">
                    Personal Leave Permission
                </div>
                <div id="pleave-form-container" className="text-2xl font-bold font-mono">
                    <form>
                        <div class="hori-div-pleave">
                            <label htmlFor="pleave-date">Date</label>
                            <input id="pleave-date" type={ "date" } onChange={ ( e ) => { setDate( e.target.valueAsNumber ); } } />
                        </div>
                        <div class="hori-div-pleave">
                            <label htmlFor="pleave-reason">Reason</label>
                            <textarea onChange={ ( e ) => { setReason( e.target.value ); } } id="pleave-reason"></textarea>
                        </div>
                        <div class="hori-div-pleave">
                            <label htmlFor="pleave-type">Type</label>
                            <select id="pleave-type" onChange={ ( e ) => { setType( e.target.value ); } }>
                                <option value={ "" }></option>
                                <option value={ "Marriage" }>Marriage</option>
                                <option value={ "Maternity" }>Maternity</option>
                                <option value={ "Sick" }>Sick</option>
                                <option value={ "Bereavement" }>Bereavement</option>
                                <option value={ "Religious" }>Religious</option>
                                <option value={ "Others" }>Others</option>
                            </select>
                        </div>
                        <button className="text-2xl font-bold" id="pleave-butt" type="submit" onClick={ ( e ) => { e.preventDefault(); validateForm(); } }>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );

};


export default CreateLeaveRequest;