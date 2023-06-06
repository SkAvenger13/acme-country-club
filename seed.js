const {db, Member, Facility, Booking} = require('./api/db');

const syncAndSeed = async () => {
    try {
        await db.sync({force: true});

        const [moe, lucy, ethyl, larry] = await Promise.all([
            Member.create({name: 'moe'}),
            Member.create({name: 'lucy'}),
            Member.create({name: 'ethyl'}),
            Member.create({name: 'larry'})
        ]);

        const [tennis, pingPong, marbles] = await Promise.all([
            Facility.create({name: 'tennis'}),
            Facility.create({name: 'ping pong'}),
            Facility.create({name: 'marbles'})
        ]);

        moe.sponsorId = lucy.id;
        larry.sponsorId = lucy.id;
        ethyl.sponsorId = moe.id;

        await Promise.all([
            moe.save(),
            lucy.save(),
            ethyl.save(),
            larry.save()
        ]);

        await Promise.all([
            Booking.create({
                bookerId: lucy.id,
                facilityId: marbles.id
            }),
            Booking.create({
                bookerId: lucy.id,
                facilityId: marbles.id
            }),
            Booking.create({
                bookerId: moe.id,
                facilityId: tennis.id
            })
        ]);

        db.close();

    } catch (error) {
        console.log(error);
        db.close();
    }


};

module.exports = syncAndSeed;