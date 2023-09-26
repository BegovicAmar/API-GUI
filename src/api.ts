interface Reservation {
    EndUtc: string;
    StartUtc: string;
    Number: string;
    Id: string;
    ServiceTimeUnitPeriod: string;
    LastName: string;
}

interface ReservationGroup {
    Id: string;
    CustomerId: string;
}

export interface ReservationsGroupCreateResponse {
    ReservationGroups: Array<ReservationGroup>;
    Reservations: Array<Reservation>;
}

interface AuthOptions {
    Session: string;
    Client: string;
}

const authProps: AuthOptions = {
    Session: '09809905205405004804809705004805005104504805704504905008404805505804805705805304809032AC2453BCF3B25E69D103EF54026E4C',
    Client: 'Mews Distributor 1821.0.0'
};

const ENV_URL = 'https://gx.mews-develop.com';

const authCall = async <T>(endpoint: string, payload: T) => {
    const reposnseMeta = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({...authProps, ...payload})
    },);
    return await reposnseMeta.json();
};

export const fetchCreateReservation = async (payload: any): Promise<ReservationsGroupCreateResponse> => {
    return authCall(`${ENV_URL}/api/bookingEngine/v1/reservationGroups/create`, payload);
};

interface ConfigurationOption {
    Ids: string[];
    PrimaryId: string;
}

interface Enterprise {
    Id: string;
    IanaTimeZoneIdentifier: string;
}
export interface ConfigurationGetResponse {
    Enterprises: Enterprise[];
}

export const fetchConfiguration = async (payload: ConfigurationOption): Promise<ConfigurationGetResponse> => {
    return authCall(`${ENV_URL}/api/bookingEngine/v1/configurations/get`, payload);
};


export const fetchEnterpriseConfiguration = async (entepriseId: string) => {
    return fetchConfiguration({Ids:[entepriseId], PrimaryId: entepriseId});
};
