interface Reservation {
    EndUtc: string;
    StartUtc: string;
    Number: string;
    Id: string;
    ServiceTimeUnitPeriod: string;
    LastName: string;
}

export interface ReservationsGroupCreateResponseType {
    Reservations: Array<Reservation>
}

export const fetchCreateReservation = async (payload: any): Promise<ReservationsGroupCreateResponseType> => {
    const reposnseMeta = await fetch("https://gx.mews-develop.com/api/bookingEngine/v1/reservationGroups/create",{ method:"POST", body: JSON.stringify(payload)}, )
    return await reposnseMeta.json();
}
