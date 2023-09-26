import React, { ChangeEvent, useState } from 'react';
import './App.css';
import samplePayload from './initData.json';
import { generateRandomEmail, getEndDateFromStartDate, getTodaysDate } from './utils';
import { fetchCreateReservation, reservationsGroupCreateResponse } from './api';
import { faker } from '@faker-js/faker';
import clsx from 'clsx';
import { DarkModeToggle, Mode } from '@anatoliygatt/dark-mode-toggle';
import QRCode from 'qrcode.react';
import loader from './components/loader';

const renderReservations = (reservationsGroupCreateResponse?: reservationsGroupCreateResponse) => {
    if (!reservationsGroupCreateResponse) return null;

    const reservationItems = reservationsGroupCreateResponse.Reservations?.map((reservation) => (
        <div key={reservation.Id}>
            <p>LastName: {reservation.LastName}</p>
            <p>ReservationNumber: {reservation.Number}</p>
            <p>ReservationId: {reservation.Id}</p>
            <p>StartUtc: {reservation.StartUtc}</p>
            <p>EndUtc: {reservation.EndUtc}</p>
        </div>
    ));

    const reservationGroupItems = reservationsGroupCreateResponse.ReservationGroups?.map((reservationGroup) => (
        <div key={reservationGroup.Id}>
            <p>ReservationGroupId: {reservationGroup.Id}</p>
            <p>CustomerId: {reservationGroup.CustomerId}</p>
        </div>
    ));

    return (
        <>
            {reservationItems}
            {reservationGroupItems}
        </>
    );
};

const getReservationData = (reservationsGroupCreateResponse?: reservationsGroupCreateResponse | null) => {
    if (!reservationsGroupCreateResponse) return null;

    const formattedData = {
        Reservations: reservationsGroupCreateResponse.Reservations?.map(reservation => ({
            Id: reservation.Id,
            GroupId: '00000000-0000-0000-0000-000000000000',
            CustomerId: reservationsGroupCreateResponse.ReservationGroups?.[0]?.CustomerId || ''
        }))
    };
    return JSON.stringify(formattedData);
};

function App() {
    const [mode, setMode] = useState<Mode>(() => window.localStorage.getItem('themeMode') as Mode || 'dark');
    const randomLastName = generateShortLastName();
    const [lastName, setLastName] = useState<string>(randomLastName);
    const [reservationDetails, setReservationDetails] = useState<reservationsGroupCreateResponse | null>(null);
    const [inputData, setInputData] = useState({
        email: generateRandomEmail(randomLastName),
        lastName: randomLastName,
        startUtc: getTodaysDate(),
        endUtc: getEndDateFromStartDate(getTodaysDate())
    });

    const handleInputOnChange = (name: string, event: ChangeEvent<HTMLInputElement>) => {
        setInputData({...inputData, [name]: event.target.value});
    };

    const handleOnDateChange = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = event.target.value;
        if (name === 'startUtc') {
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
    };
    const createReservation = async () => {
        loader.show();
        try {
            const updatedReservations = samplePayload.Reservations.map(reservation => {
                return {...reservation, StartUtc: `${inputData.startUtc}T22:00:00.000Z`, EndUtc: `${inputData.endUtc}T22:00:00.000Z`};
            });
            const newPayload = {
                ...samplePayload,
                Reservations: updatedReservations,
                Customer: {...samplePayload.Customer, Email: inputData.email, LastName: lastName}
            };
            const responseJson = await fetchCreateReservation(newPayload);
            const enhancedReservations = responseJson.Reservations.map((reservation) => ({
                ...reservation,
                LastName: lastName
            }));

            const enhancedReservationGroups = responseJson.ReservationGroups.map((group) => ({
                ...group
            }));

            const enhancedResponse = {
                ...responseJson,
                Reservations: enhancedReservations,
                ReservationGroups: enhancedReservationGroups
            };
            console.log(enhancedResponse);
            setReservationDetails(enhancedResponse);
        } catch (err) {
            console.error(err, 'CATCH');
        }
        loader.hide();
    };

    function generateShortLastName(): string {
        let lastName = faker.person.lastName();
        while (lastName.length > 5) {
            lastName = faker.person.lastName();
        }
        return lastName;
    }

    function handleLastNameClick(): void {
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

    const jsonData = getReservationData(reservationDetails);
    const [isQRZoomed, setQRZoomed] = useState(false);

    return (
        <div className={clsx('App', {dark: mode === 'dark'})}>
            <div className="dark-mode-toggle-button">
                <DarkModeToggle
                    mode={mode}
                    dark="Dark"
                    light="Light"
                    size="sm"
                    onChange={(mode) => {
                        setMode(mode);
                        window.localStorage.setItem('themeMode', mode);
                    }}
                />
            </div>
            <div className="center-content">
                <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                    Enterprise:
                    <select className="uniform-width">
                        <option>QA Sample hotel</option>
                        <option>Another</option>
                    </select>
                </label>
                <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                    <button className="uniform-width" onClick={handleLastNameClick}>Random</button>
                    LastName:
                    <input className="uniform-width" type="text" value={lastName} onChange={(event) => {
                        setLastName(event.target.value);
                        handleInputOnChange('lastName', event);
                    }}/>
                </label>
                <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                    Email:
                    <input className="uniform-width" type="text" value={inputData.email} onChange={(event) => handleInputOnChange('email', event)}/>
                </label>
                <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                    StartUtc:
                    <input className="uniform-width" type="date" value={inputData.startUtc} onChange={(event) => handleOnDateChange('startUtc', event)}/>
                </label>
                <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                    EndUtc:
                    <input className="uniform-width" type="date" value={inputData.endUtc} onChange={(event) => handleOnDateChange('endUtc', event)}/>
                </label>
                <button className="uniform-width" onClick={createReservation}>Create reservation</button>
            </div>
            <div style={{fontSize: '20px', marginTop: '2rem'}}
                className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                {reservationDetails === null ? 'No reservation fetched' : (renderReservations(reservationDetails))}
            </div>
            {jsonData && (
                <div className={isQRZoomed ? 'qr-zoomed-container' : ''} onClick={() => setQRZoomed(!isQRZoomed)}>
                    <div className="qr-wrapper" style={{transform: isQRZoomed ? 'scale(2.5)' : 'scale(1)', transition: 'transform 0.3s'}}>
                        <QRCode value={jsonData}/>
                    </div>
                </div>
            )}
        </div>

    );
}

export default App;
