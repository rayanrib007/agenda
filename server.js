require('dotenv').config();
const path = require('path')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const helmet = require('helmet');
const csrf = require('csurf');

mongoose.connect(process.env.CONNECTIONSTRING)
.then(()=>{
    console.log('conectado ao BD');
    app.emit('pronto');
})
.catch((e)=>{ console.log(e)});

const sessionOptions = session({
    secret: process.env.sessionSecret,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

// app.use(helmet());

app.use(sessionOptions);
app.use(flash());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(csrf());

// nosso proprio middleware
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);

app.use(routes);

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.on('pronto',()=>{
    app.listen(3000, ()=>{
        console.log('Acessar http://localhost:3000');
        console.log('servidor executando na porta 3000');
    })
})
