import { async } from "@firebase/util";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/MovieUpdate.css";


const MovieUpdate = () =>
{

    const location = useLocation();

    const id = location.state.id;
    const idx = location.state.indx;

    const [data, setData] = useState()

    const [newShift, setNewShift] = useState("")

    const validate = async () => {


        if(newShift === "") {
            alert("Kocags")
            return
        }
        // console.log(data) old

        if(newShift === "1") {

            data[idx].starttime = "9.20"
            data[idx].endtime = "11.20"
        }
        else if (newShift === "2") {
            data[idx].starttime = "11.20"
            data[idx].endtime = "13.20"
            
        }
        else if (newShift === "3") {
            data[idx].starttime = "13.20"
            data[idx].endtime = "15.20"
            
        }
        else if (newShift === "4") {
            data[idx].starttime = "15.20"
            data[idx].endtime = "17.20"
            
        }
        else if (newShift === "5") {
            data[idx].starttime = "17.20"
            data[idx].endtime = "19.20"
            
        }
        else if (newShift === "6") {
            data[idx].starttime = "19.20"
            data[idx].endtime = "21.20"

        }
        // console.log(data) new

        await updateDoc(doc(db, "MovieSchedule", id), {schedule: data})
        
        setTimeout(() => {
            window.location.reload()
        }, 500)

    }

    const fetchData = () => {
        const docRef = doc(db, "MovieSchedule", id)
        onSnapshot(docRef, snapshot => {
            const temp = snapshot.data()
            setData(temp.schedule)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page" className="text-2xl font-mono font-bold">
                <div id="title" className="font-bold font-mono text-4xl">
                    Update schedule form
                </div>
                <div id="movie-update-information">
                    { "Change movie " + id + " day " + idx + " into shift...." }
                </div>
                <div id="shift-form-movup">
                    <label htmlFor="shift-form-input" id="shift-form-input-lbs">Shift</label>
                    <select id="shift-form-input"  onChange={(e) => { setNewShift(e.target.value) }}>
                        <option value={""}></option>
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                        <option value={"4"}>4</option>
                        <option value={"5"}>5</option>
                        <option value={"6"}>6</option>
                    </select>
                </div>
                <button id="movupd-button" onClick={(e) => {
                    validate()
                }}>Update</button>
            </div>

        </div>
    );

};

export default MovieUpdate;