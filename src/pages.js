const database = require('./database/db')

function pageLandig(req, res) {
    return res.render("index.html")

}

function pageGame(req, res) {
    return res.render("game.html")
}

async function saveUser(req, res) {
    const createStudent = require('./database/createStudent')
    var name = req.body.name
    var password = req.body.name

    var students
    database.then(async (db) => {
        students = await db.all("SELECT * FROM students")
        //console.log(students)
        //console.log(students[6].name)

        for(let i = 0; i < students.length; i++){
            if(students[i].name === name){
                return res.redirect("/"+'?message='+1+'&name='+name)
                
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
            
            return res.redirect("/"+'?message='+2+'&name='+name)
        } catch (error) {
            return res.redirect("/"+'?message='+3+'&name='+name)
        }
       
    })
   
}

module.exports = { pageLandig, pageGame, saveUser }