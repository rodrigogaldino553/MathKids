const database = require('sqlite-async')


function execute(db){
    return db.exec(`
        CREATE TABLE IF NOT EXISTS students(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            password TEXT,
            serie INTEGER,
            score INTEGER,
            time TEXT,
            date TEXT
        );
    `)
}

module.exports = database.open(__dirname+'/database.sqlite').then(execute)

