

function pageLandig(req, res){
    return res.render("index.html")

}

function pageGame(req, res){
    return res.render("game.html")
}

module.exports = {pageLandig, pageGame}