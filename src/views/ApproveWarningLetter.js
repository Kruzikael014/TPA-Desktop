import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Headers from "../components/Header";
import Taskbar from "../components/Taskbar";
import { db } from "../firebase-config";
import "./styles/ApproveWarningLetter.css";


const ApproveWarningLetter = () =>
{

    const [ data, setData ] = useState( [] );

    const columns = [
        {
            name: "LetterID",
            selector: row => row.id,
            width: "170px"
        },
        {
            name: "EmployeeID",
            selector: row => row.employeeid,
            width: "180px"
        },
        {
            name: "ViolationType",
            selector: row => row.violationtype,
            width: "170px"
        },
        {
            name: "Reason",
            selector: row => row.issuedreason
        },
        {
            name: "Finalized",
            selector: row => row.finalized,
            width: "100px"
        },
        {
            name: "Action",
            selector: ( row ) => ( row.finalized === "No" ) ?
            <div class="action-butt-awl">
                <button class="awl-grn-btn" onClick={ ( e ) => { approve( row ); } }>✓</button>
                <button class="awl-red-btn" onClick={ ( e ) => { reject( row ); } }>✗</button>
            </div>
            :
            <div></div>,
            width: "150px"
        }
    ];

    const approve = async (data) => {
        const ref = doc(db, "WarningLetter", data.id)
        const datax = {
            finalized: "Yes",
            status : {
                approvedat: new Date(Date.now()),
                manager: "Approved"
            }
        }
        await updateDoc(ref, datax)
        window.location.reload()
    }
    

    const reject = async (data) => {
        const ref = doc(db, "WarningLetter", data.id)
        const datax = {
            finalized: "Yes",
            status : {
                approvedat: new Date(Date.now()),
                manager: "Rejected"
            }
        }
        await updateDoc(ref, datax)
        window.location.reload()
    }

    const fetchData = async () => {
        const ref = collection(db, "WarningLetter")
        const documents = await getDocs(ref) 
        setData(documents.docs.map(doc => ({...doc.data(), id: doc.id})))
    }

    useEffect( () =>
    {
        fetchData()
    }, [] );

    const expandableComponent = ({data}) => {
        return (
            <div class="hori-div-awl">
                <div class="vertidiv-awl">
                    <div class="hori-div-awl">
                        <div class="awl-detail-label">
                            IssuedBy
                        </div>
                        <div class="awl-detail-content">
                            {data.issuedby}
                        </div>
                    </div>
                    <div class="hori-div-awl">
                        <div class="awl-detail-label">
                            IssuedAt
                        </div>
                        <div class="awl-detail-content">
                            {new Date(data.issueddate.seconds*1000).toDateString()}
                        </div>
                    </div>
                </div>
                <div class="distance-awl">
                </div>
                <div class="vertidiv-awl">
                    <div class="hori-div-awl">
                        <div class="awl-detail-label">
                            ApprovedStatus
                        </div>
                        <div class="awl-detail-content">
                            {data.status?.manager}
                        </div>
                    </div>
                    <div class="hori-div-awl">
                        <div class="awl-detail-label">
                            ApprovedAt
                        </div>
                        <div class="awl-detail-content">
                            {(data.status.approvedat == null) ? "-" : new Date(data.issueddate.seconds*1000).toDateString()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Headers />
            <Taskbar position={ sessionStorage.getItem( "department" ) } />
            <div id="inner-page">
                <div id="title" className="text-5xl font-mono font-bold">
                    Issued Warning Letters
                </div>
                <DataTable
                    id="awl-datatable"
                    data={ data }
                    columns={ columns }
                    expandableRows
                    expandableRowsComponent={expandableComponent}
                />
            </div>
        </div>
    );

};

export default ApproveWarningLetter;