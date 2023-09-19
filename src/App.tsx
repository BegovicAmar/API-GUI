import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import './App.css';
import samplePayload from './initData.json';
import { generateRandomEmail, generateRandomLastName, getEndDateFromStartDate, getTodaysDate } from './utils';

interface Reservation{
    EndUtc: string;
    StartUtc: string;
    Number: string;
    Id: string;
    ServiceTimeUnitPeriod: string;
    LastName: string;
}
interface ReservationsGroupCreateResponseType {
    Reservations: Array<Reservation>
}

const renderReservations = (reservationsGroupCreateResponse?: ReservationsGroupCreateResponseType) => {
    if (
        reservationsGroupCreateResponse &&
        reservationsGroupCreateResponse.Reservations &&
        Array.isArray(reservationsGroupCreateResponse.Reservations)
    ) {
        return reservationsGroupCreateResponse.Reservations.map((reservation) => (
            <div key={reservation.Id}>
                <p>LastName: {reservation.LastName}</p>
                <p>ReservationNumber: {reservation.Number}</p>
                <p>ReservationId: {reservation.Id}</p>
                <p>StartUtc: {reservation.StartUtc}</p>
                <p>EndUtc: {reservation.EndUtc}</p>
            </div>
        )
    );}
    return null;
}


function App() {
    const [darkMode, setDarkMode] = useState(false);
    const randomLastName = generateRandomLastName();
    const [reservationDetails, setReservationDetails] = useState(null);
    const [inputData, setInputData] = useState({
        email: generateRandomEmail(randomLastName),
        lastName: randomLastName,
        startUtc: getTodaysDate(),
        endUtc: getEndDateFromStartDate(getTodaysDate())
    });
    const [loading, setLoading] = useState(false);

    //@ts-ignore
    const handleInputOnChange = (name, event) => {
        setInputData({ ...inputData, [name]: event.target.value });
    }

    const handleOnDateChange = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value;
        if (name === "startUtc") {
            setInputData({
                ...inputData,
                [name]: newDate,
                endUtc: getEndDateFromStartDate(newDate)
            });
        } else {
            setInputData({
                ...inputData,
                [name]: newDate
            });
        }
    }
    const createReservation = async ()=> {
        setLoading(true);
        try {
            const updatedReservations = samplePayload.Reservations.map(reservation => {
                return {...reservation, StartUtc: `${inputData.startUtc}T22:00:00.000Z`, EndUtc: `${inputData.endUtc}T22:00:00.000Z`};});
            const newPayload = {...samplePayload, Reservations: updatedReservations, Customer: {...samplePayload.Customer, Email: inputData.email, LastName: inputData.lastName}};
            const reposnseMeta = await fetch("https://gx.mews-develop.com/api/bookingEngine/v1/reservationGroups/create",{ method:"POST", body: JSON.stringify(newPayload)}, )
            const responseJson = await reposnseMeta.json();
            const enhancedResponse = {...responseJson,Reservations: responseJson.Reservations.map((reservation: any) => ({...reservation,LastName: inputData.lastName}))};
            console.log(enhancedResponse);
        setReservationDetails(enhancedResponse);
        } catch (err) {
            console.error(err, 'CATCH')
        }
        setLoading(false);
    }

return (
    <div className={`App ${darkMode ? "dark-mode" : ""}`}>
        <div className="center-content">
        {loading && (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        )}
            {/* Dark Mode Toggle Button */}
            <button
                className="dark-mode-toggle-button uniform-width"
                onClick={() => {
                    console.log("Before toggle:", darkMode);
                    setDarkMode(!darkMode);
                    console.log("After toggle:", darkMode);
                }}
            >
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
             </div>
        <div className="center-content">
        {loading && (
    <div className="loader-container">
        <div className="loader"></div>
    </div>
    )}
            <label>
                Enterprise:
                <select>
                    <option>QA Sample hotel</option>
                    <option>ANother</option>
                </select>
            </label>
            <label>
                Email:
                <input className="uniform-width" type="text" value={inputData.email} onChange={(event) => handleInputOnChange('email', event)}/>
            </label>
            <label>
                LastName:
                <input className="uniform-width" type="text" value={inputData.lastName} onChange={(event) => handleInputOnChange('lastName', event)}/>
            </label>
            <label>
                StartUtc:
                <input className="uniform-width" type="date" value={inputData.startUtc} onChange={(event) => handleOnDateChange('startUtc', event)} />
            </label>
            <label>
                EndUtc:
                <input className="uniform-width" type="date" value={inputData.endUtc} onChange={(event) => handleOnDateChange('endUtc', event)} />
            </label>
            <br></br>
            <button className="dark-mode-toggle-button uniform-width" onClick={createReservation}>Create reservation</button>
        </div>
        <div style={{fontSize: '20px', marginTop: '2rem'}}>
            {reservationDetails === null ? 'No reservation fetched' : (
                renderReservations(reservationDetails)
            )}
        </div>
    </div>
);
}

export default App;
