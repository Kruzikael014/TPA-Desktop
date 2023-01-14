import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/SeatPurchase.css";


const SeatPurchase = () =>
{

    const location = useLocation();
    const movieID = location.state.movieID;
    const roomID = location.state.roomID;
    const seatList = location.state.selectedSeat;

    const [ membership, setMembership ] = useState( "" );
    const [ voucher, setVoucher ] = useState( "" );

    const insertTransaction = async () => {

        const ref = collection(db, "MovieSales");
        const data = {
            movieid: movieID,
            date: new Date(Date.now()),
            bookedseat: seatList,
            roomid: roomID,
            membershipid: membership,
            voucherid: voucher 
        }

        await addDoc(ref, data);
        setTimeout(() => {
            window.location.reload()
        }, 500)

    }

    const validate = () =>
    {
        if ( membership === "" )
        {
            setMembership( "None" );
        }
        if ( voucher === "" )
        {
            setVoucher( "None" );
        }
        insertTransaction();
    };

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page" className="font-bold font-mono text-2xl">
                <div id="title" className="font-bold font-mono text-5xl">
                    Seat transaction
                </div>
                <div id="fixed-spurch-attr" className="font-bold font-mono ">
                    <div class="verti-div-spurch">
                        <h1>
                            Movie ID
                        </h1>
                        <h1>
                            { movieID }
                        </h1>
                    </div>
                    <div class="verti-div-spurch">
                        <h1>
                            Room ID
                        </h1>
                        <h1>
                            { roomID }
                        </h1>
                    </div>
                    <div class="verti-div-spurch">
                        <h1>
                            Seat List
                        </h1>
                        <ul>
                            {
                                seatList.map( ( seat ) =>
                                {
                                    return <li>{ seat }</li>;
                                } )
                            }
                        </ul>
                    </div>
                </div>
                <div id="spurch-mem-vouc-container">
                    <div id="spurch-member">
                        <label class="spurch-lbls" htmlFor="spurch-member-input" >Membership</label>
                        <input type={ "text" } id="spurch-member-input" onChange={ ( e ) => { setMembership( e.target.value ); } } />
                    </div>
                    <div id="spurch-voucher">
                        <label class="spurch-lbls" htmlFor="spurch-voucher-input" >Voucher appliance</label>
                        <input type={ "text" } id="spurch-voucher-input" onChange={ ( e ) => { setVoucher( e.target.value ); } } />
                    </div>
                </div>
                <button className="font-bold font-mono text-2xl" id="spurch-butt" onClick={ ( e ) => { validate(); } } >Submit</button>
            </div>
        </div>
    );

};

export default SeatPurchase;