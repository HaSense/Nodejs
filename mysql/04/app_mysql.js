const express = require('express')
//DB설정 정보 가져오기
require('dotenv').config({path: 'mysql/.env'})

const mysql = require('./mysql')

const ejs = require('ejs')

const app = express();
/* 환경설정 */
//뷰엔진 설정
app.set('view engine', 'ejs')

app.use(express.json({
    limit: '50mb'
}))


app.listen(3000, () => {
    console.log("Server Started port 3000...")
});

app.get('/', function(req, res){
    res.send('Main Page')
});
app.get('/ejs', function(req,res){
    res.render('test1')
});

app.get('/api/customers', async(req, res) => {
    const customers = await mysql.query('customerList');
    console.log(customers);
    res.send(customers);
});

app.post('/api/customer/insert', async(req, res) => {
    //삽입 기능
    const result = await mysql.query('customerInsert', req.body.param);
    res.send(result);
});