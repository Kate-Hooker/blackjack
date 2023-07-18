const randomNumber = Math.floor(Math.random() * 53)
let shuffledDeck = []
let freshCard = []
let dealerSecretCard = []
let dealerHand = []
let playersHand = []

let dealerScore = 0
let dealerCardsTotal = 0
let playerScore = 0
let playerCardsTotal = 0

let cardPoints
let nominateParticipant
let participant
let card
let cardParts
let valueOnCard
let suiteIdentifier

let dealerAces = 0
let playerAces = 0
let numberOfAces = 0

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

function dealerGetsAFaceDownCard() {
  dealerSecretCard = document.querySelector('#faceDown')
  dealACard()
  dealerSecretCard = freshCard
  dealerHand.push(dealerSecretCard)
  console.log(dealerSecretCard + ' is the dealers card')
}
//pulls a card and adds it to player ones hand, return shuffled deck without card
//retrieve card, break into string and number, use that to pick image
function dealACard() {
  freshCard = shuffledDeck.pop()
  card = freshCard
}

// ie calculateScore('dealer', dealerHand)
function calculateScore(nominateParticipant, hand) {
  let score = 0

  for (let i = 0; i < hand.length; i++) {
    const card = hand[i]
    const cardParts = card.split('-')
    const valueOnCard = cardParts[0]
    const suiteIdentifier = cardParts[1]

    if (valueOnCard === 'K' || valueOnCard === 'Q' || valueOnCard === 'J') {
      cardPoints = 10
    } else if (valueOnCard === 'A') {
      cardPoints = 11
      if (nominateParticipant === 'dealer') {
        dealerAces++
      } else if (nominateParticipant === 'player') {
        playerAces++
      }
    } else {
      cardPoints = parseInt(valueOnCard)
    }

    score += cardPoints
  }

  if (nominateParticipant === 'dealer') {
    dealerScore += score
  } else if (nominateParticipant === 'player') {
    playerScore += score
  }

  console.log('Total dealer points: ' + dealerScore)
}

function takeAnotherCard() {
  dealACard()

  dealerHand.push(freshCard)

  let dealerCards = document.querySelector('.dealerCards')
  cardParts = card.split('-')
  valueOnCard = cardParts[0]
  suiteIdentifier = cardParts[1]
  // Create an image element
  const cardImage = document.createElement('img')
  cardImage.src = `cards/${valueOnCard}-${suiteIdentifier}.png`

  //Append the image to the dealerCards container
  dealerCards.appendChild(cardImage)

  calculateScore('dealer', dealerHand)
  processDealerAces()
  console.log('this is very unlikely ' + dealerHand)
}

function processDealerAces() {
  if (dealerScore < 17) {
    takeAnotherCard()
  }

  while (numberOfAces > 0 && dealerScore > 21) {
    dealerScore -= 10
    numberOfAces--
    if (dealerScore >= 17 && dealerScore <= 21) {
      return dealerScore
    }
    if (dealerScore < 17) {
      takeAnotherCard()
      return dealerScore
    }
  }
}

//start when the table opens. One card face up displayed, on facedown displayed, if less than
//

function handleStartOverButtonClick() {
  shuffledDeck = []
  freshCard = []
  dealerSecretCard = []
  playersHand = []

  buildDeck()
  dealACard()

  dealerHand.push(freshCard)

  let dealerCards = document.querySelector('.dealerCards')
  cardParts = card.split('-')
  valueOnCard = cardParts[0]
  suiteIdentifier = cardParts[1]
  // Create an image element
  const cardImage = document.createElement('img')
  cardImage.src = `cards/${valueOnCard}-${suiteIdentifier}.png`

  //Append the image to the dealerCards container
  dealerCards.appendChild(cardImage)

  dealerGetsAFaceDownCard()
  console.log('this should be the dealers array ' + dealerHand)

  calculateScore('dealer', dealerHand)
  processDealerAces()
}

const startOverButton = document.getElementById('startOver')
startOverButton.addEventListener('click', handleStartOverButtonClick)

console.log(freshCard)
