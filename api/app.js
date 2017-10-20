var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express')
var appRoutes = require('./routes/app');
var messageRoutes = require('./routes/messages');
var userRoutes = require('./routes/user');
var mongoose = require('mongoose');

var app = express();

var port = process.env.PORT || 3000
var connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost/node-angular';

mongoose.Promise = global.Promise;
mongoose.connect(connectionString, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    
    if(req.method === 'OPTIONS') {
        return res.send(200);
    }
    
    next();
});


app.use('/message', messageRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});