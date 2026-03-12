import type { TablePosition } from '../types/poker'

export const POSITION_SHORT_TOOLTIPS: Record<TablePosition, string> = {
  UTG: 'UTG — ранняя позиция (Early Position).',
  'UTG+1': 'UTG+1 — ранняя позиция (в тренажере играет как UTG).',
  MP: 'MP — средняя позиция (Middle Position).',
  'MP+1': 'MP+1 — средняя позиция в тренажере (использует диапазон HJ).',
  HJ: 'HJ (Hijack) — средняя позиция.',
  CO: 'CO (Cutoff) — поздняя позиция.',
  BTN: 'BTN (Button) — поздняя позиция, самая выгодная.',
  SB: 'SB (Small Blind) — малый блайнд.',
  BB: 'BB (Big Blind) — большой блайнд.',
}

export const POSITION_DESCRIPTIONS: Record<TablePosition, string> = {
  UTG: 'Under The Gun (EP): ранняя позиция, открывает торги одной из первых, играется тайтово.',
  'UTG+1':
    'UTG+1: в тренажёре считается ранней позицией и использует тот же диапазон, что UTG.',
  MP: 'Middle Position: средняя позиция, диапазон чуть шире из-за большей информации о действиях до вас.',
  'MP+1': 'MP+1: в тренажёре считается средней позицией и использует диапазон HJ.',
  HJ: 'Hijack: последняя из средних позиций, комфортнее разыгрывать более широкий диапазон.',
  CO: 'Cutoff: поздняя позиция перед баттоном, сильная точка для стила блайндов.',
  BTN: 'Button (Dealer): самая прибыльная позиция, максимум позиционного преимущества.',
  SB: 'Small Blind: обязательная ставка 0.5 BB.',
  BB: 'Big Blind: обязательная ставка 1 BB.',
}
