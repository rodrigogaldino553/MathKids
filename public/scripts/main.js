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

function keepData(key, value) {
    sessionStorage.setItem(key, value)
}

function enter() {
    if (true) {
        // se o login for sucedido no bancode dados
        let url = location.search.slice(1)
        url = url.split('&')

        for (let i = 1; i < url.length; i++) {
            keepData(url[i].split('=')[0], url[i].split('=')[1])
        }

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

var checkbox = getElement("#show-password")
checkbox.addEventListener("change", (el) => {
    let passwordField = getElement('#password-field')
    
    if(checkbox.checked){
        let passwordElement = getElement('#password-create').value
        passwordField.innerHTML = `<label for="password">Senha<input type="text" name="password" id="password-create" placeholder="Crie uma senha..." value="${passwordElement}" required></label>`
    }else{
        let passwordElement = getElement('#password-create').value
        passwordField.innerHTML = `<label for="password">Senha<input type="password" name="password" id="password-create" placeholder="Crie uma senha..." value="${passwordElement}" required></label>`
    }
});
checkbox.dispatchEvent(new Event("change"))

function selectLevel() {
    var levelSelect = getElement('.hide-menu')

    levelSelect.classList.remove('hide-menu')
    levelSelect.classList.add('level')
}

function start(level) {
    console.log("inicio a funcao")
    keepData('level', level)
    //sessionStorage.setItem('name', palyer)

    window.location.href = './game'

}

function rank(){
    window.location.href = './ranking'
}

function message() {
    let url = location.search.slice(1)
    let name = url.split('=')[2]
    let messageCode = url.split('=')[1].split('&')[0]

    if (messageCode == 'false') {
        alert('Erro! senha ou nickname incorreto')
        return false
    }


    switch (messageCode) {
        case '1':
            alert(`Erro! ${name.replace('%20', ' ')} ja existe!`)
            break;

        case '2':
            alert('Conta criada com sucesso!')
            break;
        case '3':
            alert('Ocorreu um erro, tente novamente')
            break;

        default:
            enter()
            break;
    }
}

setTimeout(() => { message() }, 500)

