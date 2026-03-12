import type { Card, Rank, Suit } from '../types/poker'

const rankToFilePart: Record<Rank, string> = {
  A: '1',
  K: 'king',
  Q: 'queen',
  J: 'jack',
  T: '10',
  '9': '9',
  '8': '8',
  '7': '7',
  '6': '6',
  '5': '5',
  '4': '4',
  '3': '3',
  '2': '2',
}

const suitToFilePart: Record<Suit, string> = {
  s: 'spade',
  h: 'heart',
  d: 'diamond',
  c: 'club',
}

export function getCardImage(card: Card): string {
  const rank = rankToFilePart[card.rank]
  const suit = suitToFilePart[card.suit]
  return new URL(`../assets/cards/${suit}_${rank}.png`, import.meta.url).href
}

export const CARD_BACK_IMAGE = new URL('../assets/cards/back-blue.png', import.meta.url).href
