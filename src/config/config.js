const { Pool } = require('pg');

let pool;

if (process.env.NODE_ENV == "production") {

    let connectionString = process.env.CONNECTION_STRING;
    pool = new Pool({
        connectionString
    });

} else {

    pool = new Pool({
        host: process.env.HOST || 'localhost',
        user: process.env.USER || 'postgres',
        password: process.env.PASSWORD || '1234',
        database: process.env.DATABASE || 'productos',
        port: process.env.DB_PORT || '5432'
    });
}


pool.connect((err, res) => {
    if (err) {
        console.log('Error conexion BD')
        console.log(err);
    } else {
        console.log('base conectada')
    }
})
module.exports = pool;