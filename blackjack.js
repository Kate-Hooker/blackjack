/* build deck, shuffle deck, select one card at a time
make dealers hand - total their cards - if less than 17 take a third.
keep one face down
charge ace as 11, count aces, deduct if over 21 
make player total
buttons for stay and hit
automatic loss if over 21
if both under 21 closest wins
if deler over 21 and player under player wins
-- functions to make - build deck (then shuffle deck)
deal out hands - auto logic for computer to make its move - computer hand check for hit, count aces,
*/
const randomNumber = Math.floor(Math.random() * 53)
let shuffledDeck = []
let freshCard = []
let dealerSecretCard = []
let dealersHand = []
let playerHand = []

let dealerScore = 0
let dealerCardsTotal = 0
let playerScore = 0
let playerCardsTotal = 0

var valueOnCard
var suiteIdentifier
var cardPoints

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
  dealersHand.push(dealerSecretCard)
  console.log(dealerSecretCard + ' is the dealers card')
}
//pulls a card and adds it to player ones hand, return shuffled deck without card
//retrieve card, break into string and number, use that to pick image
function dealACard() {
  freshCard = shuffledDeck.pop()
}

function calculateCardScore() {
  const cardParts = freshCard.split('-')

  valueOnCard = cardParts[0]
  suiteIdentifier = cardParts[1]

  if (cardParts[0] === 'K' || cardParts[0] === 'Q' || cardParts[0] === 'J') {
    cardPoints = 10
  }
  if (cardParts[0] === 'A') {
    cardPoints = 11
  } else {
    cardPoints = parseInt(cardParts[0])
  }

  console.log('Card: ' + valueOnCard)
  console.log('Points: ' + cardPoints)
}

//start when the table opens. One card face up displayed, on facedown displayed, if less than
//

function handleStartOverButtonClick() {
  buildDeck()
  dealACard()
  calculateCardScore()

  dealersHand.push(freshCard)

  let dealerCards = document.querySelector('.dealerCards')

  // Create an image element
  const cardImage = document.createElement('img')
  cardImage.src = `cards/${valueOnCard}-${suiteIdentifier}.png`

  // Append the image to the dealerCards container
  dealerCards.appendChild(cardImage)

  dealerGetsAFaceDownCard()
  console.log('this should be the dealers array ' + dealersHand)
}

const startOverButton = document.getElementById('startOver')
startOverButton.addEventListener('click', handleStartOverButtonClick)

console.log(freshCard)
