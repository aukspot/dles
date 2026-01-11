<script>
  import { base } from "$app/paths"
  import PanelTitle from "./PanelTitle.svelte"
  import PanelWrapper from "./PanelWrapper.svelte"

  export let open = false
</script>

<PanelWrapper {open}>
  <div id="info">
    <PanelTitle color="red" title="INFO" />
    <h2 class="question">What is this?</h2>
    <p class="answer">
      A curated collection of 600+ free games that are updated daily: puzzle
      games, word games, trivia games, logic games, geography games and more!
      All games are completely free and <em
        >do not require an account or subscription.</em
      >
    </p>
    <h2 class="question">What is a dle?</h2>
    <p class="answer">
      A <strong>dle</strong>, or <em>daily game</em>, is generally a game that
      changes everyday which has the same version for everyone that plays, often
      taking inspiration from
      <a href="https://en.wikipedia.org/wiki/Wordle" target="_blank"
        >Wor<strong>dle</strong></a
      >.
    </p>
    <h2 class="question">Can I help?</h2>
    <p class="answer">
      Sure! You can <a href="https://tally.so/r/mOKOea" target="_blank"
        >suggest a dle</a
      >,
      <a href="https://tally.so/r/wQpPpY" target="_blank">report a bug</a>, or
      <a href="https://tally.so/r/wQpPpY" target="_blank"
        >give general feedback</a
      >. If you want to support monetarily, you can
      <a href="https://ko-fi.com/aukspot" target="_blank">donate on Ko-fi</a>.
      Lastly, you can
      <a href="https://github.com/aukspot/dles" target="_blank"
        >look at the code on GitHub</a
      >
      and propose changes, as this project is open source.
    </p>
    <div class="divider mt-2"></div>
    <p class="answer">
      "They call them the dles, but they are anything but." - <em
        >Northernlion</em
      >
    </p>
  </div>
</PanelWrapper>

<!-- class="fixed z-30 top-[50%] md:top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] min-w-80 max-w-[32rem] p-4 bg-colorCardA rounded-lg border-4 border-colorTextSoft shadow-md shadow-colorTextSofter" -->

<style lang="postcss">
  p {
    @apply text-center;
  }
  .question {
    @apply mt-2 text-sm font-bold md:text-base text-center;
  }
  .answer {
    @apply mt-1 text-xs md:text-sm leading-snug;
  }
  a {
    @apply underline;
  }
</style>
