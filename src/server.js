const express = require('express')
const server = express()


const {
    pageLandig,
    pageGame
} = require('./pages')
console.log('hello world!')

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
.listen(5500)
/*agora e so configurar o servidor 
para rodar a aplicacao e so dar 
    npm run dev*/