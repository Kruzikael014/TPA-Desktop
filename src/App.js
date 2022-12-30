import { useState, useEffect } from 'react';
import { db } from "./firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";

function App ()
{

  const [ employee, setEmployee ] = useState( [] );
  const employeeRef = collection( db, "Employeet" );

  useEffect( () =>
  {
    const getEmployee = async () =>
    {
      const data = await getDocs( employeeRef );
      setEmployee( data.docs.map( ( doc ) => ( { ...doc.data(), id: doc.id } ) ) );
    };
    getEmployee();
  }, [] );

  const [ name, setName ] = useState( "" );
  const [ age, setAge ] = useState( 0 );

  const createEmployee = async () =>
  {
    await addDoc( employeeRef, { Name: name, Age: Number( age ) } );
  };

  const updateEmployee = async ( id, age ) =>
  {
    const userDoc = doc( db, "Employeet", id );
    const newFields = { Age: Number( age + 1 ) };
    await updateDoc( userDoc, newFields );
  };

  const deleteEmployee = async ( id ) =>
  {
    const userDoc = doc( db, "Employeet", id );
    await deleteDoc( userDoc );
  };

  return (
    <div className='App'>
      <input type="text" placeholder='Name...' onChange={ ( e ) =>
      {
        setName( e.target.value );
      } } /><br />
      <input type="number" placeholder='Age...' onChange={ ( e ) =>
      {
        setAge( e.target.value );
      } } /><br />
      <button onClick={ createEmployee }>Create User</button>
      {
        employee.map( ( data ) =>
        {
          return (
            <div>
              <h1>Name : { data.Name }</h1>
              <h1>Age  : { data.Age }</h1>
              <div id="buttons">
                <button onClick={ () =>
                {
                  updateEmployee( data.id, Number( data.Age ) );
                } }>Increase age</button>
                <button onClick={ () =>
                {
                  deleteEmployee( data.id );
                } }>Delete data</button>
              </div>
            </div>
          );
        } )
      }
    </div>
  );
}


// done thank you
export default App;
