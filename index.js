const express = require('express');
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const conn = require('./db/conn')
const Tought = require('./models/Tought')
const User = require('./models/User')

const ToughtController = require('./controllers/ToughtController')
const toughtsRoutes = require('./routes/toughtsRoutes');
const authRoutes = require('./routes/authRoutes');

const { middlewareGlobal } = require('./middlewares/middlewares');

const app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        name: 'session',
        secret: 'secretCode',
        resave: { secure: false },
        saveUninitialized: false,
        store: new FileStore({
            logFn: () => { },
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
    flash(),
    express.static('public'),
)

app.use(middlewareGlobal)

app.use('/', authRoutes)
app.use('/', ToughtController.showToughts)

conn
    .sync(/* {force: true} */)
    .then(() => { app.listen(3000) })
    .catch((err) => { console.log(err) })