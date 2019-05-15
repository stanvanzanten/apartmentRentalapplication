const UserModel = (sequelize, Sequelize) => {
    const { INTEGER, STRING, FLOAT, BOOLEAN, DATE } = Sequelize
    const User = sequelize.define('User', {
        UserId: { type: INTEGER, primaryKey: true, autoIncrement: true },
        FirstName: { type: STRING, allowNull: false },
        LastName: { type: STRING, allowNull: false },
        StreetAddress: { type: STRING, allowNull: false },
        PostalCode: { type: STRING, allowNull: false },
        City: { type: STRING, allowNull: false },
        DateOfBirth: { type: DATE, allowNull: false},  
        PhoneNumber: { type: STRING, allowNull: false },
        EmailAddress: { type: STRING, allowNull: false },
        Password: { type: STRING, allowNull: false },
    })
    return User
}
module.exports = UserModel