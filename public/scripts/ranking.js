
function fixData() {
    let students = document.querySelector('#students').value


    students = students.split('|')
    //students = JSON.parse(students[0])
    
    //remover o ultimo elemento students[students.length -1]
    let array = []
    for(let c = 0; c < students.length - 1; c++) {
        array.push(students[c]) //JSON.parse(students[c]))
    }
    //alert(array[0].name)
    return array
}

function sortArray(array){
  
  array = array.sort()
  
  let temp = []
  for(let c = array.length-1; c >= 0; c--){
    temp.push(JSON.parse(array[c]))
  }
  return temp
}

function showRank(array){
  var div = document.querySelector('#display')
  div.innerHTML += `<table border="1"><tr><th>Nome</th><th>Pontos</th><th>Tempo</th></tr>`
  for(let c = 0; c < array.length; c++){
    div.innerHTML += `<tr><td>${c+1}°: ${array[c].name}</td> <td>${array[c].score}</td> <td>${array[c].time}</td></tr>`
  }
  div.innerHTML += `</table>`
}


var students = fixData() //sortArray(fixData())
students = sortArray(students)
showRank(students)
//sortArray(students)
//document.write(students[0].name)
