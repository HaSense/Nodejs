var express = require('express');  
var app = express();  

app.set('view engine', 'ejs');  //html template을 ejs로 사용하겠습니다.
app.set('views', './views');    //views 폴더를 ./views로 지정하겠습니다.

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('free_board');
})

app.get('/result',(req, res) => {
    res.render('free_board_result', {
        name: req.query.name,
        title: req.query.title,
        content: req.query.content
    });
    console.log(name)
});



var server = app.listen(5000, function () {  
    var host = server.address().address  
    var port = server.address().port  
    console.log("서버 시작 http://%s:%s", host, port)  
});