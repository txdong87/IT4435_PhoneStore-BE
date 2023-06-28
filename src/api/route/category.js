import express, { query, response } from 'express';
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
router.post('/add',(req,res) => {
    let category=req.body
    query=`INSERT INTO category (name) values (?)`;
    connection.query(query, (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    });
})
router.get('/get',(req,res)=>{
    var query=`select * from category order by name`;
    connection.query(query, (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    });
})
router.patch('/update',(req,res)=>{
    let product =req.body
    var query=`update category set name=? where id=?`;
    connection.query(query,[product.name,product.id], (err, results) => {
        if (!err){
            if(results.affectedRows==0){
                return callRes(res, responseError.OK, results);
            }
            return callRes(res, responseError.OK, results);
        } 
        else {return callRes(res, responseError.UNKNOWN_ERROR, null);}
    });
})

export { router };