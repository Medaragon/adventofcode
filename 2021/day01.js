const fileReader = require('../file-reader.js')

var testInput = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263,
]

var myInput = fileReader.readFile('./2021/day01-data.txt').map(x => Number(x))
console.log(myInput)

const puzzle1 = (input) => {
  console.log('Puzzle 1')

  var biggerThanPreviousList = [];
  myInput.forEach((x, i) => {
    // console.log(`${i}: ${x}`)
  
    if (i > 0 && x > myInput[i - 1]) {
      biggerThanPreviousList.push(x)
    }
  })

  console.log('Puzzle 1 answer : ' + biggerThanPreviousList.length)
}

const puzzle2 = (input) => {
  console.log('Puzzle 2')

  var biggerThanPreviousBySumOfThreeList = [];
  myInput.forEach((x, i) => {
    if (i > 1) {
      let currentSum = myInput[i-2] + myInput[i-1] + x
      let nextSum = myInput[i-1] + x + (myInput[i+1] || 0)
      // console.log(currentSum + ' - ' + nextSum)
      if (currentSum < nextSum)
      biggerThanPreviousBySumOfThreeList.push(currentSum)
    }
  })

  console.log('Puzzle 2 answer : ' + biggerThanPreviousBySumOfThreeList.length)
}

puzzle1(myInput)
puzzle2(myInput)