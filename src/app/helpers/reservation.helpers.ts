import { ReservationStatus } from "../models/reservation-status";

function getReservationStatusColor(status: ReservationStatus) {
    switch (status) {
        case ReservationStatus.ACTIVE:
            return [32, 87]

        case ReservationStatus.RESERVED:
            return [238, 66]

        case ReservationStatus.RETURNED:
            return [102, 40]

        default:
            return null;
    }
}

export { getReservationStatusColor }