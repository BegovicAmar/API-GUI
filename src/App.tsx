import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import {
    generateRandomEmail,
    generateShortLastName,
    getEndDateFromStartDate,
    getTodaysDate,
} from './utils';
import {
    AgeCategory,
    ConfigurationGetResponse,
    CreateReservationGroupPayload,
    createSingleReservation,
    fetchCreateReservation,
    fetchEnterpriseConfiguration,
    fetchRateIds,
    fetchResourceCategories,
    isSuccessfulReservationGroupResponse,
    Rate,
    RatePayload,
    ReservationsGroupCreateResponse,
    ResourceCategory,
} from './api';
import clsx from 'clsx';
import { DarkModeToggle } from '@anatoliygatt/dark-mode-toggle';
import QRCode from 'qrcode.react';
import LoaderComponent from './components/LoaderComponent';
import moment from 'moment-timezone';
import { useThemeContext } from './hooks/useThemeValue';
import { CustomInput } from './components/CustomInput';
import { CustomSelect } from './components/CustomSelect';
import { DEFAULT_LANGUAGE_CODE } from './constants';
import { AddEnterprise, PoorEnterprise } from './components/AddEnterprise';

const renderReservations = (
    reservationsGroupCreateResponse?: ReservationsGroupCreateResponse,
) => {
    if (!reservationsGroupCreateResponse) return null;
    const reservationItems = reservationsGroupCreateResponse.Reservations?.map(
        (reservation) => (
            <div key={reservation.Id}>
                <p>LastName: {reservation.LastName}</p>
                <p>ReservationNumber: {reservation.Number}</p>
                <p>ReservationId: {reservation.Id}</p>
                <p>StartUtc: {reservation.StartUtc}</p>
                <p>EndUtc: {reservation.EndUtc}</p>
            </div>
        ),
    );

    const reservationGroupItems =
        reservationsGroupCreateResponse.ReservationGroups?.map(
            (reservationGroup) => (
                <div key={reservationGroup.Id}>
                    <p>ReservationGroupId: {reservationGroup.Id}</p>
                    <p>CustomerId: {reservationGroup.CustomerId}</p>
                </div>
            ),
        );

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

const getReservationData = (
    reservationsGroupCreateResponse?: ReservationsGroupCreateResponse | null,
) => {
    if (!reservationsGroupCreateResponse) return null;

    const formattedData = {
        Reservations: reservationsGroupCreateResponse.Reservations?.map(
            (reservation) => ({
                Id: reservation.Id,
                GroupId: '00000000-0000-0000-0000-000000000000',
                CustomerId:
                    reservationsGroupCreateResponse.ReservationGroups?.[0]
                        ?.CustomerId || '',
            }),
        ),
    };
    return JSON.stringify(formattedData);
};

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const { setTheme, value: mode } = useThemeContext();
    const randomLastName = generateShortLastName();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [selectedEnterpriseId, selectEnterprise] = useState<string>(
        '8a51f050-8467-4e92-84d5-abc800c810b8',
    );
    const [ageCategories, setAgeCategories] = useState<AgeCategory[]>([]);
    const [selectedAgeCategoryId, setSelectedAgeCategoryId] = useState<
        string | null
    >(null);
    const [resourceCategories, setResourceCategories] = useState<
        ResourceCategory[]
    >([]);
    const [selectedResourceCategoryId, setSelectedResourceCategoryId] =
        useState<string | null>(null);
    const [rates, setRates] = useState<Rate[]>([]);

    const [enterprises, setEnterprises] = useState<PoorEnterprise[]>([
        { id: '8a51f050-8467-4e92-84d5-abc800c810b8', name: 'Bespin' },
        {
            id: 'dab943a7-7f00-4656-b383-ae5a01007136',
            name: 'Mews Guest Journey Hotel',
        },
        { id: '5565d322-2505-4450-8284-aca8016c4844', name: 'Chicago UTC' },
    ]);
    const addEnterprise = (enterprise: PoorEnterprise) => {
        setEnterprises([...enterprises, enterprise]);
    };
    const [selectedRateId, setSelectedRateId] = useState<string | null>(null);
    const [reservationDetails, setReservationDetails] =
        useState<ReservationsGroupCreateResponse | null>(null);
    const [inputData, setInputData] = useState({
        email: generateRandomEmail(randomLastName),
        lastName: randomLastName,
        startUtc: getTodaysDate(),
        endUtc: getEndDateFromStartDate(getTodaysDate()),
    });

    useEffect(() => {
        try {
            const configDataPromise =
                fetchEnterpriseConfiguration(selectedEnterpriseId);
            configDataPromise.then((configData) => {
                setConfigurationData(configData);
                setAgeCategories(configData.AgeCategories);

                if (
                    !selectedAgeCategoryId ||
                    !configData.AgeCategories.find(
                        (cat) => cat.Id === selectedAgeCategoryId,
                    )
                ) {
                    setSelectedAgeCategoryId(
                        configData.AgeCategories[0]?.Id || null,
                    );
                }

                if (configData?.BookingEngines?.[0]) {
                    const serviceId = configData?.BookingEngines?.[0].ServiceId;
                    const bookingEngineId = configData?.BookingEngines?.[0].Id;

                    const resourceCategoryPromise = fetchResourceCategories({
                        ServiceId: serviceId,
                    });
                    resourceCategoryPromise.then((resourceCategoryResponse) => {
                        setResourceCategories(
                            resourceCategoryResponse.ResourceCategories,
                        );
                        if (
                            resourceCategoryResponse.ResourceCategories.length >
                            0
                        ) {
                            setSelectedResourceCategoryId(
                                resourceCategoryResponse.ResourceCategories[0]
                                    .Id,
                            );

                            const timezone = configData?.Enterprises?.find(
                                (enterprise) =>
                                    enterprise.Id === selectedEnterpriseId,
                            )?.IanaTimeZoneIdentifier;

                            const startMoment = timezone
                                ? moment
                                      .tz(
                                          `${inputData.startUtc}T00:00:00`,
                                          timezone,
                                      )
                                      .toISOString()
                                : inputData.startUtc;
                            const endMoment = timezone
                                ? moment
                                      .tz(
                                          `${inputData.endUtc}T00:00:00`,
                                          timezone,
                                      )
                                      .toISOString()
                                : inputData.endUtc;

                            const ratePayload: RatePayload = {
                                EnterpriseId: selectedEnterpriseId,
                                ServiceId: serviceId,
                                BookingEngineId: bookingEngineId,
                                CategoryId:
                                    resourceCategoryResponse
                                        .ResourceCategories[0].Id,
                                AgeCategoryId: configData.AgeCategories[0].Id,
                                StartUtc: startMoment,
                                EndUtc: endMoment,
                            };
                            fetchRateIds(ratePayload).then((rateResponse) => {
                                setRates(rateResponse.Rates);
                                setSelectedRateId(rateResponse.Rates[0].Id);
                            });
                        }
                    });
                }
            });
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }, [
        inputData.endUtc,
        inputData.startUtc,
        selectedAgeCategoryId,
        selectedEnterpriseId,
    ]);

    const [configurationData, setConfigurationData] =
        useState<ConfigurationGetResponse | null>(null);

    const handleAgeCategoryIdChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedAgeCategoryId(event.target.value);
    };

    const handleRateIdChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedRateId(event.target.value);
    };

    const handleOnDateChange = (
        name: string,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newDate = event.target.value;
        if (name === 'startUtc') {
            setInputData({
                ...inputData,
                [name]: newDate,
                endUtc: getEndDateFromStartDate(newDate),
            });
        } else {
            setInputData({
                ...inputData,
                [name]: newDate,
            });
        }
    };
    const createReservation = async ({
        ageCategoryId,
        resourceCategoryId,
    }: CreateReservationOptions) => {
        setErrorMessage(null);
        setReservationDetails(null);
        setIsLoading(true);
        try {
            const selectedEnterprise = configurationData?.Enterprises?.find(
                (enterprise) => enterprise.Id === selectedEnterpriseId,
            );
            const selectedConfiguration =
                configurationData?.BookingEngines?.[0];

            const timezone = selectedEnterprise?.IanaTimeZoneIdentifier;

            if (!timezone || selectedConfiguration?.Id == null) {
                console.error('Timezone or configurationId is missing');
                setIsLoading(false);
                return;
            }

            const startMoment = moment.tz(
                `${inputData.startUtc}T00:00:00`,
                timezone,
            );
            const endMoment = moment.tz(
                `${inputData.endUtc}T00:00:00`,
                timezone,
            );

            const rateId =
                selectedRateId ||
                (rates.length > 0
                    ? rates[0].Id
                    : 'fd666d4c-1472-4a61-b490-aeda00cd7e3a');

            const reservation = createSingleReservation({
                Identifier: Math.random().toString(),
                StartUtc: startMoment.toISOString(),
                EndUtc: endMoment.toISOString(),
                OccupancyData: [
                    {
                        AgeCategoryId: ageCategoryId,
                        PersonCount: 1,
                    },
                ],
                ProductIds: [],
                RateId: rateId,
                RoomCategoryId: resourceCategoryId,
                Notes: null,
            });

            const newPayload: CreateReservationGroupPayload = {
                ConfigurationId: selectedConfiguration?.Id,
                CreditCardData: null, // TOOD maybe we donth have to use them
                Reservations: [reservation],
                Customer: {
                    Email: inputData.email,
                    LastName: inputData.lastName,
                },
                HotelId: selectedEnterpriseId,
            };

            const responseJson = await fetchCreateReservation(newPayload);
            if (!isSuccessfulReservationGroupResponse(responseJson)) {
                setErrorMessage(responseJson.Message);
                setIsLoading(false);
                return;
            }

            const enhancedReservations = responseJson.Reservations.map(
                (reservation) => ({
                    ...reservation,
                    LastName: inputData.lastName,
                }),
            );

            const enhancedReservationGroups =
                responseJson.ReservationGroups.map((group) => ({
                    ...group,
                }));

            const enhancedResponse = {
                ...responseJson,
                Reservations: enhancedReservations,
                ReservationGroups: enhancedReservationGroups,
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
        // setLastName(newLastName);
        setInputData((prevData) => ({
            ...prevData,
            email: generateRandomEmail(newLastName),
            lastName: newLastName,
        }));
    }

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
    const handleSelectEnterprise = async (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedAgeCategoryId(null);
        setSelectedResourceCategoryId(null);
        selectEnterprise(event.target.value);
    };

    const handleResourceCategoryIdChange = (
        event: ChangeEvent<HTMLSelectElement>,
    ) => {
        setSelectedResourceCategoryId(event.target.value);
    };

    return (
        <div className={clsx('App', { dark: mode === 'dark' })}>
            {isLoading && <LoaderComponent type="reservation" />}
            {selectedAgeCategoryId == null ||
            selectedResourceCategoryId == null ||
            selectedRateId == null ? (
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
                    <AddEnterprise addEnterprise={addEnterprise} />

                    <div className="center-content">
                        <CustomSelect
                            name="Enterprise"
                            values={enterprises.map(({ id, name }) => ({
                                value: id,
                                name: { [DEFAULT_LANGUAGE_CODE]: name },
                            }))}
                            selectedValue={selectedEnterpriseId}
                            onChange={handleSelectEnterprise}
                        />
                        <CustomSelect
                            name="Resource category"
                            values={resourceCategories.map(({ Id, Name }) => ({
                                value: Id,
                                name: Name,
                            }))}
                            selectedValue={selectedResourceCategoryId}
                            onChange={handleResourceCategoryIdChange}
                        />
                        <CustomSelect
                            name="Age Category"
                            values={ageCategories.map(({ Id, Name }) => ({
                                value: Id,
                                name: Name,
                            }))}
                            selectedValue={selectedAgeCategoryId}
                            onChange={handleAgeCategoryIdChange}
                        />
                        ¨
                        <CustomSelect
                            name="Rate"
                            values={rates.map(({ Id, Name }) => ({
                                value: Id,
                                name: Name,
                            }))}
                            selectedValue={selectedRateId}
                            onChange={handleRateIdChange}
                        />
                        <button
                            className="uniform-width"
                            onClick={handleLastNameClick}
                        >
                            Random
                        </button>
                        <CustomInput
                            name="LastName"
                            value={inputData.lastName}
                            onChange={(event) =>
                                handleOnDateChange('lastName', event)
                            }
                        />
                        <CustomInput
                            name="Email"
                            value={inputData.email}
                            onChange={(event) =>
                                handleOnDateChange('email', event)
                            }
                        />
                        <CustomInput
                            name="StartUtc"
                            value={inputData.startUtc}
                            onChange={(event) =>
                                handleOnDateChange('startUtc', event)
                            }
                        />
                        <CustomInput
                            name="EndUtc"
                            value={inputData.endUtc}
                            onChange={(event) =>
                                handleOnDateChange('endUtc', event)
                            }
                        />
                        <button
                            className="uniform-width"
                            onClick={() =>
                                createReservation({
                                    ageCategoryId: selectedAgeCategoryId,
                                    resourceCategoryId:
                                        selectedResourceCategoryId,
                                })
                            }
                        >
                            Create reservation
                        </button>
                    </div>
                    {errorMessage && (
                        <div
                            className={clsx('error-container', {
                                'dark-error': mode === 'dark',
                                'light-error': mode === 'light',
                            })}
                        >
                            <span className="error-icon">⚠️</span>{' '}
                            {/* You can replace with an actual error icon if you have one */}
                            {errorMessage}
                        </div>
                    )}
                    <div
                        style={{ fontSize: '20px', marginTop: '2rem' }}
                        className={
                            mode === 'dark'
                                ? 'dark-mode-label'
                                : 'light-mode-label'
                        }
                    >
                        {reservationDetails === null
                            ? 'No reservation fetched'
                            : renderReservations(reservationDetails)}
                    </div>
                    {jsonData && (
                        <div
                            className={isQRZoomed ? 'qr-zoomed-container' : ''}
                            onClick={() => setQRZoomed(!isQRZoomed)}
                        >
                            <div
                                className="qr-wrapper"
                                style={{
                                    transform: isQRZoomed
                                        ? 'scale(2.5)'
                                        : 'scale(1)',
                                    transition: 'transform 0.3s',
                                }}
                            >
                                <QRCode value={jsonData} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
