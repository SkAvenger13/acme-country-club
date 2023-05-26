const Sequelize = require('sequelize');
const {STRING, UUID, UUIDV4} = Sequelize;
const db = new Sequelize(
    `postgres://localhost:5432/acme_country_club_db`,
    {logging: false}
);

const Member = db.define('member', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

const Facility = db.define('facility', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

const Booking = db.define('booking', {
    id: {
        type: UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    }
});

Member.belongsTo(Member, {as: 'sponsor'});
Member.hasMany(Member, {as: 'sponsee', foreignKey: 'sponsorId'});

Booking.belongsTo(Member, {as: 'booker'});
Member.hasMany(Booking, {foreignKey: 'bookerId'});

Booking.belongsTo(Facility);
Facility.hasMany(Booking, {foreignKey: 'facilityId'});

module.exports = {
    db,
    Member,
    Facility,
    Booking
};