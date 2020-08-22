var player;

function getElement(element){
    return document.querySelector(element)
}

function enter(){
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

function selectLevel(){
    var levelSelect = getElement('.hide-menu')

    levelSelect.classList.remove('hide-menu')
    levelSelect.classList.add('level')
}

function start(level){
    console.log("inicio a funcao")
    sessionStorage.setItem('level', level)
    //sessionStorage.setItem('name', palyer)
    
    window.location.href = './src/game.html'
    
}
