const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const app = express();

mongoose
    .connect("mongodb://gynflo:mypassword@mongo:27017/?authSource=admin")
    .then(() => console.log('Successfully connected to DB'))
    .catch((e) => console.log(e));


app.get('/', (_, res) => {
    res.send('Everything is ok !!!');
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});