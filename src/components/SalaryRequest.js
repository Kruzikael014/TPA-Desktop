import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import "../views/styles/ViewSalaryAdjustment.css";

function SalaryRequest ( prop )
{

    const userPosition = sessionStorage.getItem( "department" );

    const acceptRequest = async ( id, docu ) =>
    {
        const docReference = doc( db, "SalaryChangeRequest", id );

        if ( userPosition === "manager" )
        {
            const newFields = {
                requeststatus: {
                    hrd: docu.requeststatus.hrd,
                    manager: "Accepted",
                }
            };
            await updateDoc( docReference, newFields );
            window.location.reload();
        } else if ( userPosition === "hrd" )
        {
            const newFields = {
                requeststatus: {
                    hrd: "Accepted",
                    manager: docu.requeststatus.manager,
                }
            };
            await updateDoc( docReference, newFields );
            window.location.reload();
        }
    };

    const rejectRequest = async ( id, docu ) =>
    {
        const docReference = doc( db, "SalaryChangeRequest", id );
        if ( userPosition === "manager" )
        {
            const newFields = {
                requeststatus: {
                    hrd: docu.requeststatus.hrd,
                    manager: "Rejected",
                }
            };
            await updateDoc( docReference, newFields );
            window.location.reload();
        } else if ( userPosition === "hrd" )
        {
            const newFields = {
                requeststatus: {
                    hrd: "Rejected",
                    manager: docu.requeststatus.manager,
                }
            };
            await updateDoc( docReference, newFields );
            window.location.reload();
        }
    };

    const valdiateButton = ( finalizedstatus, data ) =>
    {
        if ( finalizedstatus === "no" )
        {
            return (
                <div class="buttons-vsa">
                    <div class="accept-button-vsa" onClick={ ( e ) =>
                    {
                        acceptRequest( data.id, data );
                    } }>
                        Accept
                    </div>
                    <div class="reject-button-vsa" onClick={ ( e ) =>
                    {
                        rejectRequest( data.id, data );

                    } }>
                        Reject
                    </div>
                </div>
            );
        }
    };

    return (
        <div class="salary-request-card-vsa">
            <div class="request-vsa-id">
                <h1>
                    Request ID : { prop.data.id }
                </h1>
            </div>
            <div class="request-vsa-status">
                <div class="man-status-approval">
                    <h1>
                        Manager
                    </h1>
                    <h1>
                        { prop.data.requeststatus.manager }
                    </h1>
                </div>
                <div class="fin-status-approval">
                    <h1>
                        hrd
                    </h1>
                    <h1>
                        { prop.data.requeststatus.hrd }
                    </h1>
                </div>
            </div>
            <div>
                Requested by { prop.data.employeeid } at { new Date( prop.data.requestdate.seconds * 1000 ).toDateString() }
            </div>
            <div>
                Amount requested : { prop.data.requestamount }
            </div>
            <div class="request-reason-vsa">
                <h1>Request Reason : </h1>
                <h1>{ prop.data.requestreason }</h1>
            </div>
        {valdiateButton(prop.data.finalized, prop.data)}
        </div>
    );

}

export default SalaryRequest;