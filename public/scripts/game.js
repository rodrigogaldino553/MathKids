var canvas = getElement('.canvas')
const level = getData('level')
var howManyCards = selectLevel()

//dados do jogador
var player = getData('name')
var timePast = getData('time')
var maxScore = getData('score')


var noSound = false
var song
var tokenNow;
var click = 0
var already = 0
//coisas da tela, como botao mute
var list1 = {}
var time = 0


getElement('#player').innerHTML = player
getElement('#max-score').innerHTML += `<a class="score">${formatScore(maxScore)}</a>`

function backgroundSong() {
    song = new Audio('./sound_effects/background_song.mp3')
    song.play()
    song.volume = 0.2

}
//backgroundSong()


function getElement(element) {
    return document.querySelector(element)
}

function getData(key) {
    return sessionStorage.getItem(key)
}

console.log(level)

function selectLevel() {
    if (level == 1) {
        return 20

    } else if (level <= 2) {
        return 36

        return 36

    }
}


function mute() {
    //vai trocar o text do botao de mudo dixando com um alto falante mudo ou nao alem de claro colocar no mudo

    var btnMute = getElement('#sound')
    var mode = btnMute.value

    if (mode == 'not') {
        //siginifica q ta mudo, aqui vamos desmutar
        //pausa a musica
        btnMute.innerHTML = `<a class="sound-bar">(</a>♪<a class="sound-bar"> )</a>`
        btnMute.setAttribute('value', 'playing')
        noSound = false

        song.play()

    } else {
        //siginifica q a musica ta tocando, aqui vamos pausa-la
        //tocar musica
        btnMute.innerHTML = `♪`
        btnMute.setAttribute('value', 'not')
        noSound = true

        song.pause()
    }
}

function notification(win) {
    if (!noSound) {
        var sound
        if (win) {
            sound = new Audio('/sound_effects/win.wav')
            //code to play win
        } else {
            sound = new Audio('/sound_effects/lose.wav')
            //code to play lose
        }
        sound.play()
    }
}

function changeScore() {
    let board = getElement('.score')

    board.innerHTML = formatScore(score)
}

function formatScore(score) {
    if (score < 0) {
        return score
    } else if (score < 10) {
        return `00${score}`
    } else if (score >= 10) {
        return `0${score}`
    }
    return 111

}

//********************* COISAS DO GAME *******************

var score = 0
changeScore()


//cada tipo de operacao vale uma pontuacao diferente, mais vale menos e divisao vale mais
var values = {}


function addElement(result, expression) {
    values[result] = expression
}


function restart() {
    score = 0
    click = 0
    canvas.innerHTML = ''
    //tryer()
    run()
}

function random(max) {
    return Math.floor(Math.random() * max + 1)
}

function expressionGenerator() {
    //Essa funcao gera uma expressao com dificulda baseada no nivel de dificuldade
    var num1 = random(10)
    var num2 = random(10)
    var result
    var signal

    var signals = ['+', '-', '*', '/']

    if (level == 1) {
        signal = signals[random(2) - 1]

    } else if (level == 2) {
        signal = signals[random(2)]

    } else if (level == 3) {
        signal = signals[random(2) + 1]

    } else {
        signal = signals[random(2) + 1]

    }

    if (num1 == 10 && num2 == 10) {
        num2 = 1
    }

    if (signal == "/") {
        num2 = 2

    }

    result = eval(`${num1}${signal}${num2}`)


    if (result < 0) {
        let num = num2
        num2 = num1
        num1 = num
        result = eval(`${num1}${signal}${num2}`)
    }


    return [num1, num2, result, signal]

}

function generateCard(expression, result) {
    //essa funcao retorna o  html de um par de cartas, uma das cartas possui a expressao e a outra o resultado
    console.log(expression, result)
    let covered = convertSignal(expression)
    let identifer = `${expression[0]}${result[0]}${expression[1]}${expression}`

    var cardExpression = `<button class="card" id="${identifer}1" value="${identifer}1" onclick="cardClick(value)">
                            <h3>${covered}</h3>
                          </button>`
    //a variavel acima gera a card com a expessao
    var cardResult = `<button class="card" id="${identifer}2" value="${identifer}2" onclick="cardClick(value)">
                        <h3>${result}</h3>
                      </button>`
    //a variavel acima gera a card com a resposta

    return [cardExpression, cardResult]
}

function drawCard(card) {
    //essa funcao desenha as cartas no canvas
    console.log(card)
    canvas.innerHTML += card //desenha a card da expressao
    //canvas.innerHTML += cards[1] //desenha a card da resposta
}

function endGame() {
    let win = new Audio('./sound_effects/level_win.wav')
    win.play()

    let hideContainer = getElement('#container')
    let hideBox = getElement('#box')

    hideContainer.classList.remove('hide')
    hideContainer.classList.add('ground')

    hideBox.classList.remove('hide')
    hideBox.classList.add('box')
}

function save() {
    //salvar as infos no bd

}

function notSave() {
    let hideContainer = getElement('#container')
    let hideBox = getElement('#box')

    hideContainer.classList.remove('ground')
    hideContainer.classList.add('hide')

    hideBox.classList.remove('box')
    hideBox.classList.add('hide')
}

let element1 = ''
let element2 = ''

function cardClick(token) {
    //let element = document.querySelector(`#${token}`)
    //alert(element)

    if (click >= 2) {
        click = 0
    }
    click++
    //(token)//.split(token[token.length -2]))
    //let element = document.getElementById(`${token}`)

    if (click == 1) {
        tokenNow = token

        element1 = document.getElementById(`${tokenNow}`)
        //element1.classList.remove('card')
        element1.disabled = true
        element1.classList.toggle('card-show')

    } else {
        element2 = document.getElementById(`${token}`)
        //element2.classList.remove('card')
        element2.disabled = true
        element2.classList.toggle('card-show')
        //setTimeout(() => {element2.classList.toggle('card-show')}, 2000)


        let part1 = tokenNow.slice(0, -1)
        let part2 = token.slice(0, -1)
        console.log(part1, part2)

        if (part1 == part2) {//&& tokenNow[-1] != token[-1]) {
            //alert('Are equals!')
            //element1.toggle('card-show')
            //element2.toggle('card-show')
            notification(true)
            already++
            score++
            click = 0
            element1.onclick = null
            element2.onclick = null
            changeScore()

            if (already >= (howManyCards / 2) + 1) {
                if (score > maxScore || time < timePast) {
                    setTimeout(() => { endGame() }, 2000)
                } else {
                    let win = new Audio('./sound_effects/level_win.wav')
                    win.play()

                    setTimeout(() => {alert('Fim de jogo! Você ganhou, parabéns!')}, 1000)
                }
                //endGame()
            }
            //uma coisa para tirar o id 
            //as duas cartas sao iguais
        }
        else {
            //alert('not equals!')
            activeButtons(true)
            setTimeout(function () {
                element1.classList.toggle('card-show');
                element2.classList.toggle('card-show'); activeButtons(false);
            }, 500)
            notification(false)
            click = 0
            score--
            changeScore()


            //as cartas nao sao iguais
        }
        click = 0
    }
}

function activeButtons(mode) {
    let buttons = document.querySelectorAll('.card')
    for (let c = 0; c < buttons.length; c++) {
        buttons[c].disabled = mode
    }
}

function showCard(card) {
    let element = document.getElementById(`${card}`)


    element.classList.remove('card')
    element.classList.add('card-show')
}

function convertSignal(value) {
    //console.log(value)
    let newValue = ''

    for (let c = 0; c < value.length; c++) {
        if (value[c] == '*') {
            newValue += 'x'
        } else if (value[c] == '/') {
            newValue += '÷'
        } else {
            newValue += value[c]
        }
    }

    //newValue = newValue.slice(9, newValue.length)
    console.log(newValue)
    return newValue
}

function objectLength(obj) {
    return Object.keys(obj).length
}

function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

function run() {
    //funcao q vai ficar rodando
    values = {}
    canvas.innerHTML = ""
    var cards = []


    while (objectLength(values) <= howManyCards / 2) {
        let expression = expressionGenerator()
        addElement(expression[2], expression[0] + expression[3] + expression[1])

    }

    console.log(values)
    //aqui vai entrar um if

    for (let i = 0; i <= howManyCards / 2; i++) {
        let card
        while (true) {
            let card1 = Object.values(values)[i]
            let card2 = Object.keys(values)[i]


            if (cards.indexOf(card1) < 0 || cards.indexOf(card2) < 0) {
                card = generateCard(card1, card2)
                break
            }
        }

        cards.push(card[0])
        cards.push(card[1])
    }

    let deck = shuffle(cards)
    //alert(deck.length)
    for (let c = 0; c < deck.length; c++) {
        drawCard(deck[c])
    }

}

function tryer() {
    let right = false
    try {
        run()
        right = true
    } catch (error) {
        //alert('DEU RUIM')
        values = {}
        right = false
    }

    while (!right) {
        tryer()
        break
    }
}

//tryer()
backgroundSong()
run()

