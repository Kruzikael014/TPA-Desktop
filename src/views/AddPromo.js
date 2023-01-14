import { collection, doc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db, storage } from "../firebase-config";
import { v4 } from "uuid";
import "./styles/AddPromo.css";

const AddPromo = () =>
{

    const [ members, setMembers ] = useState( [] );

    const fetchMember = async () =>
    {
        const memberRef = collection( db, "Member" );
        const documents = await getDocs( memberRef );
        setMembers( documents.docs.map( ( doc ) => ( { ...doc.data(), id: doc.id } ) ) );
    };

    useEffect( () =>
    {
        fetchMember();
    }, [] );

    // console.log(members)

    const [ file, setFile ] = useState( null );
    const [ startDate, setStartDate ] = useState( 0 );
    const [ endDate, setEndDate ] = useState( 0 );
    const [ description, setDescription ] = useState( "" );
    const [ voucherDiscount, setVoucherDiscount ] = useState( 0 );
    const [url, setUrl] = useState("")

    const uploadImage = () => {
        if(file == null) {
            alert("Must choose at least 1 file")
            return;
        } 
        else if (startDate > endDate) {
            alert("Invalid date")
        }
        else if (description === "") {
            alert("Invalid description")
        }
        else if (voucherDiscount === 0) {
            alert("Invalid discount")
        }
        const id = v4()
        const pathRef = ref(storage, `promo/${id}`)
        const docRef = doc(db, "Promos", id)

        uploadBytes(pathRef, file).then( (resolve) => {
            // success  
        })
        getDownloadURL(pathRef).then((url) => {
            console.log(url)
        })

    }

    const validate = () => {

        uploadImage()

    }

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title">
                    Add promo or event
                </div>
                <div id="addprom-form-container">
                    <div class="verti-div">
                        <label htmlFor="promo-filevouc">Voucher</label>
                        <input type={ "file" } id={ "promo-filevouc" } onChange={ ( e ) => { setFile( e.target.files[ 0 ] ); } } />
                    </div>
                    <div class="hori-div">
                        <div class="verti-div">
                            <label htmlFor="promo-startdate">Start Date</label>
                            <input type={ "date" } onChange={(e) => { setStartDate(e.target.valueAsNumber) }} />
                        </div>
                        <div class="verti-div">
                            <label htmlFor="promo-enddate">End Date</label>
                            <input type={ "date" } onChange={(e) => { setEndDate(e.target.valueAsNumber) }} />
                        </div>
                    </div>
                    <div class="verti-div">
                        <label htmlFor="promo-description">Description</label>
                        <textarea id="promo-description" onChange={(e) => { setDescription(e.target.value) }}/>
                    </div>
                    <div class="verti-div">
                        <label htmlFor="promo-discamount">Voucher Discount</label>
                        <input type={ "number" } onChange={(e) => { setVoucherDiscount(e.target.value) }} />
                    </div>
                    <button className="text-2xl font-mono font-bold" id="add-prom-button" onClick={(e) => { validate() }}>Submit</button>
                </div>
            </div>
        </div>
    );

};

export default AddPromo;