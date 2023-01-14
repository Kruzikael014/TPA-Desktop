import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";



const UpdateMovieSchedule = () =>
{

    let history = useNavigate()

    const [ movieS, setMovieS ] = useState( [] );
    const [ movie, setMovie ] = useState( [] );

    const schedRef = collection( db, "MovieSchedule" );
    const movieRef = collection( db, "Movie" );

    const fetchMovie = async () =>
    {
        const documents = await getDocs( movieRef );
        setMovie( documents.docs.map( doc => ( { ...doc.data(), id: doc.id } ) ) );
    };


    const fetchSched = async () =>
    {
        const documents = await getDocs( schedRef );
        setMovieS( documents.docs.map( ( doc ) => ( { ...doc.data(), id: doc.id } ) ) );
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
                selector: (row, index) => <button class="select-seat-button-vmov" onClick={ ( e ) => { 
                    const id = data.id                    
                    const indx = index
                    const array = row
                    history("/movie-update", {state: {id, indx}})
                } }> [U] </button>
            },
        ];
        const getSchedule = () =>
        {
            var outputIndex = 0;
            movieS.forEach( ( sched, index ) =>
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
                <DataTable columns={ columns } data={ movieS[ getSchedule() ].schedule } />
            </div>
        );

    };

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title">
                    Update Schedule
                </div>
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

export default UpdateMovieSchedule;