import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";

const FundRequestController = () =>
{


    const fetchFundRequest = async () =>
    {

        const fundReqRef = collection( db, "FundRequest" );
        const dataQ = query( fundReqRef, where( "finalized", "==", "No" ) );


        onSnapshot( dataQ, async ( snapshot ) =>
        {
            const temp = [];
            snapshot.docs.forEach( ( doc ) =>
            {
                temp.push( { ...doc.data(), id: doc.id } );
            } );
            // console.log( temp );
            temp.forEach( async data =>
            {
                console.log( data.id );
                
                console.log( data.requeststatus.manager.status );
                console.log( data.requeststatus.finance.status );
                const ref = doc( db, "FundRequest", data.id );
                if ( data.requeststatus.finance.status === "Rejected" && data.requeststatus.manager.status === "Rejected" )
                {
                    await updateDoc( ref, { finalized: "Yes" } );
                    // lanjut forward/notify ke department bersangkutan atau storage
                    // notifyLogic(); 
                }
                else if ( data.requeststatus.finance.status === "Rejected" && data.requeststatus.manager.status === "Approved" )
                {
                    await updateDoc( ref, { finalized: "Yes" } );
                    // lanjut forward/notify ke department bersangkutan atau storage
                    // notifyLogic(); 
                }
                else if ( data.requeststatus.finance.status === "Approved" && data.requeststatus.manager.status === "Rejected" )
                {
                    await updateDoc( ref, { finalized: "Yes" } );
                    // lanjut forward/notify ke department bersangkutan atau storage
                    // notifyLogic(); 
                }
                else if ( data.requeststatus.finance.status === "Approved" && data.requeststatus.manager.status === "Approved" )
                {
                    await updateDoc( ref, { finalized: "Yes" } );
                    // lanjut forward/notify ke department bersangkutan atau storage
                    // notifyLogic(); 
                }
            } );
        } );

    };

    useEffect( () =>
    {
        fetchFundRequest();
    }, [] );

};

export default FundRequestController;