import { async } from "@firebase/util";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import FoodMaterial from "../components/FoodMaterial";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/Page.css";
import "./styles/ViewFoodStock.css";

function ViewFoodStock ()
{

    const position = sessionStorage.getItem( "department" );

    const docRef = collection( db, "FoodStock" );

    const [ stocks, setStocks ] = useState( [] );

    useEffect( () =>
    {
        const getStock = async () =>
        {
            const data = await getDocs( docRef );

            setStocks( data.docs.map( ( data ) => ( { ...data.data(), id: data.id } ) ) );
        };
        getStock();
    }, [] );

    return (
        <div>
            <Headers />
            <Taskbar position={ position } />
            <div id="inner-page" >
                <div id="title-text">
                    <h1 className="text-4xl font-mono font-bold" >
                        Food Stock
                    </h1>
                </div>
                <div id="the-data">
                    {
                        stocks.map( ( e ) =>
                        {
                            return <FoodMaterial obj={ e } />;
                        } )
                    }
                </div>
            </div>
        </div>
    );


}


export default ViewFoodStock;