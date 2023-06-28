import express, { query, response } from 'express';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import responseError from '../response/response.js';
import { callRes } from '../response/response.js';
var uuid=require('uuid')
// Import database connection
import connection from '../../db/connect.js';

const router = express.Router();

const JWT_SECRET = '';
router.post('/generateReport',(req,res)=>{
    
})