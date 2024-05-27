<script>
  import { base } from "$app/paths"
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import { infoHidden } from "$lib/stores"

  onMount(() => {
    $infoHidden = localStorage.closedBefore !== undefined
  })

  function hideInfo() {
    $infoHidden = true
    localStorage.closedBefore = true
  }
</script>

<div
  id="info"
  class="{$infoHidden ? 'hidden' : ''} m-auto max-w-[36rem] p-2"
  transition:fade
>
  <!-- <div class="text-center text-xl md:text-2xl font-semibold">Welcome to</div>
  <h1 class="text-center text-3xl md:text-4xl font-bold">THE DLES</h1> -->

  <div class="divider"></div>
  <p class="question">What is a dle?</p>
  <p class="answer">
    A <strong>dle</strong>, or <em>daily game</em>, is generally a game that
    changes everyday which has the same version for everyone that plays, often
    taking inspiration from
    <a href="https://en.wikipedia.org/wiki/Wordle" target="_blank"
      >Wor<strong>dle</strong></a
    >.
  </p>
  <p class="question">What is this?</p>
  <p class="answer">
    A collection of the best dles that I've come across. All of these games <em
      >don't require an account or subscription.</em
    >
  </p>
  <p class="question">Can I help?</p>
  <p class="answer">
    Sure! You can <a href="{base}/suggest" on:click={hideInfo}>suggest a dle</a>
    or
    <a href="{base}/report" on:click={hideInfo}>report a bug</a>. If you want to
    support monetarily, you can
    <a href="https://ko-fi.com/aukspot" target="_blank">donate on Ko-fi</a>.
    Lastly, you can
    <a href="https://github.com/aukspot/dles" target="_blank"
      >look at the code on GitHub</a
    >
    and propose changes, as this project is open source.
  </p>
  <div class="divider"></div>
  <p class="answer">
    "They call them the dles, but they are anything but." - <em>Northernlion</em
    >
  </p>

  <button
    on:click={hideInfo}
    class="my-4 p-1 rounded-md w-full bg-colorCardB shadow-md active:shadow-none"
    >Hide above info</button
  >
</div>
<svelte:document />

<!-- class="fixed z-30 top-[50%] md:top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] min-w-80 max-w-[32rem] p-4 bg-colorCardA rounded-lg border-4 border-colorTextSoft shadow-md shadow-colorTextSofter" -->

<style lang="postcss">
  p {
    @apply text-center;
  }
  .question {
    @apply mt-2 text-sm font-bold md:text-base;
  }
  .answer {
    @apply mt-1 text-xs md:text-sm;
  }
</style>
