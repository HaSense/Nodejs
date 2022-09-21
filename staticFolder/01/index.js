var express = require('express');  
var app = express();  

app.use(express.static('public'));  //파일을 넣을 수 있습니다.  
app.use('/static', express.static('public'));  
  
/* 환경설정 */
//뷰엔진 설정
app.set('view engine', 'ejs')
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({extended: true})); 

app.get('/', function(req, res){
    res.render('index')
});

app.get('/imgtest',function(req, res){
    res.send(`
        <html>
            <body>
                <img src="http://localhost:3000/static/img/sejung.png"><p></p>
                <img src="static/img/sejung.png"><p></p>
            </body>
        </html>
    `)
});

app.get('/bootstrap_test',function(req, res){
    res.render('bootstrap_test');
});

var server = app.listen(3000, function () {  
  console.log("서버실행됨 포트 3000...");    
})  