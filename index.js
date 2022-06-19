const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET, REDIS_PORT, REDIS_URL } = require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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



app.get('/api/v1/', (_, res) => {
    res.send('Everything is ok !!!');
    console.log('Yeah it ok ');

});

/* to expose information provided by the reverse proxy */
app.enable("trust proxy");
/* Cors policy */
app.use(cors({}))

/* Cache store */
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30000, //milliseconds  => 3 0s
    }
}))

// Add body on req 
app.use(express.json());
//middleware req.session.user => req.user
const protect = require('./middlewares/authMiddleware');
app.use('/api/v1/posts', protect, postRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});