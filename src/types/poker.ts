export const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'] as const
export const SUITS = ['s', 'h', 'd', 'c'] as const

export type Rank = (typeof RANKS)[number]
export type Suit = (typeof SUITS)[number]
export type HandKey = string

export interface Card {
  rank: Rank
  suit: Suit
}

export const TABLE_POSITIONS = ['UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO', 'BTN', 'SB', 'BB'] as const
export const TRAINABLE_POSITIONS = ['UTG', 'UTG+1', 'MP', 'MP+1', 'HJ', 'CO', 'BTN'] as const

export type TablePosition = (typeof TABLE_POSITIONS)[number]
export type TrainablePosition = (typeof TRAINABLE_POSITIONS)[number]

export type SeatCardsMap = Record<TablePosition, [Card, Card]>

export interface RoundState {
  position: TrainablePosition
  handCards: [Card, Card]
  handKey: HandKey
  seatCards: SeatCardsMap
  buttonIndex: number
  sbIndex: number
  bbIndex: number
}
