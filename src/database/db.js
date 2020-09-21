const database = require('sqlite-async')


function execute(db){
    return db.exec(`
        CREATE TABLE IF NOT EXISTS students(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            score INTEGER,
            time INTEGER
        );
    `)
}

module.exports = database.open(__dirname+'/database.sqlite').then(execute)

