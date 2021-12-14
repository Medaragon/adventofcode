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

const total = myInput.map(x => analyzeLine(x)).reduce((acc, x) => acc + x)
console.log(total)