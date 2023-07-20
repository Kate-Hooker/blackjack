let shuffledDeck = []
let freshCard = []
let dealerSecretCard = []
let dealerHand = []
let playerHand = []
let playerCards = []
let secretDealerCards = []

//let dealerScore = 0
let dealerScoreTwo = { score: 0, aces: 0 }
let playerScoreTwo = { score: 0, aces: 0 }

let nominateParticipant
//let card
let cardParts
let valueOnCard
let suiteIdentifier
let backOfCardImage
let theActualImageOfSecretCard
let possibleWin
let playerHeading
let possibleWinDealer
let possibleWinPlayer
let holdButtonClicked = false

//build a shuffled deck with all 52 cards
function buildDeck() {
  let cardValues = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ]
  let cardSuits = ['D', 'H', 'S', 'C']

  let deck = []
  shuffledDeck = []

  for (let i = 0; i < cardValues.length; i++) {
    for (let j = 0; j < cardSuits.length; j++) {
      deck.push(cardValues[i] + '-' + cardSuits[j])
    }
  }

  shuffledDeck = deck.sort(() => Math.random() - 0.5)
  console.log(shuffledDeck)
}
function replaceFaceDownImage(newImageURL) {
  const newSecretImageReveal = document.getElementById('faceDown')
  newSecretImageReveal.src = newImageURL
}
function generateURLForSecretCard() {
  let card = dealerSecretCard
  cardParts = card.split('-')
  valueOnCard = cardParts[0]
  suiteIdentifier = cardParts[1]
  // Create an image element
  let newImageURL = `cards/${valueOnCard}-${suiteIdentifier}.png`
  return newImageURL // Add this line to return the generated URL
}

function dealerGetsAFaceDownCard() {
  dealerSecretCard = document.querySelector('#faceDown')
  dealerSecretCard = dealACard()
  dealerHand.push(dealerSecretCard)
  console.log(dealerSecretCard + ' is the dealers card')

  //card = dealerSecretCard
  cardParts = dealerSecretCard.split('-')
  valueOnCard = cardParts[0]
  suiteIdentifier = cardParts[1]
  // Create an image element
  const secretCardImage = document.createElement('img')
  secretCardImage.src = 'cards/' + valueOnCard + '-' + suiteIdentifier + '.png'
  let theActualImageOfSecretCard = secretCardImage.src
  console.log('hopfully the url for scret crad' + theActualImageOfSecretCard)
  return theActualImageOfSecretCard
}

function dealACard() {
  freshCard = shuffledDeck.pop()
  return freshCard
}

// ie calculateScore('dealer', dealerHand)
function calculateScore(nominateParticipant, hand) {
  let score = 0
  let aces = 0

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const cardParts = card.split('-')
    const valueOnCard = cardParts[0]
    const suiteIdentifier = cardParts[1]

    let cardPoints = 0

    if (valueOnCard === 'K' || valueOnCard === 'Q' || valueOnCard === 'J') {
      cardPoints = 10
    } else if (valueOnCard === 'A') {
      cardPoints = 11
      aces++
    } else {
      cardPoints = parseInt(valueOnCard)
    }

    score += cardPoints
  }

  return { score: score, aces: aces }
}

function dealersTurn() {
  if (dealerScoreTwo.score < 17) {
    let card = dealACard()
    dealerHand.push(card)

    let dealerCards = document.querySelector('.dealerCards')
    cardParts = card.split('-')
    valueOnCard = cardParts[0]
    suiteIdentifier = cardParts[1]
    // Create an image element
    const cardImage = document.createElement('img')
    cardImage.src = `cards/${valueOnCard}-${suiteIdentifier}.png`

    //Append the image to the dealerCards container
    dealerCards.appendChild(cardImage)

    dealerScoreTwo = calculateScore('dealer', dealerHand)
    //processAces(dealerScore)
    dealerScoreTwo = processAces(dealerScoreTwo)

    console.log(
      'this is the .score at the end of dealers turn' + dealerScoreTwo.score
    )

    if (dealerScoreTwo.score < 17) {
      console.log(
        'this is the .score in the while loop in dealers turn' +
          dealerScoreTwo.score
      )
      dealersTurn()
      return
    }

    //dealerScore = calculateScore('dealer', dealerHand)
    //processAces(dealerScore)
    console.log(
      'it would be great if this is the right score ' + dealerScoreTwo.score
    )
    console.log('this is very unlikely ' + dealerHand)
  }
}
function processAces(score) {
  console.log('process aces new fuction points: ' + score.score)

  let numberOfAces = score.aces
  while (numberOfAces > 0 && score.score > 21) {
    score.score -= 10
    numberOfAces--
  }
  return score
}

//use this to update scroreboard, bets and clear dealerScore and playerScore
function refreshDealerHand() {
  dealerHand = [] // Empty the dealerHand array
  holdButtonClicked = false
  let dealerCards = document.querySelector('.dealerCards')
  dealerCards.innerHTML = ''
  backOfCardImage = document.createElement('img')
  backOfCardImage.id = 'faceDown'
  backOfCardImage.src = `cards/BACK.png`

  //Append the image to the dealerCards container
  dealerCards.appendChild(backOfCardImage)
}

function refreshPlayerHand() {
  playerHand = [] // Empty the dealerHand array

  playerCards = document.querySelector('.playerCards')
  playerCards.innerHTML = ''
}

function handleStartOverButtonClick() {
  refreshDealerHand()
  refreshPlayerHand()
  shuffledDeck = []
  freshCard = []
  dealerSecretCard = []
  playerHand = []
  //dealerHand = []
  let dealerCards = []
  playerCards = []

  const dealerHeading = document.getElementById('dealerHeading')
  dealerHeading.textContent = 'Dealer'

  const playerHeading = document.getElementById('playerHeading')
  playerHeading.textContent = 'Player'

  const startOver = document.getElementById('startOver')
  startOver.classList.remove('visible')
  startOver.classList.add('invisible')

  const buttonToHit = document.getElementById('buttonToHit')
  buttonToHit.classList.remove('invisible')
  buttonToHit.classList.add('visible')

  const buttonToHold = document.getElementById('buttonToHold')
  buttonToHold.classList.remove('invisible')
  buttonToHold.classList.add('visible')

  buildDeck()
  let card = dealACard()
  dealerHand.push(card)

  dealerCards = document.querySelector('.dealerCards')
  cardParts = card.split('-')
  valueOnCard = cardParts[0]
  suiteIdentifier = cardParts[1]
  // Create an image element
  const cardImage = document.createElement('img')
  cardImage.src = `cards/${valueOnCard}-${suiteIdentifier}.png`

  //Append the image to the dealerCards container
  dealerCards.appendChild(cardImage)

  dealerGetsAFaceDownCard()
  dealerScoreTwo = calculateScore('', dealerHand)
  console.log('this should be the dealers array ' + dealerHand)

  dealersTurn()
  setTimeout(playerTurn, 1500)
}

function handleHoldButtonClick() {
  const buttonToHit = document.getElementById('buttonToHit')
  buttonToHit.classList.remove('visible')
  buttonToHit.classList.add('invisible')

  const buttonToHold = document.getElementById('buttonToHold')
  buttonToHold.classList.remove('visible')
  buttonToHold.classList.add('invisible')

  const startOver = document.getElementById('startOver')
  startOver.classList.remove('invisible')
  startOver.classList.add('visible')

  dealerScoreTwo = calculateScore('dealer', dealerHand)
  dealerScoreTwo = processAces(dealerScoreTwo)

  holdButtonClicked = true
  checkForPlayerWin()
}

function checkForBlackjack(hand) {
  let aces = 0

  if (hand.length === 2 && playerScoreTwo.score === 21) {
    handleBlackjack()
  } else if (
    dealerHand.length === 2 &&
    dealerScoreTwo.score === 21 &&
    holdButtonClicked === true
  ) {
    handleBlackjack()
  } else if (
    holdButtonClicked === true &&
    playerScoreTwo.score === 21 &&
    dealerScoreTwo.score === 21
  ) {
    drawNobodyLoses()
  } else if (
    holdButtonClicked === true &&
    21 - playerScoreTwo.score < 21 - dealerScoreTwo.score
  ) {
    dealerLoses()
  } else if (
    holdButtonClicked === true &&
    21 - dealerScoreTwo.score < 21 - playerScoreTwo.score
  ) {
    playerLoses()
  }
}

function checkForDoubleBlackjack() {
  let aces = 0
  let possibleWinDealer
  let possibleWinPlayer

  if (dealerHand.length === 2 && dealerScoreTwo.score === 21) {
    possibleWinDealer = true
  }

  if (playerHand.length === 2 && playerScoreTwo.score === 21) {
    possibleWinPlayer = true
  }

  if (possibleWinPlayer === true && possibleWinDealer === true) {
    drawNobodyLoses()
  } else if (possibleWinPlayer === true && possibleWinDealer !== true) {
    dealerLoses()
  } else if (possibleWinPlayer !== true && possibleWinDealer === true) {
    playerLoses()
  }
}

function handleBlackjack() {
  if (playerScoreTwo.score === 21 && dealerScoreTwo.score === 21) {
    checkForDoubleBlackjack()
  } else if (playerScoreTwo.score === 21) {
    dealerLoses()
  } else if (dealerScoreTwo.score === 21) {
    playerLoses()
  }
}

function checkForPlayerWin() {
  playerScoreTwo = calculateScore('player', playerHand)
  playerScoreTwo = processAces(playerScoreTwo)

  if (playerScoreTwo.score > 21) {
    playerLoses()
  } else if (dealerScoreTwo.score > 21) {
    dealerLoses()
  } else if (playerScoreTwo.score === 21) {
    checkForBlackjack(playerHand)
  } else if (21 - playerScoreTwo.score < 21 - dealerScoreTwo.score) {
    dealerLoses()
  } else if (21 - playerScoreTwo.score > 21 - dealerScoreTwo.score) {
    playerLoses()
  } else if (playerScoreTwo.score === dealerScoreTwo.score) {
    drawNobodyLoses()
  }
  replaceFaceDownImage(generateURLForSecretCard())
}

function playerLoses() {
  const dealerHeading = document.getElementById('dealerHeading')
  dealerHeading.textContent = 'Winners Total: ' + dealerScoreTwo.score

  const playerHeading = document.getElementById('playerHeading')
  playerHeading.textContent = 'Losers Total: ' + playerScoreTwo.score
}

function dealerLoses() {
  const dealerHeading = document.getElementById('dealerHeading')
  dealerHeading.textContent = 'Losers Total: ' + dealerScoreTwo.score

  const playerHeading = document.getElementById('playerHeading')
  playerHeading.textContent = 'Winners Total: ' + playerScoreTwo.score
}

function drawNobodyLoses() {
  const dealerHeading = document.getElementById('dealerHeading')
  dealerHeading.textContent =
    'Dealers Total: ' + dealerScoreTwo.score + ' DRAW!'

  const playerHeading = document.getElementById('playerHeading')
  playerHeading.textContent = 'Player Total: ' + playerScoreTwo.score + ' DRAW!'
}

function dealPlayerCard() {
  let card = dealACard()
  playerHand.push(card)

  playerCards = document.querySelector('.playerCards')
  cardParts = card.split('-')
  valueOnCard = cardParts[0]
  suiteIdentifier = cardParts[1]
  // Create an image element
  const cardImage = document.createElement('img')
  cardImage.src = `cards/${valueOnCard}-${suiteIdentifier}.png`

  //Append the image to the dealerCards container
  playerCards.appendChild(cardImage)
}

/*function dealPlayerCard(fakeCard) {
  let card = fakeCard ?? dealACard()
  playerHand.push(card)

  playerCards = document.querySelector('.playerCards')
  cardParts = card.split('-')
  valueOnCard = cardParts[0]
  suiteIdentifier = cardParts[1]
  playerScoreTwo = calculateScore('', playerHand)
  playerScoreTwo = processAces(playerScoreTwo)
  const cardImage = document.createElement('img')
  cardImage.src = `cards/${valueOnCard}-${suiteIdentifier}.png`

  playerCards.appendChild(cardImage)
} */

function playerTurn() {
  dealPlayerCard()
  dealPlayerCard()

  checkForBlackjack(playerHand)
}

function handleHitButtonClick() {
  dealPlayerCard()
  checkForBlackjack(playerHand)

  playerScoreTwo = calculateScore('player', playerHand)
  playerScoreTwo = processAces(playerScoreTwo)

  if (playerScoreTwo.score > 21) {
    const buttonToHit = document.getElementById('buttonToHit')
    buttonToHit.classList.remove('visible')
    buttonToHit.classList.add('invisible')
  }
}
//function emulateBlackJack() {
//  refreshPlayerHand()
//  dealPlayerCard('A-D')
//  dealPlayerCard('10-S')
//}
function init() {
  const startOverButton = document.getElementById('startOver')
  startOverButton.addEventListener('click', handleStartOverButtonClick)

  const holdButton = document.getElementById('buttonToHold')
  holdButton.addEventListener('click', handleHoldButtonClick)

  const hitButton = document.getElementById('buttonToHit')
  hitButton.addEventListener('click', handleHitButtonClick)
  //document
  //  .getElementById('buttonFakeBlackJack')
  //  .addEventListener('click', emulateBlackJack)
}

init()
