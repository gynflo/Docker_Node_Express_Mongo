const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET, REDIS_PORT, REDIS_URL } = require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
const { createClient } = require('redis');
let RedisStore = require('connect-redis')(session);
let redisClient = createClient({
    host: REDIS_URL,
    port: REDIS_PORT
});







const app = express();

const port = process.env.PORT || 3000;

/* routes */
const postRouter = require('./routes/post.routes');
const userRouter = require('./routes/user.routes');


/* Connection Database */
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

/* Cache store */
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        httpOnly: true,
        maxAge: 30000, //milliseconds 
    }
}))

// Add body on req 
app.use(express.json());

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});