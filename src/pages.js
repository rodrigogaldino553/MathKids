const cons = require('consolidate')
const database = require('./database/db')

function pageLandig(req, res) {
    return res.render("index.html")

}

function pageGame(req, res) {
    return res.render("game.html")
}

async function login(req, res) {
    var name = req.body.name
    var password = req.body.password

    database.then(async (db) => {
        var students = await db.all("SELECT * FROM students")

        for (let i = 0; i < students.length; i++) {
            if (students[i].name == name && students[i].password === password) {
                let score = students[i].score
                let time = students[i].time
                return res.redirect("/" + `?enter=true&&score=${score}&&time=${time}`)
            }
        }
        return res.redirect("/" + '?enter=false')
    })
}

async function saveUser(req, res) {
    const createStudent = require('./database/createStudent')
    var name = req.body.name
    var password = req.body.password

    var students
    database.then(async (db) => {
        students = await db.all("SELECT * FROM students")


        for (let i = 0; i < students.length; i++) {
            if (students[i].name === name) {
                return res.redirect("/" + '?message=' + 1 + '&name=' + name)

            }
        }

        const StudentValue = {
            name: name,
            password: password,
            score: 0,
            time: 0
        }

        try {
            const db = await database
            await createStudent(db, StudentValue)

            return res.redirect("/" + '?message=' + 2 + '&name=' + name)
        } catch (error) {
            return res.redirect("/" + '?message=' + 3 + '&name=' + name)
        }

    })

}

module.exports = { pageLandig, pageGame, login, saveUser }