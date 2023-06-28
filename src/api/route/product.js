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
    let product=req.body
    query=`INSERT INTO product (name,categoryId,description,price,status) values (?,?,?,?,'true')`;
    connection.query(query,[product.name,product.categoryId,product.description,product.price], (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    });
})
router.get('/get',(req,res)=>{
    var query =`select p.id,p.name,p.description,p.image,p.price,p.status,c.name as categoryName from product as p INNER JOIN category as c where p.categoryId=c.id`;
    connection.query(query, (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    });
})
router.get('/getByCategory/:id',(req,res)=>{
    const id=req.params.id;
    var query =`select id,name from product where categoryId=? and status ='true'`;
     connection.query(query,[id], (err, results) => {
        console.log(results)
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    });
})
router.get('/getById/:id',(req,res,next)=>{
    const id =req.params.id;
    var query =`select id,name,description,image,price from product where id=?`
    connection.query(query,[id], (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    });
})
router.patch('/update',(req,res)=>{
    let product=req.body;
    var query =`update product set name=?,categoryId=?,description=?,price=? where id=?`
    connection.query(query,[product.name,product.categoryId,product.description,product.image,product.price], (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    });
})
router.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    var query =`delete  from product where id=?`;
     connection.query(query,[id], (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    });
})
router.patch('/updateStatus',(req,res)=>{
    let user=req.body;
    var query='update product set status=? where id=?';
    connection.query(query,[user.status,user.id], (err, results) => {
        if (err) return callRes(res, responseError.UNKNOWN_ERROR, null);
        return callRes(res, responseError.OK, results);
    });
})
export { router };