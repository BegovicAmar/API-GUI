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

export interface reservationsGroupCreateResponse {
    ReservationGroups: Array<ReservationGroup>;
    Reservations: Array<Reservation>;
}

export const fetchCreateReservation = async (payload: any): Promise<reservationsGroupCreateResponse> => {
    const reposnseMeta = await fetch('https://gx.mews-develop.com/api/bookingEngine/v1/reservationGroups/create', {
        method: 'POST',
        body: JSON.stringify(payload)
    },);
    return await reposnseMeta.json();
};
