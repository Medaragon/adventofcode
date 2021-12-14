const fileReader = require('../file-reader.js')

var testInput = [
  '[({(<(())[]>[[{[]{<()<>>',
  '[(()[<>])]({[<{<<[]>>(',
  '{([(<{}[<>[]}>{[]{[(<()>',
  '(((({<>}<{<{<>}{[]{[]{}',
  '[[<[([]))<([[{}[[()]]]',
  '[{[{({}]{}}([{[{{{}}([]',
  '{<[[]]>}<{[{[{[]{()[[[]',
  '[<(<(<(<{}))><([]([]()',
  '<{([([[(<>()){}]>(<<{{',
  '<{([{{}}[<[[[<>{}]]]>[]]'
]

var myInput = fileReader.readFile('./2021/day10-data.txt')

const analyzeCorruptedLine = (line) => {
  const openedSymbolQueue = []
  var arr = line.split('')
  for (var i = 0; i < arr.length; i++) {
    const sym = arr[i]
    switch (sym) {
      case '(':
      case '[':
      case '{':
      case '<':
        openedSymbolQueue.push(sym)
        break
      case ')':
        if (openedSymbolQueue[openedSymbolQueue.length - 1] === '(') {
          openedSymbolQueue.pop()
        } else {
          return 3
        }
        break
      case ']':
        if (openedSymbolQueue[openedSymbolQueue.length - 1] === '[') {
          openedSymbolQueue.pop()
        } else {
          return 57
        }
        break
      case '}':
        if (openedSymbolQueue[openedSymbolQueue.length - 1] === '{') {
          openedSymbolQueue.pop()
        } else {
          return 1197
        }
        break
      case '>':
        if (openedSymbolQueue[openedSymbolQueue.length - 1] === '<') {
          openedSymbolQueue.pop()
        } else {
          return 25137
        }
        break
    }
  }

  return 0
}

const total = myInput.map(x => analyzeCorruptedLine(x)).reduce((acc, x) => acc + x)
console.log(total)

const getNotClosedCharacters = (line) => {
  const openedSymbolQueue = []
  var arr = line.split('')
  for (var i = 0; i < arr.length; i++) {
    const sym = arr[i]
    switch (sym) {
      case '(':
      case '[':
      case '{':
      case '<':
        openedSymbolQueue.push(sym)
        break
      case ')':
        if (openedSymbolQueue[openedSymbolQueue.length - 1] === '(') {
          openedSymbolQueue.pop()
        } else {
          return null
        }
        break
      case ']':
        if (openedSymbolQueue[openedSymbolQueue.length - 1] === '[') {
          openedSymbolQueue.pop()
        } else {
          return null
        }
        break
      case '}':
        if (openedSymbolQueue[openedSymbolQueue.length - 1] === '{') {
          openedSymbolQueue.pop()
        } else {
          return null
        }
        break
      case '>':
        if (openedSymbolQueue[openedSymbolQueue.length - 1] === '<') {
          openedSymbolQueue.pop()
        } else {
          return null
        }
        break
    }
  }

  return openedSymbolQueue
}

const mapToClosingCharacters = (openedChars) => openedChars.map(x => {
    switch (x) {
      case '(':
        return ')'
      case '[':
        return ']'
      case '{':
        return '}'
      case '<':
        return '>'
    }
  }
)

const getPoints = (closingChars) => {
  var points = 0
  closingChars.forEach(x => {
    points *= 5
    switch (x) {
      case ')':
        points += 1
        break
      case ']':
        points += 2
        break
      case '}':
        points += 3
        break
      case '>':
        points += 4
        break
    }
  })

  return points
}

const points = myInput
  .map(getNotClosedCharacters)
  .filter(x => x !== null)
  .map(mapToClosingCharacters)
  .map(x => x.reverse())
  .map(getPoints)
  .sort((a,b) => a - b)
const middleScore = points[Math.floor(points.length/2)]
console.log(middleScore)