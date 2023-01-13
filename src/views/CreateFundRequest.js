import { async } from "@firebase/util";
import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore";
import { useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/CreateFundRequest.css";

const CreateFundRequest = () =>
{

    const [amount, setAmount ] = useState(0)
    const [reason, setReason] = useState("")


    const validateForm = () => {

        const fetchPerson = () => {

            const employeeRef = collection(db, "Employee")
            const userQ = query(employeeRef, where("id", "==", sessionStorage.getItem("active-user")))

            onSnapshot(userQ, snapshot => {
                let temp = []
                snapshot.docs.forEach(doc => {
                    temp.push({...doc.data(), id: doc.id})
                })
                process(temp[0].id)
            })

        }

        const process = async (userid) => {
            const fundReqRef = collection(db, "FundRequest")
            const data = {
                employeeid: userid,
                requestamount: amount,
                requestreason: reason,
                requestdate : new Date(Date.now()),
                requeststatus: {
                    manager: {
                        status: "Waiting...",
                        time: null
                    },
                    finance: {
                        status: "Waiting...",
                        time: null
                    }
                },
                finalized: "No"
            }
                await addDoc(fundReqRef, data)
                window.location.reload()
        }

        if(amount === 0 || String(amount).length === 0) {
            alert("Please enter requested amount")
        } else if (reason === "" || reason.length === 0) {
            alert("Please enter request reason")
        } else {
            fetchPerson()
        }

    }

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title">
                    Propose Fund Request
                </div>
                <form id="cfr-form" className="text-2xl font-bold font-mono">
                    <div class="verti-div">
                        <label class="cfr-form-lbs" htmlFor="cfr-amount-input">Amount</label>
                        <input type={"number"} id="cfr-amount-input" class="cfr-form-inputs" onChange={(e) => { setAmount(e.target.value) }}/>
                    </div>
                    <div class="verti-div">
                        <label class="cfr-form-lbs" htmlFor="cfr-reason-input" >Reason</label>
                        <textarea id="cfr-reason-input" class="cfr-form-inputs" onChange={(e) => { setReason(e.target.value) }}></textarea>
                    </div>
                    <button id="cfr-submit-batten" onClick={(e) => { 
                        e.preventDefault(); validateForm() }}>Submit</button>
                </form>
            </div>
        </div>
    );

};

export default CreateFundRequest;