const randomNumber = Math.floor(Math.random() * 53)
let shuffledDeck = []
let freshCard = []
let dealerSecretCard = []
let dealerHand = []
let playersHand = []

let dealerScore = 0
let dealerScoreTwo = { score: 0, aces: 0 }
let dealerCardsTotal = 0
let playerScore = 0
let playerCardsTotal = 0

let cardPoints
let nominateParticipant
let card
let cardParts
let valueOnCard
let suiteIdentifier
let backOfCardImage

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
      // if (nominateParticipant === 'dealer') {
      // dealerAces++
      // } else if (nominateParticipant === 'player') {
      // playerAces++
      //}
    } else {
      cardPoints = parseInt(valueOnCard)
    }
    //seperate dealer/player here
    score += cardPoints
  }
  //if (nominateParticipant === 'dealer') {
  // dealerScore += score
  //else
  return { score: score, aces: aces }
  //return score
}

function dealersTurn() {
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

  dealerScoreTwo = calculateScore('dealer', dealerHand)
  //processAces(dealerScore)
  dealerScoreTwo = processAces(dealerScoreTwo)

  console.log(
    'this is the score at the end of dealers turn' + dealerScoreTwo.score
  )
  console.log(
    'this is dealerscortwoe at the end of dealers turn' + dealerScoreTwo
  )
  while (dealerScoreTwo.score < 17) {
    dealersTurn()
  }

  //dealerScore = calculateScore('dealer', dealerHand)
  //processAces(dealerScore)
  console.log(
    'it would be great if this is the right score ' + dealerScoreTwo.score
  )
  console.log('this is very unlikely ' + dealerHand)
}

function processAces(score) {
  console.log('process aces new fuction points: ' + dealerScore)

  //dealerScore = score

  //if (dealerScore < 17) {
  //  takeAnotherCard()
  //}
  let numberOfAces = score.aces
  while (numberOfAces > 0 && score.score >= 21) {
    score.score -= 10
    numberOfAces--
    /*if (dealerScore >= 17 && dealerScore <= 21) {
      return dealerScore
    }
    if (dealerScore < 17) {
      takeAnotherCard() 
      return dealerScore
    } */
  }
  return score
}

function processDealerAces() {
  console.log('process aces dealer points: ' + dealerScore)

  dealerScore = score

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

//use this to update scroreboard, bets and clear dealerScore and playerScore
function refreshDealerHand() {
  dealerHand = [] // Empty the dealerHand array

  let dealerCards = document.querySelector('.dealerCards')
  dealerCards.innerHTML = ''
  backOfCardImage = document.createElement('img')
  backOfCardImage.src = `cards/BACK.png`

  //Append the image to the dealerCards container
  dealerCards.appendChild(backOfCardImage)
}

function handleStartOverButtonClick() {
  refreshDealerHand()
  shuffledDeck = []
  freshCard = []
  dealerSecretCard = []
  playersHand = []
  let dealerCards = []
  dealerAces = 0
  playerAces = 0
  dealerScore = 0
  playerScore = 0

  buildDeck()
  dealACard()

  dealerHand.push(freshCard)

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
  console.log('this should be the dealers array ' + dealerHand)

  dealersTurn()
}

const startOverButton = document.getElementById('startOver')
startOverButton.addEventListener('click', handleStartOverButtonClick)

console.log(freshCard)
