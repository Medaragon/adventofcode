const fileReader = require('../file-reader.js')

var testInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
]

var myInput = fileReader.readFile('./2021/day03-data.txt')
console.log(myInput)


const length = myInput.length
const gamma = []

myInput[0].split('').forEach((_, i) => {
  gamma.push(myInput.filter(x => x[i] === '1').length > length/2 ? 1 : 0);
})
const epsilon = gamma.map(x => Number(!x))
const parse = (arr) => parseInt(arr.join().replaceAll(',', ''), 2)
console.log(parse(gamma))
console.log(parse(epsilon))
console.log(parse(gamma) * parse(epsilon))
