require('dotenv').config();
let port = process.env.PORT;
const express = require('express');
const app = express();
const helmet = require('helmet');
app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit: '50mb'}));
//CORS
app.use(helmet());
app.use(async(req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header("Content-Security-Policy", "default-src 'self'");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, EncryptResponse');
    next();

    app.options('*', () => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.header('Access-Control-Max-Age', 120);
        res.send();
    });
});


app.use(require('./src/routes/routes.js'));

app.listen(process.env.PORT || 8081, () => {
    console.log('Server Port', process.env.PORT || 8081);
});