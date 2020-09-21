const database = require('./db')

const createStudent = require('./createStudent')

database.then(async(db) => {
    StudentValue = {
        name:'Kleitu',
        score:0,
        time:'65'
    }

    await createStudent(db, StudentValue)

    const sellectedStudents = await db.all("SELECT * FROM students")
    console.log(sellectedStudents)
})