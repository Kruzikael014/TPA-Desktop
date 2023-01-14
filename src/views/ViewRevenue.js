import { async } from "@firebase/util";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";


const ViewRevenue = () =>
{

    const [movieS, setMovieS] = useState([])

    const fetchMovieRevenue = async () => {

        const ref = collection(db, "MovieSales")
        const documents = await getDocs(ref)
        setMovieS(documents.docs.map((doc) => ({...doc.data(), id: doc.id})))

    }

    const fetchFoodRevenue = () => {



    }

    useEffect(() => {
        fetchMovieRevenue()
        // fetchFoodRevenue()
    }, [])

    const columns = [
        {
            name: "Revenue ID",
            selector: row => row.id
        },
        {
            name: "Movie ID",
            selector: row => row.movieid
        },
        {
            name: "Room ID",
            selector: row => row.roomid
        },
        {
            name: "Date",
            selector: row => new Date(row.date.seconds*1000).toDateString()
        },
        {
            name: "Membership ID",
            selector: row => row.membershipid
        },
        {
            name: "Voucher ID",
            selector: row => (row.voucherid === "") ? "None" : row.voucherid
        },
    ]


    return (
        <div>
            <Headers />
            <Taskbar position={sessionStorage.getItem("department")} />
            <div id="inner-page">
                <div id="title">
                    View Revenue
                </div>
                <DataTable 
                columns={columns}
                data={movieS}
                />
            </div>
        </div>
    );

};

export default ViewRevenue;