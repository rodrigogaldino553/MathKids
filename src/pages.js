const database = require('./database/db')

function pageLandig(req, res){
    return res.render("index.html")

}

function pageGame(req, res){
    return res.render("game.html")
}

async function saveUser(req, res){
    const createStudent = require('./database/createStudent')
console.log(`Nome:${req.body.name}\nSenha:${req.body.password}`)
    const StudentValue = {
        name: req.body.name,
        password: req.body.password,
        score: 0,
        time: 0
    }

    try {
        const db = await database
        await createStudent(db, StudentValue)
        console.log('Cadastrado com sucesso!')

        return res.redirect("/")
    } catch (error) {
        console.log('Ocorreu um erro, tente novamente')
        return res.redirect("/")
    }
}

module.exports = {pageLandig, pageGame, saveUser}