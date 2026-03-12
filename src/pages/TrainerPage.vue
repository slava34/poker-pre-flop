<script setup lang="ts">
import { computed } from 'vue'
import PokerTable from '../components/PokerTable.vue'
import RangeChart from '../components/RangeChart.vue'
import ResultModal from '../components/ResultModal.vue'
import { POSITION_SHORT_TOOLTIPS } from '../data/positions'
import { getRangeForPosition, getSecondaryRangeForPosition } from '../data/ranges'
import { useTrainerStore } from '../stores/trainer'

const trainer = useTrainerStore()

const wrongAttemptRange = computed(() => {
  if (!trainer.lastWrongAttempt) return trainer.currentRange
  return getRangeForPosition(trainer.lastWrongAttempt.position)
})

const currentSecondaryRange = computed(() => getSecondaryRangeForPosition(trainer.currentRound.position))
const wrongAttemptSecondaryRange = computed(() => {
  if (!trainer.lastWrongAttempt) return getSecondaryRangeForPosition(trainer.currentRound.position)
  return getSecondaryRangeForPosition(trainer.lastWrongAttempt.position)
})

function onRaise() {
  if (trainer.isWrongModalOpen) return
  trainer.submitAction('raise')
}

function onFold() {
  if (trainer.isWrongModalOpen) return
  trainer.submitAction('fold')
}
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 px-4 py-4 md:px-6">
    <header class="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 class="text-xl font-bold text-slate-100">Poker Preflop Trainer</h1>
          <p class="mt-1 text-sm text-slate-300">
            Позиция:
            <span class="font-semibold text-amber-300">{{ trainer.currentRound.position }}</span>
          </p>
        </div>

        <div class="flex items-center gap-4 text-sm">
          <div class="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2">
            <p class="whitespace-nowrap">
              ✅ Верно: {{ trainer.correctCount }}
              <span class="mx-2 text-slate-400">|</span>
              ❌ Неверно: {{ trainer.wrongCount }}
              <span class="mx-2 text-slate-400">|</span>
              📊 Точность: {{ trainer.accuracy }}%
            </p>
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              class="rounded-lg border border-slate-600 px-3 py-2 text-slate-200 transition hover:bg-slate-800"
              @click="trainer.resetStats"
            >
              Сброс
            </button>
            <RouterLink
              to="/"
              class="rounded-lg bg-slate-700 px-3 py-2 font-medium text-slate-100 transition hover:bg-slate-600"
            >
              В главное меню
            </RouterLink>
          </div>
        </div>
      </div>
    </header>

    <div class="grid gap-5 xl:grid-cols-[132px_1.3fr_1fr_132px] xl:items-center">
      <button
        type="button"
        class="hidden h-24 w-24 justify-self-center rounded-full border-4 border-rose-300 bg-rose-600/90 text-3xl font-bold text-white shadow-[0_0_25px_rgba(225,29,72,0.55)] transition hover:scale-105 hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-40 xl:flex xl:items-center xl:justify-center"
        :disabled="trainer.isWrongModalOpen"
        @click="onFold"
      >
        ❌
      </button>

      <PokerTable :round="trainer.currentRound" />

      <RangeChart
        class="xl:max-w-[420px]"
        :range="trainer.currentRange"
        :secondary-range="currentSecondaryRange"
        :current-hand-key="trainer.currentRound.handKey"
        :title="`Диапазон: ${trainer.currentRound.position}`"
        :title-tooltip="POSITION_SHORT_TOOLTIPS[trainer.currentRound.position]"
      />

      <button
        type="button"
        class="hidden h-24 w-24 justify-self-center rounded-full border-4 border-emerald-300 bg-emerald-600/90 text-3xl font-bold text-white shadow-[0_0_25px_rgba(16,185,129,0.55)] transition hover:scale-105 hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40 xl:flex xl:items-center xl:justify-center"
        :disabled="trainer.isWrongModalOpen"
        @click="onRaise"
      >
        ✅
      </button>
    </div>

    <div class="flex items-center justify-center gap-3 xl:hidden">
      <button
        type="button"
        class="min-w-40 rounded-xl bg-rose-600 px-6 py-4 text-lg font-bold text-rose-50 transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="trainer.isWrongModalOpen"
        @click="onFold"
      >
        ❌ Fold
      </button>
      <button
        type="button"
        class="min-w-40 rounded-xl bg-emerald-600 px-6 py-4 text-lg font-bold text-emerald-50 transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="trainer.isWrongModalOpen"
        @click="onRaise"
      >
        ✅ Raise
      </button>
    </div>

    <ResultModal
      :visible="trainer.isWrongModalOpen"
      :attempt="trainer.lastWrongAttempt"
      :range="wrongAttemptRange"
      :secondary-range="wrongAttemptSecondaryRange"
      @next="trainer.closeWrongModalAndContinue"
    />
  </main>
</template>
