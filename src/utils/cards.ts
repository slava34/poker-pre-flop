import { RANKS, SUITS, TABLE_POSITIONS, type Card, type SeatCardsMap } from '../types/poker'

const RANK_ORDER = new Map<string, number>(RANKS.map((rank, index) => [rank, index]))

function compareRanks(a: string, b: string): number {
  return (RANK_ORDER.get(a) ?? 99) - (RANK_ORDER.get(b) ?? 99)
}

export function createDeck(): Card[] {
  const deck: Card[] = []
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit })
    }
  }
  return deck
}

export function shuffleDeck(deck: Card[]): Card[] {
  const cloned = [...deck]
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = cloned[i]
    cloned[i] = cloned[j]
    cloned[j] = temp
  }
  return cloned
}

export function dealHand(deck: Card[]): [Card, Card] {
  const first = deck.pop()
  const second = deck.pop()
  if (!first || !second) {
    throw new Error('Deck is empty while dealing.')
  }
  return [first, second]
}

export function dealTableHands(): SeatCardsMap {
  const deck = shuffleDeck(createDeck())
  const seatCards = {} as SeatCardsMap

  for (const position of TABLE_POSITIONS) {
    seatCards[position] = dealHand(deck)
  }

  return seatCards
}

export function toHandKey(cards: [Card, Card]): string {
  const [first, second] = cards
  const sortedRanks = [first.rank, second.rank].sort(compareRanks)
  const [high, low] = sortedRanks

  if (high === low) {
    return `${high}${low}`
  }

  const suitedSuffix = first.suit === second.suit ? 's' : 'o'
  return `${high}${low}${suitedSuffix}`
}
