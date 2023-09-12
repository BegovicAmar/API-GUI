import React from 'react';
import './App.css';

function App() {
const createReservation=()=>{
  fetch("https://mews-develop.com/api/bookingEngine/v1/reservationGroups/create",{method:"POST"})
}
  return (
    <div className="App">
      <header className="App-header">
      <button onClick={createReservation}>Create reservation</button>
      </header>
    </div>
  );
}

export default App;
