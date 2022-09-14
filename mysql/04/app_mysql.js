const express = require('express')
//DB설정 정보 가져오기
require('dotenv').config({path: 'mysql/.env'})

const mysql = require('./mysql')
const ejs = require('ejs')
const app = express();

/* 환경설정 */
//뷰엔진 설정
app.set('view engine', 'ejs')

//var bodyParser = require('body-parser'); //예전방식 지금은 express.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false }) //예전방식 지금은 express.urlencoded
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({extended: true})); 

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

app.get('/api/customersList', async(req, res) => {
    const customers = await mysql.query('customerList');
    console.log(customers);

    var html = `
        <table border="1">
            <tr>
                <td>아이디</td>
                <td>${customers[0].id}</td>
            </tr>
            <tr>
                <td>이름</td>
                <td>${customers[0].name}</td>
            </tr>
            <tr>
                <td>전화번호</td>
                <td>${customers[0].phone}</td>
            </tr>
        </table>`;
    //res.send(customers);
    res.send(html);
});

app.post('/api/customer/insert', async(req, res) => {
    //삽입 기능
    
    //res.send(result);
    obj = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    }
    console.log(obj)
    req.body.param = obj
    //var param = JSON.stringify(obj); //console로 찍어보면 json타입이라 사용할 이유가 없음
    // console.log(param.id);
    // console.log(param.name);
    // console.log(param.email);
    // console.log(param.phone);
    // console.log(param.address);
    const result = await mysql.query('customerInsert', req.body.param);
    res.send('처리되었습니다.');
});
app.get('/api/customer/insert_view', async(req, res) => {
    res.render('test1');
});

