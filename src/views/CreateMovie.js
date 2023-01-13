import { addDoc, collection, documentId, Firestore } from "firebase/firestore";
import { useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/CreateMovie.css";

const CreateMovie = () =>
{

    const [title, setTitle] = useState("")
    const [duration, setDuration] = useState(0)
    const [price, setPrice] = useState(0)
    const [genre, setGenre] = useState("")
    
    const  validate = () =>  {
        
        const generateSchedule = (id) => {
            
            console.log(id)

        }

        const process = async () => {

            const colRef = collection(db, "Movie")
            

            const data = {
                movietitle: title,
                movieduration: duration,
                movieprice: price,
                moviegenre: genre,
            }
            await addDoc(colRef, data).then((resolve) => {
                generateSchedule(resolve.id)
            }).catch((exception) => {
                console.log(exception)
            })

        }

        if(title === "") {
            alert("Please enter name")
        } else if (duration === 0) {
            alert("Please enter duration")
        } else if (price === 0) {
            alert("Please enter price")
        } else if (genre === "") {
            alert("please select genre")
        } else {
            process()
        }
    }


    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title" className="text-5xl font-mono font-bold">
                    Insert movie
                </div>
                <div>
                    <div id="cremov-form" className="text-2xl font-mono font-bold">
                        <div class="verti-div-cremov">
                            <label htmlFor="cremov-title" class="cremov-lbs" >Title</label>
                            <input type={ "text" } id="cremov-title" class="cremov-inputs"  onChange={(e) => {
                                setTitle(e.target.value)
                            }}/>
                        </div>
                        <div class="verti-div-cremov">
                            <label htmlFor="cremov-duration" class="cremov-lbs">Duration</label>
                            <input type={ "number" } id="cremov-duration" placeholder={ "In minute(s)" } class="cremov-inputs" onChange={(e) => {
                                setDuration(e.target.value)
                            }} />
                        </div>
                        <div class="verti-div-cremov">
                            <label htmlFor="cremov-price" class="cremov-lbs">Price</label>
                            <input type={ "number" } id={ "cremov-price" } class="cremov-inputs" placeholder={ "" } onChange={(e) => {
                                setPrice(e.target.value)
                            }} />
                        </div>
                        <div class="verti-div-cremov">
                            <label htmlFor="cremov-Genre" class="cremov-lbs">Genre</label>
                            <select id="cremov-Genre" class="cremov-inputs" onChange={(e) => {
                                setGenre(e.target.value)
                            }}>
                                <option value={ "" }></option>
                                <option value={ "Action" }>Action</option>
                                <option value={ "Drama" }>Drama</option>
                                <option value={ "Horror" }>Horror</option>
                                <option value={ "Thriller" }>Thriller</option>
                                <option value={ "Comedy" }>Comedy</option>
                                <option value={ "Science" }>Science Fiction</option>
                                <option value={ "Romance" }>Romance</option>
                                <option value={ "History" }>History</option>
                                <option value={ "Fantasy" }>Fantasy</option>
                                <option value={ "Documentary" }>Documentary</option>
                            </select>
                        </div>
                        <button id="cremov-submit-btn" onClick={(e) => {
                            validate()
                        }}> Submit </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CreateMovie;