import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import './App.css';

const samplePayload = {
    "ConfigurationId":"e4da5c87-1b4b-4e68-841e-abc800c82505",
    "CreditCardData":{
        "PaymentGatewayData":null,
        "ObfuscatedCreditCardNumber":null
    },
    "Customer":{
        "Email":"sdf@d.com",
        "LastName":"Krat"
    },
    "HotelId":"8a51f050-8467-4e92-84d5-abc800c810b8",
    "LanguageCode":"en-GB",
    "Reservations":[
        {
            "Identifier":"3afc03ec360266a3de0d9b3cf7d67a88f4b56ee5",
            "RoomCategoryId":"aaae5269-f1e8-43e7-9b26-abc800c8118b",
            "StartUtc":"2023-09-12T22:00:00.000Z",
            "EndUtc":"2023-09-14T22:00:00.000Z",
            "OccupancyData":[
                {
                    "AgeCategoryId":"16e8a466-729e-4d32-a221-ade300e410a8",
                    "PersonCount":1
                }
            ],
            "ProductIds":[

            ],
            "RateId":"fd666d4c-1472-4a61-b490-aeda00cd7e3a",
            "Notes":"fsdf"
        }
    ],
    "PromotedServiceReservations":[

    ],
    "Client":"Mews Distributor 1821.0.0",
    "Session":"09809905205405004804809705004805005104504805704504905008404805505804805705805304809032AC2453BCF3B25E69D103EF54026E4C"
}

interface Reservation{
    EndUtc: string;
    StartUtc: string;
    Number: string;
    Id: string;
    ServiceTimeUnitPeriod: string;
}
interface ReservationsGroupCreateResponseType {
    Reservations: Array<Reservation>
}

const renderReservations = (reservationsGroupCreateResponse: ReservationsGroupCreateResponseType) => {
    return reservationsGroupCreateResponse.Reservations.map((reservation) => {
        return <div key={reservation.Id}>
            <p>ReservationNumber: {reservation.Number}</p>
            <p>ReservationId: {reservation.Id}</p>
            <p>StartUtc: {reservation.StartUtc}</p>
            <p>EndUtc: {reservation.EndUtc}</p>
            <p>TimeUnit: {reservation.ServiceTimeUnitPeriod}</p>
        </div>

    })
    return null;
}

function App() {
    const [reservationDetails, setReservationDetails] = useState(null);
    const [inputData, setInputData] = useState({
        email: samplePayload.Customer.Email,
        lastName: samplePayload.Customer.LastName
    });


    //@ts-ignore
    const handleInputOnChange = (name: string, event: ChangeEvent<HTMLInputElement>) => {
        setInputData({...inputData, [name]: event.target.value})
    }
    const handleOnDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        // convert to UTC time string and use in setInputData
        console.log(event.target.value)

        // setInputData({...inputData, [name]: event.target.value})
    }
    const createReservation = async ()=> {
        try {
            // @ts-ignore
            const newPayload = { ...samplePayload, Customer: {...samplePayload.Customer, Email: inputData.email, LastName: inputData.lastName } };
            const reposnseMeta = await fetch("https://gx.mews-develop.com/api/bookingEngine/v1/reservationGroups/create",{ method:"POST", body: JSON.stringify(newPayload)}, )
            const responseJson = await reposnseMeta.json();
            console.log(responseJson)
            setReservationDetails(responseJson);
        } catch (err) {
            console.error(err, 'CATCH')
        }
    }
<br/>
  return (
    <div className="App">
      {/*<header className="App-header">*/}
      {/*    */}
      {/*</header>*/}
        <div>
            <label>
                Email:
                <input type="text" value={inputData.email} onChange={(event) => handleInputOnChange('email', event)}/>
            </label>
            <label>
                LastName
                <input type="text" value={inputData.lastName} onChange={(event) => handleInputOnChange('lastName', event)}/>
            </label>
            <label>
                StartDate
                <input type="date" onChange={handleOnDateChange} />
            </label>
        </div>
        <hr/>
        <button onClick={createReservation}>Create reservation</button>
        <div style={{fontSize:'10px'}}>
            {reservationDetails === null ? 'No reservation fetched' : (
                renderReservations(reservationDetails)
            )}</div>

    </div>
  );
}

export default App;
