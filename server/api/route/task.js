import express, { response } from 'express';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import responseError from '../response/response.js';
import { callRes } from '../response/response.js';

// Import database connection
import connection from '../../db/connect.js';

const router = express.Router();

const JWT_SECRET = '';
router.get('/get_list_task', (req, res) => {
    const token = req.body.token;
    if (!token) return callRes(res, responseError.PARAMETER_VALUE_IS_INVALID, null);

    // truy vấn cơ sở dữ liệu
    connection.query(`SELECT * FROM tasks LIMIT `, (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        const tasks = results.map(task => ({ room_id: room.room_id, room_name: room.room_name, players: room.players }));
        let data = { rooms: rooms };
        return callRes(res, responseError.OK, data);
    });
});