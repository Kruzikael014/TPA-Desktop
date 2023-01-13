import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/AddClient.css";

const AddClient = () =>
{

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [type, setType] = useState("-")

    function isPhone(input) {

        const allDigit = (input) => {
                if(isNaN(parseInt(input))) {
                    return false;
                }
                return true;
        }

        if (input.length < 5 || input.length > 13){
            return false;
        }
        else if (!allDigit(phoneNumber)) {
            return false
        }
        else {
            return true;
        }
    }


    const validateInput = () => {
        const saveInput = async() => {
            const data = {
                name: name,
                email: email,
                phonenumber: phoneNumber,
                type: type,
            }
            const clientRef =  collection(db, "Client")
            await addDoc(clientRef, data)
            window.location.reload()
        }
        // email auto dari html nya
        if (name.length === 0) {
            alert("Name must not be empty!")
        } 
        else if (!isPhone(phoneNumber)) {
            alert("Please enter valid phone number")
        }
        else if (!email.endsWith("@gmail.com")) {
            alert("Please enter valid email")
        }
        else if (type === "-") {
            alert("Please select the client type")
        }
        else {
            saveInput()
        }
    }

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title-acli" className="text-4xl font-bold font-mono">
                    Add business partners
                </div>
                <div >
                    {/* id, name, email, phoneNumber, type */ }
                    <form id="form-acli">
                        <div id="name-form-acli">
                            <label htmlFor="name-input-aclis" class="acli-lb">Name</label>
                            <input type={ "text" } id="name-input-aclis" onChange={e => {setName(e.target.value)}} />
                        </div>
                        <div id="email-form-acli">
                            <label class="acli-lb" htmlFor="email-input-aclis">Email</label>
                            <input type={ "text" } id="email-input-aclis" onChange={e => {setEmail(e.target.value)}} />
                        </div>
                        <div id="phoneNumber-form-acli">
                            <label  class="acli-lb" htmlFor="phoneNumber-input-aclis">Phone Number</label>
                            <input placeholder="e.g. 085766739311" type={ "text" } id="phoneNumber-input-aclis" onChange={e => {setPhoneNumber(e.target.value)}} />
                        </div>
                        <div id="type-form-acli">
                            <label class="acli-lb" htmlFor="type-input-aclis">Category</label>
                            <select id="type-input-aclis" onChange={e => {setType(e.target.value)}}>
                                <option value={"-"}>-</option>
                                <option value={"Movie Producer"}>Movie Producer</option>
                                <option value={"Advertising Partner"}>Advertising Partner</option>
                                <option value={"Food or Beverage Supplier"}>Food or Beverage Supplier</option>
                            </select>
                        </div>
                        <button type="submit" id="submit-butt-acli" onClick={ e =>
                        {
                            e.preventDefault()
                            validateInput()
                        } }>
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );

};

export default AddClient;