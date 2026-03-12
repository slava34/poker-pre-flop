<script setup lang="ts">
import { computed } from 'vue'
import { normalizeHandKey } from '../data/ranges'
import { RANKS } from '../types/poker'

const props = withDefaults(
  defineProps<{
    range: Set<string>
    secondaryRange?: Set<string>
    currentHandKey?: string
    title?: string
    titleTooltip?: string
    compact?: boolean
  }>(),
  {
    currentHandKey: '',
    title: 'Range Chart 13x13',
    titleTooltip: '',
    compact: false,
  },
)

const normalizedCurrent = computed(() => normalizeHandKey(props.currentHandKey))

function cellKey(row: string, col: string, rowIndex: number, colIndex: number): string {
  if (rowIndex === colIndex) {
    return `${row}${col}`
  }

  if (colIndex > rowIndex) {
    return `${row}${col}s`
  }

  return `${col}${row}o`
}

function isInRange(key: string): boolean {
  return props.range.has(key)
}

function isInSecondaryRange(key: string): boolean {
  return props.secondaryRange?.has(key) ?? false
}

function isCurrent(key: string): boolean {
  return normalizedCurrent.value === key
}

function cellClass(key: string): string {
  if (isInSecondaryRange(key)) {
    return 'border-cyan-300/40 bg-cyan-500 text-cyan-950'
  }
  if (isInRange(key)) {
    return 'border-orange-300/30 bg-orange-500 text-orange-950'
  }
  return 'border-slate-600 bg-slate-800 text-slate-200'
}
</script>

<template>
  <section class="rounded-2xl border border-slate-700 bg-slate-900/80" :class="props.compact ? 'p-2' : 'p-4'">
    <div class="mb-3 flex items-center justify-between gap-2">
      <div class="flex items-center gap-1.5">
        <h3 class="font-semibold text-slate-100" :class="props.compact ? 'text-sm' : 'text-base'">{{ title }}</h3>
        <div v-if="props.titleTooltip" class="group relative inline-flex">
          <button
            type="button"
            class="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-500 text-[10px] text-slate-200 outline-none"
          >
            ⓘ
          </button>
          <div
            class="pointer-events-none absolute left-1/2 top-full z-[220] mt-1 hidden w-56 -translate-x-1/2 rounded-md border border-slate-600 bg-slate-900/95 px-2 py-1 text-[11px] text-slate-100 shadow-xl group-hover:block group-focus-within:block"
          >
            {{ props.titleTooltip }}
          </div>
        </div>
      </div>
      <div class="flex items-center gap-3 text-slate-300" :class="props.compact ? 'text-[10px]' : 'text-xs'">
        <span class="inline-flex items-center gap-1">
          <span class="rounded bg-emerald-500" :class="props.compact ? 'h-2 w-2' : 'h-3 w-3'"></span>
          In range
        </span>
        <span class="inline-flex items-center gap-1">
          <span class="rounded border-2 border-amber-300" :class="props.compact ? 'h-2 w-2' : 'h-3 w-3'"></span>
          Current hand
        </span>
      </div>
    </div>

    <div
      class="mx-auto grid grid-cols-13"
      :class="props.compact ? 'max-w-[330px] gap-0.5 text-[9px]' : 'gap-1 text-[10px] sm:text-xs'"
    >
      <template v-for="(row, rowIndex) in RANKS" :key="`row-${row}`">
        <template v-for="(col, colIndex) in RANKS" :key="`${row}-${col}`">
          <div
            class="flex aspect-square items-center justify-center rounded border font-semibold transition-colors"
            :class="{
              [cellClass(cellKey(row, col, rowIndex, colIndex))]: true,
              'ring-2 ring-amber-300 ring-offset-1 ring-offset-slate-900': isCurrent(
                cellKey(row, col, rowIndex, colIndex),
              ),
            }"
          >
            {{ cellKey(row, col, rowIndex, colIndex) }}
          </div>
        </template>
      </template>
    </div>
  </section>
</template>
