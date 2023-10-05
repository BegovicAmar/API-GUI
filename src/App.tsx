import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import { generateRandomEmail, generateShortLastName, getDefaultLanguageTextOrFallback, getEndDateFromStartDate, getTodaysDate } from './utils';
import {
    ConfigurationGetResponse, CreateReservationGroupPayload,
    createSingleReservation,
    fetchCreateReservation,
    fetchEnterpriseConfiguration,
    fetchResourceCategories,
    ReservationsGroupCreateResponse, AgeCategory, ResourceCategory, isSuccessfulReservationGroupResponse, Rate, fetchRateIds, RatePayload
} from './api';
import clsx from 'clsx';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';
import QRCode from 'qrcode.react';
import LoaderComponent from './components/LoaderComponent';
import moment from 'moment-timezone';
import { useThemeContext } from './hooks/useThemeValue';

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
    const [isLoading, setIsLoading] = useState(false);
    const { setTheme, value: mode} = useThemeContext();
    const randomLastName = generateShortLastName();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedEnterpriseId, selectEnterprise] = useState<string>('8a51f050-8467-4e92-84d5-abc800c810b8');
    const [ageCategories, setAgeCategories] = useState<AgeCategory[]>([]);
    const [selectedAgeCategoryId, setSelectedAgeCategoryId] = useState<string | null>(null);
    const [resourceCategories, setResourceCategories] = useState<ResourceCategory[]>([]);
    const [selectedResourceCategoryId, setSelectedResourceCategoryId] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string>(randomLastName);
    const [rates, setRates] = useState<Rate[]>([]);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [showHiddenFields, setShowHiddenFields] = useState(false);
    const enterpriseIDRef = useRef<HTMLInputElement>(null);
    const enterpriseNameRef = useRef<HTMLInputElement>(null);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const [enterprises, setEnterprises] = useState([
        { id: '8a51f050-8467-4e92-84d5-abc800c810b8', name: 'Bespin' },
        { id: 'dab943a7-7f00-4656-b383-ae5a01007136', name: 'Mews Guest Journey Hotel' },
        { id: '5565d322-2505-4450-8284-aca8016c4844', name: 'Chicago UTC' },
    ]);
    const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
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

                if (!selectedAgeCategoryId || !configData.AgeCategories.find(cat => cat.Id === selectedAgeCategoryId)) {
                    setSelectedAgeCategoryId(configData.AgeCategories[0]?.Id || null);
                }

                if (configData?.BookingEngines?.[0]) {
                    const serviceId = configData?.BookingEngines?.[0].ServiceId;
                    const bookingEngineId = configData?.BookingEngines?.[0].Id;

                    const resourceCategoryPromise = fetchResourceCategories({ ServiceId: serviceId });
                    resourceCategoryPromise.then((resourceCategoryResponse) => {
                        setResourceCategories(resourceCategoryResponse.ResourceCategories);
                        if (resourceCategoryResponse.ResourceCategories.length > 0) {
                            setSelectedResourceCategoryId(resourceCategoryResponse.ResourceCategories[0].Id);

                            const timezone = configData?.Enterprises?.find(
                                enterprise => enterprise.Id === selectedEnterpriseId
                            )?.IanaTimeZoneIdentifier;

                            const startMoment = timezone ? moment.tz(`${inputData.startUtc}T00:00:00`, timezone).toISOString() : inputData.startUtc;
                            const endMoment = timezone ? moment.tz(`${inputData.endUtc}T00:00:00`, timezone).toISOString() : inputData.endUtc;

                            const ratePayload: RatePayload = {
                                EnterpriseId: selectedEnterpriseId,
                                ServiceId: serviceId,
                                BookingEngineId: bookingEngineId,
                                CategoryId: resourceCategoryResponse.ResourceCategories[0].Id,
                                AgeCategoryId: configData.AgeCategories[0].Id,
                                StartUtc: startMoment,
                                EndUtc: endMoment
                            };
                            fetchRateIds(ratePayload).then(rateResponse => {
                                setRates(rateResponse.Rates);
                            });
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error fetching data', error);
        }

    }, [inputData.endUtc, inputData.startUtc, selectedAgeCategoryId, selectedEnterpriseId]);


    const [configurationData, setConfigurationData] = useState<ConfigurationGetResponse | null>(null);

    const handleInputOnChange = (name: string, event: ChangeEvent<HTMLInputElement>) => {
        setInputData({...inputData, [name]: event.target.value});
    };

    const handleAgeCategoryIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAgeCategoryId(event.target.value);
    };

    const handleRateIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRateId(event.target.value);
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
        setErrorMessage(null);
        setReservationDetails(null);
        setIsLoading(true);
        try {
            const selectedEnterprise = configurationData?.Enterprises?.find(
                enterprise => enterprise.Id === selectedEnterpriseId
            );
            const selectedConfiguration = configurationData?.BookingEngines?.[0];

            const timezone = selectedEnterprise?.IanaTimeZoneIdentifier;

            if (!timezone || selectedConfiguration?.Id == null) {
                console.error('Timezone or configurationId is missing');
                setIsLoading(false);
                return;
            }

            const startMoment = moment.tz(`${inputData.startUtc}T00:00:00`, timezone);
            const endMoment = moment.tz(`${inputData.endUtc}T00:00:00`, timezone);

            const rateId = selectedRateId || (rates.length > 0 ? rates[0].Id : 'fd666d4c-1472-4a61-b490-aeda00cd7e3a');

            const reservation = createSingleReservation({
                Identifier: Math.random().toString(),
                StartUtc: startMoment.toISOString(),
                EndUtc: endMoment.toISOString(),
                OccupancyData:[{
                    'AgeCategoryId':ageCategoryId,
                    'PersonCount':1,
                }],
                ProductIds: [],
                RateId: rateId,
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
            if (!isSuccessfulReservationGroupResponse(responseJson)) {
                setErrorMessage(responseJson.Message);
                setIsLoading(false);
                return;
            }

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
        } finally {
            setIsLoading(false);
        }
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


    const addEnterpriseToDropdown = async () => {
        const idValue = enterpriseIDRef.current?.value;
        const nameValue = enterpriseNameRef.current?.value;

        if (idValue && nameValue) {
            try {
                await fetchEnterpriseConfiguration(idValue);

                setEnterprises((prevEnterprises) => [
                    ...prevEnterprises,
                    { id: idValue, name: nameValue },
                ]);
                setSuccessMessage('Enterprise added successfully');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000);  // Clear the message after 3 seconds

                // Clear the input fields
                enterpriseIDRef.current.value = '';
                enterpriseNameRef.current.value = '';
            } catch (error) {
                // Only enters this block if fetchEnterpriseConfiguration throws an error (e.g., due to a 400 status code)
                console.error('Error validating EnterpriseID:', error);
                setValidationError('Invalid EnterpriseID.');
            }
        }
    };



    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (validationError) {
            timer = setTimeout(() => {
                setValidationError(null);
            }, 5000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [validationError]);
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (errorMessage) {
            timer = setTimeout(() => {
                setErrorMessage(null);
            }, 10000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [errorMessage]);

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
    return (
        <div className={clsx('App', {dark: mode === 'dark'})}>
            {isLoading && <LoaderComponent type="reservation" />}
            { (selectedAgeCategoryId == null || selectedResourceCategoryId == null) ? (
                <LoaderComponent type="configuration" />
            ) : (
                <>
                    <div className="dark-mode-toggle-button">
                        <DarkModeToggle
                            mode={mode}
                            dark="Dark"
                            light="Light"
                            size="sm"
                            onChange={(mode) => {
                                setTheme(mode);
                                // window.localStorage.setItem('themeMode', mode);
                            }}
                        />
                    </div>
                    <div className="fields-wrapper">
                        <button onClick={() => setShowHiddenFields(!showHiddenFields)}>
                        Add Enterprise
                        </button>
                        <div className="center-content">
                            {showHiddenFields && (
                                <>
                                    <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                                EnterpriseID:
                                        <input className="uniform-width" type="text" ref={enterpriseIDRef} />
                                    </label>
                                    <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                                EnterpriseName:
                                        <input className="uniform-width" type="text" ref={enterpriseNameRef} />
                                    </label>
                                    <button onClick={addEnterpriseToDropdown}>Submit</button>
                                    {validationError && (
                                        <div className={clsx('error-container', { 'dark-error': mode === 'dark', 'light-error': mode === 'light' })}>
                                            <span className="error-icon">⚠️</span>{validationError}
                                        </div>
                                    )}
                                    {successMessage && (
                                        <div className={clsx(
                                            'success-container',
                                            { 'dark-success': mode === 'dark', 'light-success': mode === 'light' } // Conditional classes
                                        )}>
                                            <span className="success-icon">✅</span> {/* Display a checkmark as a success icon */}
                                            {successMessage}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="center-content">
                        <label className={mode === 'dark' ? 'dark-mode-label' : 'light-mode-label'}>
                    Enterprise:
                            <select className="uniform-width" onChange={handleSelectEnterprise} value={selectedEnterpriseId}>
                                {enterprises.map((enterprise) => (
                                    <option key={enterprise.id} value={enterprise.id}>
                                        {enterprise.name}
                                    </option>
                                ))}
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
                 Rate:
                            <select className="uniform-width" value={selectedRateId ?? ''} onChange={handleRateIdChange}>
                                {rates.map(({Id,Name}) => (
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
                    {errorMessage && (
                        <div className={clsx('error-container', { 'dark-error': mode === 'dark', 'light-error': mode === 'light' })}>
                            <span className="error-icon">⚠️</span> {/* You can replace with an actual error icon if you have one */}
                            {errorMessage}
                        </div>
                    )}
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
                </>
            )}
        </div>

    );
}

export default App;
