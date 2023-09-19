import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import './App.css';
import samplePayload from './initData.json';
import { generateRandomEmail, generateRandomLastName, getEndDateFromStartDate, getTodaysDate } from './utils';
import { fetchCreateReservation, ReservationsGroupCreateResponseType } from './api';
import { faker } from '@faker-js/faker';

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
    const randomLastName = generateShortLastName();
    const [lastName, setLastName] = useState<string>(randomLastName);
    const [reservationDetails, setReservationDetails] = useState<ReservationsGroupCreateResponseType | null>(null);
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
            const newPayload = {...samplePayload, Reservations: updatedReservations, Customer: {...samplePayload.Customer, Email: inputData.email, LastName: lastName}};
            const responseJson = await fetchCreateReservation(newPayload);
            const enhancedResponse = {...responseJson,Reservations: responseJson.Reservations.map((reservation) => ({...reservation,LastName: lastName}))};
            console.log(enhancedResponse);
        setReservationDetails(enhancedResponse);
        } catch (err) {
            console.error(err, 'CATCH')
        }
        setLoading(false);
    }

    function generateShortLastName(): string {
        let lastName = faker.person.lastName();
        while (lastName.length > 5) {
            lastName = faker.person.lastName();
        }
        return lastName;
    }
    
    function handleLastNameClick(event: React.MouseEvent<HTMLButtonElement>): void {
        const newLastName = generateShortLastName();
        setLastName(newLastName);
        setInputData(prevData => ({
            ...prevData,
            email: generateRandomEmail(newLastName),
            lastName: newLastName
        }));
    }

    // Define/fetch list of Enterprises - their Id, timezone

        // v1/configurations/get - gives us ageCategories, IanaTimeZoneIdentifier,, OccupancyData
        // -resourceCategories/getAll - spaceCategoryId,
        //  services/getPricing - rateId,


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
            <button onClick={handleLastNameClick}>Random</button>
                LastName:
                <input className="uniform-width" type="text" value={lastName} onChange={(event) => {setLastName(event.target.value);handleInputOnChange('lastName', event); }}/>
            </label>
            <label>
                Email:
                <input className="uniform-width" type="text" value={inputData.email} onChange={(event) => handleInputOnChange('email', event)}/>
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
