const fileReader = require('../file-reader.js')

var testInput = fileReader.readFile('./2021/day05-test.txt')
var myInput = fileReader.readFile('./2021/day05-data.txt')

const getLines = (input) => input.map(l => l.split(' -> ').map(pos => pos.split(',').map(Number)))

const filterGetOnlyVerticalAndHorizontalLines = (line) => line[0][0] === line[1][0] || line[0][1] === line[1][1]

const filterGetVerticalHorizontalAndDiagonalLines = (line) => line[0][0] === line[1][0] || line[0][1] === line[1][1] || Math.abs(line[0][0] - line[1][0]) === Math.abs(line[0][1] - line[1][1])

const getAllCoveredPoints = (lines) => {
  const allPoints = []

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i]
    if (currentLine[0][0] === currentLine[1][0]) {
      const minY = Math.min(currentLine[0][1], currentLine[1][1])
      const topY = Math.abs(currentLine[0][1] - currentLine[1][1])
      for (let j = minY; j <= topY + minY; j++) {
        allPoints.push([currentLine[0][0], j])
      }
    } else if (currentLine[0][1] === currentLine[1][1]) {
      const minX = Math.min(currentLine[0][0], currentLine[1][0])
      const topX = Math.abs(currentLine[0][0] - currentLine[1][0])
      for (let j = minX; j <= topX + minX; j++) {
        allPoints.push([j, currentLine[0][1]])
      }
    } else {
      const minX = Math.min(currentLine[0][0], currentLine[1][0])
      const maxX = Math.max(currentLine[0][0], currentLine[1][0])
      const minY = Math.min(currentLine[0][1], currentLine[1][1])
      const maxY = Math.max(currentLine[0][1], currentLine[1][1])
      const isOriginMinX = minX === currentLine[0][0]
      const isOriginMinY = minY === currentLine[0][1]

      for (let j = 0; j <= maxX - minX; j++) {
        allPoints.push([
          isOriginMinX ? minX + j : maxX - j,
          isOriginMinY ? minY + j : maxY - j,
        ])
      }
    }
  }

  return allPoints
}

const getDuplicates = (points) => {
  const uniqueValues = []
  const duplicates = []
  points.forEach(x => {
    if (!uniqueValues.find(p => p[0] === x[0] && p[1] === x[1])) {
      uniqueValues.push(x)
    } else {
      if (!duplicates.find(p => p[0] === x[0] && p[1] === x[1])) {
        duplicates.push(x)
      }
    }
  })

  return duplicates
}

const runPuzzle1 = false
console.log('Puzzle 1 will run', runPuzzle1)
if (runPuzzle1) {
  const lines = getLines(myInput).filter(filterGetOnlyVerticalAndHorizontalLines)
  console.log('GetLines Done : ', new Date())
  // console.log(lines)
  const coveredPoints = getAllCoveredPoints(lines)
  console.log('getAllCoveredPoints Done : ', new Date())
  console.log('total of covered points', coveredPoints.length)
  // console.log(coveredPoints)
  const duplicates = getDuplicates(coveredPoints)
  console.log('getDuplicates Done : ', new Date())
  console.log(duplicates.length)
}


const runPuzzle2 = true
console.log('Puzzle 2 will run', runPuzzle2)
if (runPuzzle2) {
  const lines = getLines(myInput).filter(filterGetVerticalHorizontalAndDiagonalLines)
  console.log('GetLines Done : ', new Date())
  // console.log(lines)
  const coveredPoints = getAllCoveredPoints(lines)
  console.log('getAllCoveredPoints Done : ', new Date())
  console.log('total of covered points', coveredPoints.length)
  // console.log(coveredPoints)
  const duplicates = getDuplicates(coveredPoints)
  console.log('getDuplicates Done : ', new Date())
  console.log(duplicates.length)
}

