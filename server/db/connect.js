import mysql from 'mysql2';
import responseError from '../api/response/response.js';
import {callRes} from '../api/response/response.js';

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'dong2605',
   port:'3306',
   database:'api'
});

connection.connect(error => {
    if (error) {
        console.log('Cannot connect to database:', error);
        return callRes(responseError.CAN_NOT_CONNECT_TO_DB,null);
    }
    console.log('Connected to database.');
});

export default connection;