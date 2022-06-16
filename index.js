const express = require('express');
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (_, res) => {
    res.send('Everything is ok !!!');
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});