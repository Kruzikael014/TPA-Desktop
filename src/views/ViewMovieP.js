import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ClientCard from "../components/ClientCard";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/ViewMovieP.css";

const ViewMovieP = () =>
{

    const [ dataset, setDataset ] = useState( [] );
    const clientRef = collection( db, "Client" );

    const fetchPartners = async () =>
    {
        const temp = [];
            const movieQ = query( clientRef, where( "type", "==", "Movie Producer" ) );
            onSnapshot( movieQ, ( snapshot ) =>
            {
                snapshot.docs.forEach( ( doc ) =>
                {
                    temp.push( { ...doc.data(), id: doc.id } );
                } );
                setDataset( temp );
                console.log(temp)
            } );
        
        // else if ( filter === "Advertising Partner" )
        // {
        //     const advertQ = query( clientRef, where( "type", "==", "Advertising Partner" ) );
        //     onSnapshot( advertQ, ( snapshot ) =>
        //     {
        //         snapshot.docs.forEach( ( doc ) =>
        //         {
        //             temp.push( { ...doc.data(), id: doc.id } );
        //         } );
        //         setDataset( temp );
        //         console.log(temp)
        //     } );
        // }
        // else if ( filter === "Food or Beverage Supplier" )
        // {
        //     const foodsQ = query( clientRef, where( "type", "==", "Food or Beverage Supplier" ) );
        //     onSnapshot( foodsQ, ( snapshot ) =>
        //     {
        //         snapshot.docs.forEach( ( doc ) =>
        //         {
        //             temp.push( { ...doc.data(), id: doc.id } );
        //         } );
        //         setDataset( temp );
        //         console.log(temp)
        //     } );
        // }
    };

    useEffect(() => {
        fetchPartners()
    }, [])

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title" className="text-4xls font-bold font-mono">
                    <p>
                        Movie Producers
                    </p>
                </div>
                <div id="card-container">
                    {dataset.map(data => {
                        return <ClientCard  id={data.id} type={data.type} email={data.email} name={data.name} phonenumber={data.phonenumber} />
                    })}
                </div>
            </div>
        </div>
    );

};


export default ViewMovieP;