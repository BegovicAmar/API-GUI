import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import { generateRandomEmail, generateShortLastName, getDefaultLanguageTextOrFallback, getEndDateFromStartDate, getTodaysDate } from './utils';
import {
    ConfigurationGetResponse, CreateReservationGroupPayload,
    createSingleReservation,
    fetchCreateReservation,
    fetchEnterpriseConfiguration,
    fetchResourceCategories,
    ReservationsGroupCreateResponse, AgeCategory, ResourceCategory
} from './api';
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

interface CreateReservationOptions {
    ageCategoryId: string;
    resourceCategoryId: string;
}

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
    const [ageCategories, setAgeCategories] = useState<AgeCategory[]>([]);
    const [selectedAgeCategoryId, setSelectedAgeCategoryId] = useState<string | null>(null);
    const [resourceCategories, setResourceCategories] = useState<ResourceCategory[]>([]);
    const [selectedResourceCategoryId, setSelectedResourceCategoryId] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string>(randomLastName);
    const [reservationDetails, setReservationDetails] = useState<ReservationsGroupCreateResponse | null>(null);
    const [inputData, setInputData] = useState({
        email: generateRandomEmail(randomLastName),
        lastName: randomLastName,
        startUtc: getTodaysDate(),
        endUtc: getEndDateFromStartDate(getTodaysDate())
    });

    useEffect(() => {

        try {
            const configDataPromise = fetchEnterpriseConfiguration(selectedEnterpriseId);
            configDataPromise.then((configData) => {
                setConfigurationData(configData);
                setAgeCategories(configData.AgeCategories);
                if (configData.AgeCategories.length > 0) {
                    setSelectedAgeCategoryId(configData.AgeCategories[0].Id);
                }
                if (configData?.BookingEngines?.[0]) {
                    const serviceId = configData?.BookingEngines?.[0].ServiceId;
                    const resourceCategoryPromise = fetchResourceCategories({ServiceId: serviceId});
                    resourceCategoryPromise.then((resourceCategoryResponse) => {
                        setResourceCategories(resourceCategoryResponse.ResourceCategories);
                        if (resourceCategoryResponse.ResourceCategories.length > 0) {
                            setSelectedResourceCategoryId(resourceCategoryResponse.ResourceCategories[0].Id);
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error fetching data', error);
        }

    }, [selectedEnterpriseId]);


    const [configurationData, setConfigurationData] = useState<ConfigurationGetResponse | null>(null);

    const handleInputOnChange = (name: string, event: ChangeEvent<HTMLInputElement>) => {
        setInputData({...inputData, [name]: event.target.value});
    };

    const handleAgeCategoryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAgeCategoryId(event.target.value);
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
    const createReservation = async ({ageCategoryId, resourceCategoryId}: CreateReservationOptions) => {
        loader.show();
        try {
            const selectedEnterprise = configurationData?.Enterprises?.find(
                enterprise => enterprise.Id === selectedEnterpriseId
            );
            const selectedConfiguration = configurationData?.BookingEngines?.[0];

            const timezone = selectedEnterprise?.IanaTimeZoneIdentifier;

            if (!timezone || selectedConfiguration?.Id == null) {
                console.error('Timezone or configurationId is missing');
                loader.hide();
                return;
            }

            const startMoment = moment.tz(`${inputData.startUtc}T00:00:00`, timezone);
            const endMoment = moment.tz(`${inputData.endUtc}T00:00:00`, timezone);

            const reservation = createSingleReservation({
                Identifier: Math.random().toString(),
                StartUtc: startMoment.toISOString(),
                EndUtc: endMoment.toISOString(),
                OccupancyData:[{
                    'AgeCategoryId':ageCategoryId,
                    'PersonCount':1,
                }],
                ProductIds: [],
                RateId: 'fd666d4c-1472-4a61-b490-aeda00cd7e3a',
                RoomCategoryId: resourceCategoryId,
                Notes: null,
            });

            const newPayload: CreateReservationGroupPayload = {
                ConfigurationId: selectedConfiguration?.Id,
                CreditCardData: null, // TOOD maybe we donth have to use them
                Reservations: [reservation],
                Customer: { Email: inputData.email, LastName: lastName},
                HotelId: selectedEnterpriseId,
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

    // -resourceCategories/getAll - spaceCategoryId,
    //  services/getPricing - rateId,

    const jsonData = getReservationData(reservationDetails);
    const [isQRZoomed, setQRZoomed] = useState(false);
    const handleSelectEnterprise = async (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAgeCategoryId(null);
        setSelectedResourceCategoryId(null);
        selectEnterprise(event.target.value);
    };

    const handleResourceCategoryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedResourceCategoryId(event.target.value);
    };
    if (selectedAgeCategoryId == null || selectedResourceCategoryId == null) {
        return (
            <p>
                Loader...
            </p>
        );
    }
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
        Resource Category:
                    <select
                        className="uniform-width"
                        value={selectedResourceCategoryId}
                        onChange={handleResourceCategoryIdChange}
                    >
                        {resourceCategories.map(({Id,Name}) => (
                            <option key={Id} value={Id}>{getDefaultLanguageTextOrFallback(Name)}</option>
                        ))}
                    </select>
                </label>
                <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                Age Category:
                    <select className="uniform-width" value={selectedAgeCategoryId} onChange={handleAgeCategoryIdChange}>
                        {ageCategories.map(({Id,Name}) => (
                            <option key={Id} value={Id}>{getDefaultLanguageTextOrFallback(Name)}</option>
                        ))}
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
                <button className="uniform-width" onClick={() => createReservation({ageCategoryId: selectedAgeCategoryId, resourceCategoryId: selectedResourceCategoryId})}>Create reservation</button>
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
