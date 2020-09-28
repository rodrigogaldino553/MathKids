const express = require('express')
const server = express()


const {
    pageLandig,
    pageGame,
    pageRank,
    login,
    saveUser,
    updateScore
} = require('./pages')
console.log('working...')

const nunjucks = require('nunjucks')
nunjucks.configure('public/views', {
    express:server,
    noCache:true
})

server
.use(express.urlencoded({extended:true}))
.use(express.static('public'))


.get("/", pageLandig)
.get("/game", pageGame)
.get("/ranking", pageRank)
.post("/login", login)
.post("/save-user", saveUser)
.post("/update-score", updateScore)
.listen(5500)
/*agora e so configurar o servidor 
para rodar a aplicacao e so dar 
    npm run dev*/