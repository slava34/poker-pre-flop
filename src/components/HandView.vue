<script setup lang="ts">
import { computed } from 'vue'
import type { Card } from '../types/poker'
import { CARD_BACK_IMAGE, getCardImage } from '../utils/cardAssets'

const props = defineProps<{
  cards: [Card, Card]
  concealed?: boolean
  compact?: boolean
}>()

const cardClass = computed(() => {
  if (!props.compact) {
    return 'h-32 w-[5.6rem] md:h-36 md:w-[6.2rem]'
  }

  // Make cards larger and especially highlight the player's visible hand.
  return props.concealed
    ? 'h-[3.5rem] w-[2.4rem] md:h-[3.9rem] md:w-[2.7rem]'
    : 'h-[5.2rem] w-[3.6rem] md:h-[5.9rem] md:w-[4.1rem]'
})

function getImageForCard(card: Card) {
  return props.concealed ? CARD_BACK_IMAGE : getCardImage(card)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <img
      v-for="(card, index) in cards"
      :key="index"
      :src="getImageForCard(card)"
      :alt="concealed ? 'Card back' : `${card.rank}${card.suit}`"
      class="rounded-md border border-slate-300 bg-white object-contain p-0.5 shadow-lg shadow-slate-950/70"
      :class="cardClass"
      draggable="false"
    />
  </div>
</template>
