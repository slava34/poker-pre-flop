<script setup lang="ts">
import type { TrainablePosition } from '../types/poker'
import RangeChart from './RangeChart.vue'

interface WrongAttempt {
  position: TrainablePosition
  handKey: string
  correctAction: 'raise' | 'fold'
}

defineProps<{
  visible: boolean
  attempt: WrongAttempt | null
  range: Set<string>
  secondaryRange?: Set<string>
}>()

const emit = defineEmits<{
  next: []
}>()

function formatAction(action: 'raise' | 'fold'): string {
  return action === 'raise' ? 'Raise' : 'Fold'
}
</script>

<template>
  <div
    v-if="visible && attempt"
    class="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
  >
    <div class="relative z-[310] max-h-[72vh] w-full max-w-2xl overflow-auto rounded-2xl border border-slate-700 bg-slate-900 p-3.5">
      <h3 class="text-xl font-bold text-rose-300">Почему неправильно</h3>
      <p class="mt-2 text-sm text-slate-200">
        Для позиции
        <span class="font-semibold text-amber-300">{{ attempt.position }}</span>
        рука
        <span class="font-semibold text-amber-300">{{ attempt.handKey }}</span>
        {{ range.has(attempt.handKey) ? 'входит' : 'не входит' }} в диапазон.
        Правильное действие:
        <span class="font-semibold text-emerald-300">{{ formatAction(attempt.correctAction) }}</span>
      </p>

      <div class="mt-4">
        <RangeChart
          :range="range"
          :secondary-range="secondaryRange"
          :current-hand-key="attempt.handKey"
          :title="`Диапазон для ${attempt.position}`"
          compact
        />
      </div>

      <div class="mt-5 flex justify-end">
        <button
          type="button"
          class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500"
          @click="emit('next')"
        >
          Далее
        </button>
      </div>
    </div>
  </div>
</template>
