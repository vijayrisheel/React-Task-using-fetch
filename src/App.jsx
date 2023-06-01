import { useEffect, useState } from 'react'
// import { useInterval } from './useInterval'
import './App.css'

const url = 'https://randomuser.me/api?results=10'
let fetchedUserData;

async function fetchUserData(url) {

let fetchUserData = await fetch(url);
fetchedUserData = await fetchUserData.json();
fetchedUserData = fetchedUserData['results'];

return fetchedUserData;

}

// let promise = fetchUserData(url);

// setInterval(updateReqDetails, 1000);


function App() {
  const [reqDetails, setReqDetails] = useState([]);

  useEffect( () => {let intervalID = setInterval(updateReqDetails, 2000); 
              return () => clearInterval(intervalID)}, [] ) // is called when component is mounted

  // setInterval(updateReqDetails, 2000); => 
  // useInterval(updateReqDetails, 1000);

  function updateReqDetails()
  {
    fetchUserData(url).then(function(result) { // we are providing promise with a callback to be called -> which will update the state hence re-render
      if(result.length) {
        let updatedDetails = [];
        result.forEach(element => {
          let fullName = element.name.title + " " + element.name.first + " " + element.name.last;
          let email = element.email;
          let phone = element.phone;
        
          updatedDetails.push({name:fullName, email:email, phone:phone});
        });
        setReqDetails(updatedDetails);
      }
    })
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Phone No.</th>
          </tr>
        </thead>
        <tbody>
          {reqDetails.length && reqDetails.map(
            (userDetails) => <tr key={userDetails.email}>
              <td>{userDetails.name}</td>
              <td>{userDetails.email}</td>
              <td>{userDetails.phone}</td>
            </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}

export default App

