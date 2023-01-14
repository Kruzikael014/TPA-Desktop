import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/SeatDetail.css";

function SeatDetail ()
{

    let history = useNavigate()
    const location = useLocation();
    const movieID = location.state.movieid;
    const roomID = location.state.roomid;

    const [ room, setRoom ] = useState( {} );

    const fetchRoom = () =>
    {
        const docRef = collection( db, "Room" );

        const roomQ = query( docRef, where( "theaternumber", "==", roomID ) );

        onSnapshot( roomQ, ( snapshot ) =>
        {
            const temp = [];
            temp.push( snapshot.docs.map( ( doc ) => ( { ...doc.data(), id: doc.id } ) ) );
            setRoom( ...temp[ 0 ] );
        } );
    };

    useEffect( () =>
    {
        fetchRoom();
        getSeat();
    }, [] );


    const seat = ( { number } ) =>
    {
        return <div class="seat">{ number + 1 }</div>;
    };

    const seatList = [];

    const selectedSeat = []

    const getSeat = () =>
    {
        for ( var i = 0; i < room.capacity; i++ )
        {
            seatList.push(
                <div class="seat-single-container">
                    <label class="seat-seatdetlbs" htmlFor={`seat-seatdet${ i + 1 }`} >{i+1}</label>
                    <input type="checkbox" class="seat-seatdet" id={ `seat-seatdet${ i + 1 }`} value={`${ i + 1 }`} onChange={(e) => {
                        if(e.target.checked) {
                            selectedSeat.push(e.target.value)
                        } else {
                            selectedSeat.forEach((seat, index) => {
                                if (seat === e.target.value) {
                                    selectedSeat.splice(index, 1);
                                    return;
                                }
                            })
                        }
                        console.log("Current selected seat : " + selectedSeat.toString())
}} />
                </div>
            );
        }
        return seatList;
    };

    const redirect = () => {
        if (selectedSeat.length === 0) {
            alert("please select at least 1 seat")
            return;
        } 
        history("/seat-purchase", {state: {movieID, selectedSeat,roomID}})
    }

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="middle-aligned-sdet">
                    <div id="sdet-screen-container">
                        ---------------------------------------------------------------------------------Screen---------------------------------------------------------------------------------
                    </div>
                    {/* <button onClick={ ( e ) => { console.log( room ); console.log( seatList ); } }>DEBUG</button> */}
                    <div id="sdet-seat-container">
                        { getSeat().map( ( seat ) => { return seat; } ) }
                    </div>
                </div>
                <button onClick={(e) => { redirect() }} id="seatdet-butt">Buy Seat(s)</button>
            </div>
        </div>
    );

}

export default SeatDetail;