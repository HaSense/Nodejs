const express = require('express')
//DB설정 정보 가져오기
require('dotenv').config({path: 'mysql/.env'})

const mysql = require('./mysql')

const app = express();

app.listen(3000, () => {
    console.log("Server Started port 3000...")
});

app.get('/', function(req, res){
    res.send('Main Page')
});

app.get('/api/customers', async(req, res) => {
    const customers = await mysql.query('customerList');
    console.log(customers);
    res.send(customers);
});