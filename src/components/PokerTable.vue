<script setup lang="ts">
import type { RoundState, TablePosition } from '../types/poker'
import { TABLE_POSITIONS } from '../types/poker'
import HandView from './HandView.vue'

const props = defineProps<{
  round: RoundState
}>()

const seatStyleMap: Record<TablePosition, string> = {
  UTG: 'left-[50%] top-[13%]',
  'UTG+1': 'left-[77%] top-[20%]',
  MP: 'left-[90%] top-[38%]',
  'MP+1': 'left-[86%] top-[61%]',
  HJ: 'left-[74%] top-[79%]',
  CO: 'left-[50%] top-[89%]',
  BTN: 'left-[26%] top-[79%]',
  SB: 'left-[14%] top-[61%]',
  BB: 'left-[10%] top-[38%]',
}

type PositionGroup = 'ранние позиции' | 'средние позиции' | 'поздние позиции' | ''

const groupByPosition: Record<TablePosition, PositionGroup> = {
  UTG: 'ранние позиции',
  'UTG+1': 'ранние позиции',
  MP: 'средние позиции',
  'MP+1': 'средние позиции',
  HJ: 'средние позиции',
  CO: 'поздние позиции',
  BTN: 'поздние позиции',
  SB: '',
  BB: '',
}

const groupLegend = [
  { label: 'раннцие позии', dotClass: 'bg-rose-400' },
  { label: 'Средняя позия', dotClass: 'bg-amber-400' },
  { label: 'позняя позиция', dotClass: 'bg-emerald-400' },
] as const

function seatGroup(position: TablePosition): PositionGroup {
  return groupByPosition[position]
}

function groupSeatClass(position: TablePosition): string {
  const group = seatGroup(position)
  if (group === 'ранние позиции') return 'border-rose-300/55 bg-rose-500/10'
  if (group === 'средние позиции') return 'border-amber-300/55 bg-amber-500/10'
  if (group === 'поздние позиции') return 'border-emerald-300/55 bg-emerald-500/10'
  return 'border-slate-500/70 bg-slate-900/65'
}

</script>

<template>
  <div class="mx-auto w-full max-w-5xl">
    <div
      class="mb-3 flex flex-wrap items-center justify-center gap-4 rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2"
    >
      <div
        v-for="item in groupLegend"
        :key="item.label"
        class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-slate-100"
      >
        <span class="h-2.5 w-2.5 rounded-full" :class="item.dotClass"></span>
        <span>{{ item.label }}</span>
      </div>
    </div>

    <section class="relative h-[640px] overflow-visible">
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[52%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-4 border-emerald-700/50 bg-gradient-to-b from-emerald-900 to-emerald-950 shadow-2xl shadow-black/50"
    ></div>
    <div
      class="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[44%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-emerald-300/20"
    ></div>
    <div
      v-for="position in TABLE_POSITIONS"
      :key="position"
      class="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-xl border px-2 py-2 backdrop-blur"
      :class="[
        seatStyleMap[position],
        round.position === position ? 'w-[176px]' : 'w-[124px]',
        round.position === position ? 'z-[90]' : 'z-[80]',
        round.position === position
          ? 'border-amber-200 bg-amber-200/15 ring-4 ring-amber-300 shadow-[0_0_28px_rgba(252,211,77,0.55)]'
          : groupSeatClass(position),
      ]"
    >
      <div class="flex items-center gap-2">
        <p
          class="relative z-[95] text-xs font-semibold tracking-wide"
          :class="round.position === position ? 'text-amber-200' : 'text-slate-100'"
        >
          {{ position }}
        </p>
      </div>

      <div class="relative" :class="round.position === position ? 'z-[100]' : 'z-[80]'">
        <HandView :cards="round.seatCards[position]" :concealed="round.position !== position" compact />
      </div>
    </div>
    </section>
  </div>
</template>
