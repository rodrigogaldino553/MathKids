const database = require('./database/db')

function pageLandig(req, res){
    return res.render("index.html")

}

function pageGame(req, res){
    return res.render("game.html")
}

function pageSignIn(req, res){
    return res.render("sign-in.html")
}
module.exports = {pageLandig, pageGame, pageSignIn}