import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/ViewMovieSchedule.css";

const ViewMovieSchedule = () =>
{

    let history = useNavigate();

    const schedRef = collection( db, "MovieSchedule" );
    const movieRef = collection( db, "Movie" );

    const [ movie, setMovie ] = useState( [] );
    const [ schedule, setSchedule ] = useState( [] );

    const fetchMovie = async () =>
    {
        const documents = await getDocs( movieRef );
        setMovie( documents.docs.map( doc => ( { ...doc.data(), id: doc.id } ) ) );
    };

    const fetchSched = async () =>
    {
        const documents = await getDocs( schedRef );
        setSchedule( documents.docs.map( ( doc ) => ( { ...doc.data(), id: doc.id } ) ) );
    };

    useEffect( () =>
    {
        fetchSched();
        fetchMovie();
    }, [] );

    const columns = [
        {
            name: "Movie ID",
            selector: ( row ) => row.id,
        },
        {
            name: "Movie Name",
            selector: ( row ) => row.movietitle,
        },
        {
            name: "Movie Genre",
            selector: ( row ) => row.moviegenre,
            sortable: true
        },
        {
            name: "Movie Price",
            selector: ( row ) => "Rp. " + row.movieprice,
            sortable: true
        },
        {
            name: "Movie Duration",
            selector: ( row ) => row.movieduration + " minute(s)",
            sortable: true
        },
    ];

    const expandableComponent = ( { data } ) =>
    {
        const columns = [
            {
                name: "Date",
                selector: row => new Date( row.date.seconds * 1000 ).toDateString()
            },
            {
                name: "Start Time",
                selector: row => row.starttime
            },
            {
                name: "End Time",
                selector: row => row.endtime
            },
            {
                name: "Theatre Number",
                selector: row => row.roomid
            },
            {
                name: "Action",
                selector: row => <button class="select-seat-button-vmov" onClick={ ( e ) => { 
                    const movieid = data.id
                    const roomid = row.roomid
                    history( '/seat-detail', 
                    {state: { movieid, roomid }} 
                    ); 
                } }> [ i ] </button>
            },
        ];
        const getSchedule = () =>
        {
            var outputIndex = 0;
            schedule.forEach( ( sched, index ) =>
            {
                if ( sched.id === data.id )
                {
                    outputIndex = index;
                    return;
                }
            } );
            return outputIndex;
        };
        return (
            <div>
                <DataTable columns={ columns } data={ schedule[ getSchedule() ].schedule } />
            </div>
        );

    };

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title">
                    Movie schedules
                </div>
                {/* <button onClick={EVENT => {
                    console.log(schedule)
                    console.log(movie)
                }}>Debug</button> */}
                <div>
                    <DataTable id="viewmov-datatable"
                        data={ movie }
                        columns={ columns }
                        expandableRows
                        expandableRowsComponent={ expandableComponent }
                    />
                </div>
            </div>
        </div>
    );

};

export default ViewMovieSchedule;