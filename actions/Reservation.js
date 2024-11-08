import Reservation from '../models/Reservation.js';


//get one reservation
async function getReservationMongo(filters){
    const reservationFiltered = await Reservation.findOne(filters);
    return reservationFiltered
}

//get many reservations
async function getReservationsMongo(filters){
    const Reservationsquantity = await Reservation.countDocuments(filters);
    const reservationsFiltered = await Reservation.find(filters);

    return {
        results: reservationsFiltered,
        // paginaMax: Reservationsquantity / 20,
        Reservationsquantity : Reservationsquantity
    }; 
}

async function createReservationMongo(data) {
    const reservationCreado = await Reservation.create(data);

    return reservationCreado;
}

async function updateReservationMongo(id, changes) {
    const resultado = await Reservation.findByIdAndUpdate(id, changes);
    return resultado
}

async function deleteReservationMongo(id) {
    const resultado = await Reservation.findByIdAndUpdate(id, {disabled:true});
    return resultado;
}

module.exports = {
    getReservationMongo,
    createReservationMongo,
    getReservationsMongo,
    updateReservationMongo,
    deleteReservationMongo,
};

