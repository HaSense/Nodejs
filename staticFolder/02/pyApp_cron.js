const cron = require('node-cron')
const {spawn} = require('child_process');

cron.schedule('* * * * *', () => {
    console.log('1분마다 작업이 실행됩니다.');
    spawn('python', ['pyApp02.py']);
})