const dotenv = require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 3001;
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const route = require('./routes');
const db = require('./config/db');
const cookieParser = require('cookie-parser');

//connect to db
db.connect();

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    }),
);

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//http logger
app.use(morgan('combined'));

//template engine
const { engine } = require('express-handlebars');
app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//console.log(path.join(__dirname, 'resources\\views'))

//Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
