const fs = require('fs');
function log(action, id) {
    fs.readFile('./stats.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('Ошибка чтения файла stats.json', error);
            return;
        }
        const actList = JSON.parse(data);
        const act = {
            action,
            id,
            time: (new Date()).toISOString()
        };
        actList.push(act);
        fs.writeFile('./stats.json', JSON.stringify(actList), (error) => {
            if (error) {
                console.log('Ошибка записи файла stats.json', error);
                res.status(500).send('Server error');
                return;
            }
        })
    })
}
module.exports = log;
