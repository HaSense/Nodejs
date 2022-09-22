var express = require('express');  
var app = express();  

app.use(express.static('public'));  //public 가상폴더를 지정합니다.  
app.use('/static', express.static('public'));  //직접경로 public폴더를 static 이름으로 치환합니다.  
/* 환경설정 */
//뷰엔진 설정
app.set('view engine', 'ejs')
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({extended: true})); 

app.get('/', function(req, res){    
    res.send('Main Page')
});
app.get('/index1', function(req, res){
    // js, css 폴더를 /public/ 폴더 아래에 직접 복사 한 후 설정한 파일입니다.
    res.render('index_local')
});
app.get('/index2', function(req, res){
    // CDN을 적용시킨 파일입니다.
    res.render('index_cdn')
});

var server = app.listen(3000, function () {  
  console.log("서버실행됨 포트 3000...");    
})  