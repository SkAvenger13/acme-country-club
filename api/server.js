const express = require('express');
const server = express();
const PORT = 8000;
const syncAndSeed = require('../seed');
const {Member, Facility, Booking} = require('./db');

syncAndSeed();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({server: 'working'});
});

server.get('/api/facilities', async (req, res) => {
    try {
        const facilities = await Facility.findAll({
            attributes: ['name'],
        });
        res.json(facilities);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'not working'});
    }
});

server.get('/api/bookings', async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            attributes: ['createdAt'],
            include: [{
                model: Member,
                as: 'booker',
                attributes: ['name']
            },
            {
                model: Facility,
                attributes: ['name']
            }]
        });
        res.json(bookings);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'not working'});
    }
});

server.get('/api/members', async (req, res) => {
    try {
        const members = await Member.findAll({
            attributes: ['name'],
            include: [{
                model: Member,
                as: 'sponsor',
                attributes: ['name']
            },
            {
                model: Member,
                as: 'sponsee',
                attributes: ['name']
            }],
        });
        res.json(members);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'not working'});
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`);
});