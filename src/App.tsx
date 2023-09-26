import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import samplePayload from './initData.json';
import { generateRandomEmail, getEndDateFromStartDate, getTodaysDate } from './utils';
import { ConfigurationGetResponse, fetchCreateReservation, fetchEnterpriseConfiguration, ReservationsGroupCreateResponse } from './api';
import { faker } from '@faker-js/faker';
import clsx from 'clsx';
import { DarkModeToggle, Mode } from '@anatoliygatt/dark-mode-toggle';
import QRCode from 'qrcode.react';
import loader from './components/loader';
import moment from 'moment-timezone';

const renderReservations = (reservationsGroupCreateResponse?: ReservationsGroupCreateResponse) => {
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

const getReservationData = (reservationsGroupCreateResponse?: ReservationsGroupCreateResponse | null) => {
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
    const [selectedEnterpriseId, selectEnterprise] = useState<string>('8a51f050-8467-4e92-84d5-abc800c810b8');
    const [lastName, setLastName] = useState<string>(randomLastName);
    const [reservationDetails, setReservationDetails] = useState<ReservationsGroupCreateResponse | null>(null);
    const [inputData, setInputData] = useState({
        email: generateRandomEmail(randomLastName),
        lastName: randomLastName,
        startUtc: getTodaysDate(),
        endUtc: getEndDateFromStartDate(getTodaysDate())
    });

    useEffect(() => {
        fetchEnterpriseConfiguration(selectedEnterpriseId).then(response => {
            setConfigurationData(response);
        });
    }, [selectedEnterpriseId]);

    const [configurationData, setConfigurationData] = useState<ConfigurationGetResponse | null>(null);

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

            const selectedEnterprise = configurationData?.Enterprises?.find(
                enterprise => enterprise.Id === selectedEnterpriseId
            );

            const timezone = selectedEnterprise?.IanaTimeZoneIdentifier;
            
            if (!timezone) {
                console.error('Timezone is undefined');
                loader.hide();
                return;
            }
            
            const startMoment = moment.tz(`${inputData.startUtc}T00:00:00`, timezone);
            const endMoment = moment.tz(`${inputData.endUtc}T00:00:00`, timezone);
    
            const updatedReservations = samplePayload.Reservations.map(reservation => {
                return {
                    ...reservation,
                    StartUtc: startMoment.toISOString(),
                    EndUtc: endMoment.toISOString()
                };
            });
    
            const newPayload = {
                ...samplePayload,
                Reservations: updatedReservations,
                Customer: {
                    ...samplePayload.Customer,
                    Email: inputData.email,
                    LastName: lastName
                }
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
    const handleSelectEnterprise = async (event: ChangeEvent<HTMLSelectElement>) => {
        selectEnterprise(event.target.value);
    };
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
                    <select className="uniform-width" onChange={handleSelectEnterprise} value={selectedEnterpriseId}>
                        <option value="8a51f050-8467-4e92-84d5-abc800c810b8">Bespin</option>
                        <option value="dab943a7-7f00-4656-b383-ae5a01007136">Mews Guest Journey Hotel</option>
                        <option value="5565d322-2505-4450-8284-aca8016c4844">Chicago UTC</option>
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
