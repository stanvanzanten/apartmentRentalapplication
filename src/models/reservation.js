const ReservationModel = (sequelize, Sequelize) => {
    const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize
    const Reservation = sequelize.define('Reservation', {
        ReservationId: { type: INTEGER, primaryKey: true, autoIncrement: true, unique: true },
        ApartmentId: { type: INTEGER, allowNull: false },
        StartDate: { type: DATE, allowNull: false },
        EndDate: { type: DATE, allowNull: false },
        Status: { type: STRING, allowNull: false },
        UserId: {type: INTEGER, allowNull: false}
    })
    return Reservation
}
module.exports = ReservationModel