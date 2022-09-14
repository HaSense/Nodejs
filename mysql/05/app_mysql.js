const express = require('express')
//DB설정 정보 가져오기
require('dotenv').config({path: 'mysql/.env'})

const mysql = require('./mysql')
const ejs = require('ejs')
const methodOverride = require('method-override')

const app = express();

/* 환경설정 */
//뷰엔진 설정
app.set('view engine', 'ejs')

//var bodyParser = require('body-parser'); //예전방식 지금은 express.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false }) //예전방식 지금은 express.urlencoded
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({extended: true})); 

/* 메소드 오버라이드
   사용법 
   <form action="/api/<%= post._id %>?_method="PUT" method="POST">
   </form>
*/
app.use(methodOverride('_method'))

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
        </table>`;
    //res.send(customers);
    res.send(html);
});

app.post('/api/customer/insert', async(req, res) => {
    //삽입 기능
    obj = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    }
    console.log(obj)
    req.body.param = obj
    
    const result = await mysql.query('customerInsert', req.body.param);
    res.send('처리되었습니다.');
});

app.get('/api/customer/list_view', async(req, res) => {

 const customers = await mysql.query('customerList');
 console.log(customers);
 
 res.render('customers_list', {customers: customers});

});

//ejs 객체 기초 테스트-1
app.get('/ejs_test1', (req, res) => {
    const data = {
        title: '제목입니다.',
        message: '메시지 입니다.'
    };
    res.render('test', data);
    console.log(data);
});
//ejs 객체 기초 테스트-1
app.get('/ejs_test2', (req, res) => {
    const obj = [
        {
            title: '제목 1 입니다.',
            message: '메시지 1 입니다.'
        },
        {
            title: '제목 2 입니다.',
            message: '메시지 2 입니다.'
        },
    ];
    console.log(obj);
    //{전달될 데이터의 이름: 전달할 객체} --> 
    res.render('test2', {data: obj});
});
