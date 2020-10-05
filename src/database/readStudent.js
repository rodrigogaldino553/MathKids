const database = require('./db')

var allStudents

database.then(async(db) => {
    allStudents = await db.all("SELECT * FROM students")
    return allStudents
})

