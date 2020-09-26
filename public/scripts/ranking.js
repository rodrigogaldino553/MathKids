
function fixData() {
    let students = document.querySelector('#students').value


    students = students.split('|')
    //remover o ultimo elemento students[students.length -1]
    let array = []
    for(let c = 0; c < students.length - 1; c++) {
        array.push(students[c])
    }
    return array
}

function sortArray(array){
  array = array.sort()

  let temp = []
  for(let c = array.length-1; c >= 0; c--){
    temp.push(array[c])
  }
  return temp
}

var students = fixData()

sortArray(students)
//sortArray(students)
document.write(sortArray(students))
