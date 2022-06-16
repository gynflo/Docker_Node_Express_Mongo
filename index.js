const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');
const port = process.env.PORT || 3000;

const postRouter = require('./routes/post.routes');

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
const connectAndRetry = () => {
   
     mongoose
        .connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Successfully connected to DB'))
        .catch((e) => {
            console.log(e);
            setTimeout(connectAndRetry, 5000)
        }); 
}

connectAndRetry();



app.get('/', (_, res) => {
    res.send('Everything is ok !!!');
});

app.use(express.json())
app.use('/api/v1/posts', postRouter);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});