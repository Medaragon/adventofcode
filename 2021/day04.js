const fileReader = require('../file-reader.js')

var testInput = fileReader.readFile('./2021/day04-test.txt')
var myInput = fileReader.readFile('./2021/day04-data.txt')

const getBingoCards = (theInput) => {
  var bingoCards = []
  var numberOfCards = theInput.length / (sizeOfBingoCards + 1)
  for (let i = 0; i < numberOfCards; i++) {
    var currentListOfRows = theInput.slice(1 + i + (i * sizeOfBingoCards), sizeOfBingoCards + 1  + i + (i * sizeOfBingoCards))
    var currentBingoCard = currentListOfRows.map(x => x.split(' ').filter(x => x !== '').map(y => ({ value: y, checked: false })))
    bingoCards.push(currentBingoCard)
  }

  return bingoCards
}

const displayBingoCards = (cards) => {
  cards.forEach(c => {
    var labelCard = c.map(r => r.map(num => {
      var isOneDigit = (num.value / 10) < 1
      return num.checked ? `[${isOneDigit ? ' ' : ''}${num.value}]` : ` ${isOneDigit ? ' ' : ''}${num.value} `
    }).join(', '))
    console.log(labelCard)
  })
}

const checkDrawnNumberOnCard = (drawnNumber, cards) => {
  return cards.map(card => {
    card.forEach(row => {
      var foundNumbers = row.filter(num => num.value === drawnNumber)
      foundNumbers.forEach(num => num.checked = true)
    })
  })
}

const checkIfACardWon = (cards) => {
  const cardsVictoryState = cards.map(c => {
    const checkIfCardWinsInARow = (card) => card.some(row => row.every(num => num.checked))
    const checkIfCardWinsInAColumn = (card) => card.some((row, i) => card.every(c => c[i].checked))

    return checkIfCardWinsInARow(c) || checkIfCardWinsInAColumn(c)
  })
  
  return cardsVictoryState.findIndex(x => x === true)
}

const drawNumbersUntilAWin = (drawnNumbers, initialBingoCards) => {
  const bingoCards = initialBingoCards
  for(let i = 0; i < drawnNumbers.length; i++) {
    checkDrawnNumberOnCard(drawnNumbers[i], bingoCards)
    const winningCardIndex = checkIfACardWon(bingoCards)

    if (winningCardIndex !== -1) {
      displayBingoCards(bingoCards)

      return [bingoCards[winningCardIndex], drawnNumbers[i]]
    }
  }

  return null
}

const calculateScoreOfWinningCard = (winningCard, lastDrawnNumber) => {
  const sumOfUncheckedValues = winningCard.flat().filter(x => !x.checked).map(x => +x.value).reduce((prev, curr) => prev + curr)
  
  return sumOfUncheckedValues * lastDrawnNumber
}

const sizeOfBingoCards = 5
var input = myInput

var drawnNumbers = input.shift().split(',')
var initialBingoCards = getBingoCards(input)


const [winningCard, lastDrawnNumber] = drawNumbersUntilAWin(drawnNumbers, initialBingoCards)
if (!winningCard) {
  console.log('No one won')
} else {
  const finalScore = calculateScoreOfWinningCard(winningCard, lastDrawnNumber)
  console.log(finalScore)
}

