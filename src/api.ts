interface ReservationResponse {
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
    Reservations: Array<ReservationResponse>;
}

interface FailedResponse {
    DebugDetails: string | null;
    Details: string | null;
    Message: string;
}

interface AuthOptions {
    Session: string;
    Client: string;
    CurrencyCode: string;
}

const authProps: AuthOptions = {
    Session: '09809905205405004804809705004805005104504805704504905008404805505804805705805304809032AC2453BCF3B25E69D103EF54026E4C',
    Client: 'Mews Distributor 1821.0.0',
    CurrencyCode: 'EUR',
};

const ENV_URL = 'https://gx.mews-develop.com';

const authCall = async <T>(endpoint: string, payload: T) => {
    const responseMeta = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ ...authProps, ...payload }),
    });

    if (!responseMeta.ok) {
        throw new Error(`API returned status code ${responseMeta.status}`);
    }

    try {
        return await responseMeta.json();
    } catch (error) {
        // If there's an error parsing the JSON, throw a more descriptive error
        throw new Error('Invalid JSON received.');
    }
};

interface CreditCardData {
    PaymentGatewayData: string | null;
    ObfuscatedCreditCardNumber:string | null;
}

interface OccupancyDataField {
    AgeCategoryId : string;
    PersonCount: number;
}
export interface ReservationRequest {
    Identifier: string;
    RoomCategoryId: string;
    StartUtc: string; //utc times
    EndUtc:string // utc
    OccupancyData: Array<OccupancyDataField>
    ProductIds: string[];
    RateId: string;
    Notes: null | string;
}

export interface CreateReservationGroupPayload {
    ConfigurationId: string;
    CreditCardData: CreditCardData | null;
    Customer: {
        Email: string;
        LastName: string;
    },
    HotelId: string;
    Reservations: Array<ReservationRequest>;
    PromotedServiceReservations?: Array<unknown>;
}

export const isSuccessfulReservationGroupResponse = (response: ReservationsGroupCreateResponse | FailedResponse): response is ReservationsGroupCreateResponse => {
    return 'Reservations' in response;
};

export const fetchCreateReservation = async (payload: CreateReservationGroupPayload): Promise<ReservationsGroupCreateResponse | FailedResponse> => {
    return authCall(`${ENV_URL}/api/bookingEngine/v1/reservationGroups/create`, payload);
};

export const createSingleReservation = (res: ReservationRequest) => {
    return res;
};

interface ConfigurationOption {
    Ids: string[];
    PrimaryId: string;
}

interface Enterprise {
    Id: string;
    IanaTimeZoneIdentifier: string;
}
interface BookingEngine {
    Id: string;
    ServiceId: string;
}
export interface AgeCategory {
    Id: string;
    ServiceId: string;
    Classification: 'Adult' | 'Child';
    IsDefault: boolean;
    Name: Record<string, string>
}

export interface ConfigurationGetResponse {
    Enterprises: Enterprise[];
    BookingEngines: BookingEngine[];
    AgeCategories: AgeCategory[];
}

export const fetchConfiguration = async (payload: ConfigurationOption): Promise<ConfigurationGetResponse> => {
    return authCall(`${ENV_URL}/api/bookingEngine/v1/configurations/get`, payload);
};

export const fetchEnterpriseConfiguration = async (entepriseId: string) => {
    return fetchConfiguration({ Ids:[entepriseId], PrimaryId: entepriseId });
};

export interface ResourceCategoryPayload {
    ServiceId: string;
}

export interface ResourceCategory {
    Id: string;
    Name: Record<string, string>;
    ServiceId: string;
}

interface ResourceCategoryResponse {
    ResourceCategories: Array<ResourceCategory>;
}

export const fetchResourceCategories = async (payload: ResourceCategoryPayload): Promise<ResourceCategoryResponse> => {
    return authCall(`${ENV_URL}/api/bookingEngine/v1/resourceCategories/getAll`, payload);
};

export interface RatePayload {
    EnterpriseId: string;
    ServiceId: string;
    BookingEngineId: string;
    CategoryId: string;
    AgeCategoryId: string;
    StartUtc: string;
    EndUtc: string;
}

export interface Rate {
    Id: string;
    Name: Record<string, string>;
}

interface RateResponse {
    Rates: Array<Rate>;
}

export const fetchRateIds = async (payload: RatePayload): Promise<RateResponse> => {
    return authCall(`${ENV_URL}/api/bookingEngine/v1/services/getPricing`, payload);
};
