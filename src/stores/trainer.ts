import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getRangeForPosition, isHandInRange } from '../data/ranges'
import { TRAINABLE_POSITIONS, TABLE_POSITIONS, type RoundState, type TrainablePosition } from '../types/poker'
import { dealTableHands, toHandKey } from '../utils/cards'

type Action = 'raise' | 'fold'

interface AttemptResult {
  position: TrainablePosition
  handKey: string
  selectedAction: Action
  correctAction: Action
  isCorrect: boolean
}

const HISTORY_LIMIT = 20

function randomFrom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function createRound(): RoundState {
  const position = randomFrom(TRAINABLE_POSITIONS)
  const seatCards = dealTableHands()
  const handCards = seatCards[position]
  const handKey = toHandKey(handCards)

  const buttonIndex = Math.floor(Math.random() * TABLE_POSITIONS.length)
  const sbIndex = (buttonIndex + 1) % TABLE_POSITIONS.length
  const bbIndex = (buttonIndex + 2) % TABLE_POSITIONS.length

  return {
    position,
    handCards,
    handKey,
    seatCards,
    buttonIndex,
    sbIndex,
    bbIndex,
  }
}

export const useTrainerStore = defineStore('trainer', () => {
  const correctCount = ref(0)
  const wrongCount = ref(0)
  const currentRound = ref<RoundState>(createRound())
  const lastWrongAttempt = ref<AttemptResult | null>(null)
  const history = ref<AttemptResult[]>([])

  const total = computed(() => correctCount.value + wrongCount.value)
  const accuracy = computed(() => {
    if (total.value === 0) return 0
    return Number(((correctCount.value / total.value) * 100).toFixed(1))
  })

  const currentRange = computed(() => getRangeForPosition(currentRound.value.position))
  const isWrongModalOpen = computed(() => lastWrongAttempt.value !== null)

  function startNextRound() {
    currentRound.value = createRound()
  }

  function pushHistory(result: AttemptResult) {
    history.value = [result, ...history.value].slice(0, HISTORY_LIMIT)
  }

  function submitAction(selectedAction: Action): AttemptResult {
    const round = currentRound.value
    const handInRange = isHandInRange(round.position, round.handKey)
    const correctAction: Action = handInRange ? 'raise' : 'fold'
    const isCorrect = selectedAction === correctAction

    const result: AttemptResult = {
      position: round.position,
      handKey: round.handKey,
      selectedAction,
      correctAction,
      isCorrect,
    }

    pushHistory(result)

    if (isCorrect) {
      correctCount.value += 1
      startNextRound()
    } else {
      wrongCount.value += 1
      lastWrongAttempt.value = result
    }

    return result
  }

  function closeWrongModalAndContinue() {
    lastWrongAttempt.value = null
    startNextRound()
  }

  function resetStats() {
    correctCount.value = 0
    wrongCount.value = 0
    history.value = []
    lastWrongAttempt.value = null
    startNextRound()
  }

  return {
    correctCount,
    wrongCount,
    total,
    accuracy,
    history,
    currentRound,
    currentRange,
    isWrongModalOpen,
    lastWrongAttempt,
    submitAction,
    closeWrongModalAndContinue,
    resetStats,
    startNextRound,
  }
})
