<template>
  <main class="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
    <p class="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-4 py-1 text-xs text-emerald-300">
      Texas Hold'em • 9-max • Open-Raise / Fold
    </p>
    <h1 class="mt-5 text-4xl font-extrabold tracking-tight text-slate-100 md:text-5xl">
      Poker Preflop Trainer
    </h1>
    <p class="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
      Тренажёр префлоп-решений по позициям за 9-max столом. Для каждой раздачи выбирается позиция, выдаётся рука
      и нужно быстро решить: <span class="font-semibold text-emerald-300">Raise</span> или
      <span class="font-semibold text-rose-300">Fold</span>.
    </p>

    <RouterLink
      to="/trainer"
      class="mt-8 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-indigo-100 transition hover:bg-indigo-500"
    >
      Начать
    </RouterLink>
  </main>
</template>
