const fileReader = require('../file-reader.js')

var testInput = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2'
]

var myInput = fileReader.readFile('./2021/day02-data.txt')
console.log(myInput)

const getCommandAndPosition = (singleCommand) => {
  const [command, value] = singleCommand.split(' ');

  return [command, Number(value)]
}

const getCoordinatesModification = ([command, value]) => {
  switch (command) {
    case 'forward':
      return [value, 0]
    case 'down':
      return [0, value]
    case 'up':
      return [0, -value]
  }
}

const getTotalModification = ([prevX, prevY], [x, y]) => [prevX + x, prevY + y]

const total = myInput
  .map(line => getCoordinatesModification(getCommandAndPosition(line)))
  .reduce(getTotalModification, [0, 0])

console.log('Puzzle 1')
console.log('Coordinates : ' + total)
console.log('Coordinates multiplication : ' + total[0] * total[1])


var horizontalPos = 0;
var depth = 0
var aim = 0;
myInput.forEach(input => {
  const [cmd, val] = getCommandAndPosition(input)
  switch (cmd) {
    case 'forward':
      horizontalPos += val
      depth += val * aim
      break
    case 'down':
      aim += val
      break
    case 'up':
      aim -= val
      break
  }
})

console.log('Puzzle 2')
console.log('Coordinates : ' + horizontalPos + ' ' + depth + '   Aim : ' + aim)
console.log('Coordinates multiplication : ' + horizontalPos * depth)