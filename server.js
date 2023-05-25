const express = require('express');
const server = express();
const PORT = 8000;

server.use(express.json());

server.get('/', (req, res) => {
    res.json({server: 'working'});
});

server.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`);
});