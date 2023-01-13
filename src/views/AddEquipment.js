import { async } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/AddEquipment.css";


const AddEquipment = () =>
{

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")

    const saveInput = async() => {
        const eqRef = collection(db, "Equipment");
        const data = {
            name: name,
            category: category,
            status: "Good",
        }
        await addDoc(eqRef, data);
    }

    const validateInput = () => {
        if(name.length === 0) {
            alert("Must fill item name")
        }
        else if(category === "-") {
            alert("Must choose category")
        }
        else {
            saveInput()
        }
    }

    useEffect(() => {
        setCategory("-");
    }, [])

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title-addEq" className="text-4xl font-bold font-mono">
                    Add new Equipment or Facility
                </div>
                <div id="addEq-form" className="text-2xl font-bold font-mono">
                    <div id="name-form-addEq">
                        <label htmlFor="eq-name-addEq">Name</label>
                        <input type={"text"} id="eq-name-addEq" onChange={(e) => {
                            setName(e.target.value)
                        }} />
                    </div>
                    <div id="category-form-addEq" className="text-2xl font-bold font-mono">
                        <label htmlFor="ddown-category-addEq">Category</label>
                        <select id="ddown-category-addEq" onChange={(e) => {
                            setCategory(e.target.value)
                        }}>
                            <option value={"-"}>-</option>
                            <option value={"Electronic"}>Electronic</option>
                            <option value={"Decoration"}>Decoration</option>
                            <option value={"Furniture"}>Furniture</option>
                            <option value={"Others"}>Others</option>
                        </select>
                    </div>
                    <button id="add-butt-addEq" type="submit" onClick={validateInput}> Submit </button>
                </div>
            </div>
        </div>
    );

};

export default AddEquipment;