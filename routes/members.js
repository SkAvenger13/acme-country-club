const memberRouter = require('express').Router();
const Member = require('../api/db');

memberRouter.get('/members', async (req, res, next) => {
    try {
        const memberList = await Member.findAll();
        console.log(memberList);
        res.json(memberList);
    } catch (error) {
        next(error);
    }
});