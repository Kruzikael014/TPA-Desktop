import { async } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/CreateMembershipView.css";

const CreateMembershipView = () =>
{

    const [ name, setName ] = useState( "" );
    const [ date, setDate ] = useState( 0 );
    const [ gender, setGender ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ membership, setMembership ] = useState( "" );

    const processData = () =>
    {
        if ( name.length === 0 )
        {
            // console.log( "nama gaboleh kosong" );
        } else if ( date == 0 )
        {
            // console.log( "date gaboleh kosong" );
        } else if ( email.length === 0 )
        {
            // console.log( "Email gaboleh kosong" );
        } else if ( gender != "male" && gender != "female" )
        {
            // console.log( "Gender harus pilih" );
        } else if ( membership == "-" || membership.length == 0 )
        {
            // console.log( "Membership harus pilih gaboleh gak" );
        } else
        {
            // console.log( "Good to go" );
            // console.log( "Nama : " + name + ", gender : " + gender + ", dob : " + new Date( date ) + ", email : " + email + ", membership : " + membership );
            addMember();
        }
    };

    const memberRef = collection(db, "Member")

    const addMember = () => {
        (async function() {
            const toBeInserted = {
                name: name,
                gender: gender,
                dob: new Date(date),
                email: email,
                membershiptype: membership,
            }
            await addDoc(memberRef, toBeInserted)
            window.location.reload()
        })()
    }



    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page" className="font-mono font-semibold text-3xl">
                <div id="title-container" className="font-bold font-mono">
                    <h1 id="title">Register New Member</h1>
                </div>
                <div id="form-cmv">
                    <div id="name-form-cmv-container">
                        <label htmlFor="name-form-cmv" class="cmv-lb">Name</label>
                        <input type="text" id="name-form-cmv" class="cmv-inp" onChange={ ( e ) =>
                        {
                            setName( e.target.value );
                        } } />
                    </div>
                    <div id="email-form-cmv-container">
                        <label htmlFor="email-form-cmv" class="cmv-lb">Email</label>
                        <input type="text" id="mail-form-cmv" class="cmv-inp" onChange={ ( e ) =>
                        {
                            setEmail( e.target.value );
                        } } />
                    </div>
                    <div id="dob-form-cmv-container">
                        <label htmlFor="dob-form-cmv" class="cmv-lb">Date of Birth</label>
                        <input type="date" id="dob-form-cmv" class="cmv-inp" onChange={ ( e ) =>
                        {
                            setDate( e.target.valueAsNumber );
                        } } />
                    </div>
                    <div id="gender-form-cmv-container">
                        <label htmlFor="gend-form-cmv" class="cmv-lb">Gender</label>
                        <div id="butten">
                            <div id="male-butten" >
                                <label htmlFor="mgend-form-cmv" class="cmv-lb">Male</label>
                                <input type="radio" value="male" class="cmv-inp" id="mgend-form-cmv" name="gender-rb-cmv" onChange={ ( e ) =>
                                {
                                    setGender( e.target.value );
                                } } />
                            </div>
                            <div id="female-butten">
                                <label htmlFor="fgend-form-cmv" class="cmv-lb">Female</label>
                                <input type="radio" value="female" class="cmv-inp" id="fgend-form-cmv" name="gender-rb-cmv" onChange={ ( e ) =>
                                {
                                    setGender( e.target.value );
                                } } />
                            </div>
                        </div>
                    </div>
                    <div id="membertype-form-cmv-container">
                        <label htmlFor="memtyp-form-cmv" class="cmv-lb">Membership Type</label>
                        <select id="memtyp-form-cmv" class="cmv-inp" onChange={ ( e ) =>
                        {
                            setMembership( e.target.value );
                        } }>
                            <option value="-">-</option>
                            <option value="bronze">Bronze</option>
                            <option value="silver">Silver</option>
                            <option value="gold">Gold</option>
                        </select>
                    </div>
                    <div id="ohyeah-button" onClick={ ( e ) =>
                    {
                        processData()
                    } } >
                        <h1>Submit</h1>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CreateMembershipView;