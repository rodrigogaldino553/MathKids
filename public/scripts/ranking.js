const user = sessionStorage.getItem('name')

if (user == "admin") {
  //aqui vai ter a conf do botao
  let print = document.querySelector('#print')
  print.classList.remove('hide')
  print.classList.add('btn')

  
  var students = fixData() //sortArray(fixData())
  students = sortArray(students)
  showRankDM(students)
} else {
  var students = fixData() //sortArray(fixData())
  students = sortArray(students)
  showRank(students)
}


function fixData() {
  let students = document.querySelector('#students').value


  students = students.split('|')
  //students = JSON.parse(students[0])

  //remover o ultimo elemento students[students.length -1]
  let array = []
  for (let c = 1; c < students.length - 1; c++) {
    array.push(students[c]) //JSON.parse(students[c]))
  }
  //alert(array[0].name)
  return array
}

function sortArray(array) {

  //array = array.sort()

  let temp = []
  for (let c = array.length - 1; c >= 0; c--) {
    temp.push(JSON.parse(array[c]))
  }
  return temp.sort(function (a, b) {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
}

function showRank(array) {
  var div = document.querySelector('#display')
  let temp = ''
  // div.innerHTML += `<table border="1"><tr><th>Nome</th><th>Pontos</th><th>Tempo</th></tr>`
  for (let c = 0; c < array.length; c++) {
    temp += `<tr><td class="name">${c + 1}°  ${array[c].name}</td> <td>${array[c].score}</td> <td>${array[c].time}</td> <td>${array[c].serie}</td></tr>`
  }

  div.innerHTML += `<table border="1"><tr><th>Nome</th><th>Pontos</th><th>Tempo</th><th>Série</th></tr>${temp}</table>`
}


function showRankDM(array) {
  var div = document.querySelector('#display')
  let temp = ''
  // div.innerHTML += `<table border="1"><tr><th>Nome</th><th>Pontos</th><th>Tempo</th></tr>`
  for (let c = 0; c < array.length; c++) {
    temp += `<tr><td class="name">${c + 1}°  ${array[c].name}</td> <td>${array[c].score}</td> <td>${array[c].time}</td> <td>${array[c].serie}</td> <td>${array[c].date}</td></tr>`
  }

  div.innerHTML += `<table border="1"><tr><th>Nome</th><th>Pontos</th><th>Tempo</th><th>Série</th><th>Data</td></tr>${temp}</table>`
}

//alert(students)

//sortArray(students)
//document.write(students[0].name)
