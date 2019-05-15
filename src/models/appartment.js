var postalCodes = require('postal-codes-js');
const AppartmentModel = (sequelize, Sequelize) => {
    const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize
    const Appartment = sequelize.define('Appartment', {
        ApartmentId: { type: INTEGER, primaryKey: true, autoIncrement: true, unique: true },
        Description: { type: STRING, allowNull: false },
        StreetAddress: { type: STRING, allowNull: false },
        Postalcode: { type: STRING, allowNull: false, validator: postalCodes.validate('nl', Postalcode) },
        City: { type: STRING, allowNull: false },
        UserId: {type: INTEGER, allowNull: false},
    })
    return Appartment
}
module.exports = AppartmentModel