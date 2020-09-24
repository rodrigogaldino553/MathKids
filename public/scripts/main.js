var player;

function getElement(element) {
    return document.querySelector(element)
}

function newAccount() {
    let sign = getElement('#sign')
    let login = getElement('#login')

    login.classList.toggle('hide')
    sign.classList.remove('hide')
    sign.classList.add('box')
}

function enter() {
    if(true){
        // se o login for sucedido no bancode dados
        console.log('tudo ok!')

        var name = getElement('#name')
        player = name.value
        
        var loginDisplay = getElement('.login')
        var form = getElement('.box')
        var title = getElement('.title')
        
        loginDisplay.classList.remove('login')
        title.classList.remove('title')
        form.classList.remove('box')

        loginDisplay.classList.add('hide')
        title.classList.add('hide')
        form.classList.add('hide')
    }
}

function selectLevel() {
    var levelSelect = getElement('.hide-menu')

    levelSelect.classList.remove('hide-menu')
    levelSelect.classList.add('level')
}

function start(level) {
    console.log("inicio a funcao")
    sessionStorage.setItem('level', level)
    //sessionStorage.setItem('name', palyer)

    window.location.href = './game'

}

function message() {
    let url = location.search.slice(1)
    let name = url.split('=')[2]
    let messageCode = url.split('=')[1].split('&')[0]

    let messages = [`Erro! ${name.replace('%20', ' ')} ja existe!`, 'Conta criada com sucesso!', 'Ocorreu um erro, tente novamente']

    switch (messageCode) {
        case '1':
            alert(messages[0])
            break;

        case '2':
            alert(messages[1])
            break;
        case '3':
            alert(messages[2])
            break;
        default:
            enter()
            break;
    }
}

message()
