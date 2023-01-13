import { async } from "@firebase/util";
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase-config";

function SalaryRequestController ()
{

    const [ request, setRequest ] = useState( [] );
    const [ employee, setEmployee ] = useState( [] );

    useEffect( () =>
    {
        // fetch request
        ( function ()
        {
            return new Promise( ( resolve, reject ) =>
            {
                ( async function ()
                {
                    const ref = collection( db, "SalaryChangeRequest" );
                    // const documents = await getDocs( ref );
                    const documentQ = query( ref, where( "finalized", "!=", "yes" ) );
                    onSnapshot( documentQ, ( snapshot ) =>
                    {
                        let temp = [];

                        snapshot.docs.forEach( ( doc ) =>
                        {
                            temp.push( { ...doc.data(), id: doc.id } );
                        } );
                        setRequest( temp );

                        // console.log( temp )
                        if ( request.length === 0 )
                        {
                            // console.log(request)
                            reject( { value: temp, message: "Failed to fetch" } );
                        } else
                        {
                            resolve( "Success" );
                        }
                    } );

                } )();
            } );
        } )().catch( ( reject ) =>
        {
            setRequest( reject.value );
        } );

        // fetch employee
        ( function ()
        {
            return new Promise( ( resolve, reject ) =>
            {
                ( async function ()
                {
                    const ref = collection( db, "Employee" );
                    const documents = await getDocs( ref );
                    let temp = [];
                    documents.docs.map( ( doc ) =>
                    {
                        temp.push( { ...doc.data(), id: doc.id } );
                    } );
                    setEmployee( temp );

                    if ( employee.length === 0 )
                    {
                        reject( temp );
                    }
                } )();
            } );
        } )().catch( ( reject ) =>
        {
            setEmployee( reject );
        } );


    }, [] );


    ( function ()
    {
        let salary = 0;
        function getEmployeeSalaryByID ( id )
        {
            const salaryx = employee.forEach( ( element ) =>
            {
                if ( element.id === id )
                {
                    salary = element.salary;
                    return;
                }
            } );
            return salaryx;
        }

        request.forEach( ( element, index ) =>
        {
            getEmployeeSalaryByID( element.employeeid );
            if (element.finalized === "no") {
                if ( element.requeststatus.hrd === "Accepted" && element.requeststatus.manager === "Accepted")
            {
                ( async function ()
                {
                    ( async function ()
                    {
                        const reqReq = doc( db, "SalaryChangeRequest", element.id );
                        const newFinalizedStatus = { finalized: "yes" };
                        await updateDoc( reqReq, newFinalizedStatus );
                    } )();

                    const docRef = doc( db, "Employee", element.employeeid );
                    const newFields = { salary: Number( element.requestamount ) };
                    await updateDoc( docRef, newFields );
                } )();
            } else if ( element.requeststatus.hrd === "Rejected" && element.requeststatus.manager === "Rejected")
            {
                ( async function ()
                {
                    ( async function ()
                    {
                        const reqReq = doc( db, "SalaryChangeRequest", element.id );
                        const newFinalizedStatus = { finalized: "yes" };
                        await updateDoc( reqReq, newFinalizedStatus );
                    } )();

                } )();
            } else if ( element.requeststatus.hrd === "Rejected" && element.requeststatus.manager === "Accepted")
            {
                ( async function ()
                {
                  
                    ( async function ()
                    {
                        const reqReq = doc( db, "SalaryChangeRequest", element.id );
                        const newFinalizedStatus = { finalized: "yes" };
                        await updateDoc( reqReq, newFinalizedStatus );
                    } )();

                } )();
            } else if ( element.requeststatus.hrd === "Accept" && element.requeststatus.manager === "Rejected")
            {
                ( async function ()
                {
                  
                    ( async function ()
                    {
                        const reqReq = doc( db, "SalaryChangeRequest", element.id );
                        const newFinalizedStatus = { finalized: "yes" };
                        await updateDoc( reqReq, newFinalizedStatus );
                    } )();

                } )();
            }
            }
        } );

    } )();





}

export default SalaryRequestController;