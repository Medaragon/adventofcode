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
// console.log(myInput)


const length = myInput.length
const gamma = []

myInput[0].split('').forEach((_, i) => {
  gamma.push(myInput.filter(x => x[i] === '1').length > length/2 ? 1 : 0);
})
const epsilon = gamma.map(x => Number(!x))
const parse = (arr) => parseInt(arr.join().replaceAll(',', ''), 2)
// console.log(parse(gamma))
// console.log(parse(epsilon))
const powerConsumption = parse(gamma) * parse(epsilon)
console.log(powerConsumption)

const getCounts = (arr) => arr.reduce((a, c) => {
  a[c] = (a[c] || 0) + 1;
  return a;
}, {});

const getMostFrequent = (arr) => {
  const counts = getCounts(arr)
  const mostFrequents = Object.keys(counts).filter(k => counts[k] === Math.max(...Object.values(counts)))
  return Math.max(...mostFrequents.map(x => Number(x)))
}
const getLessFrequent = (arr) => {
  const counts = getCounts(arr)
  const lessFrequents = Object.keys(counts).filter(k => counts[k] === Math.min(...Object.values(counts)))
  return Math.min(...lessFrequents.map(x => Number(x)))
}

const getRating = (input, chooseMostFrequent) => {
  var remainingList = input
  for (var i = 0; i < input[0].length; i++) {
    const bitsAtCurrentIndex = remainingList.map(x => x.split('')[i])
    const chosenBit = chooseMostFrequent ? getMostFrequent(bitsAtCurrentIndex) : getLessFrequent(bitsAtCurrentIndex)
    remainingList = remainingList.filter(x => Number(x[i]) === Number(chosenBit))
    // console.log('Chosen bit : ' + chosenBit + ' Numbers left : ' + remainingList)
    if (remainingList.length === 1) {
      return remainingList[0]
    }
  }
}

const oxygenGeneratorRating = parse(getRating(myInput, true).split(''))
const co2ScrubberRating = parse(getRating(myInput, false).split(''))
const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating

console.log(lifeSupportRating)