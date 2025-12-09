<script>
  import { trackEvent } from "$lib/js/trackingUtils"
  import { clickOutside } from "$lib/js/clickOutside"
  import IconClose from "./Icons/IconClose.svelte"
  import { hiddenSections } from "$lib/js/hiddenSections"

  let showModal = false
  let pageX = 0
  let pageY = 0
  let clientY = 0

  const modalWidth = 320
  const modalHeight = 200

  function hideCard() {
    hiddenSections.hide("bookRecommendation")
  }

  function showCard() {
    hiddenSections.show("bookRecommendation")
  }

  $: isHidden = hiddenSections.isHidden("bookRecommendation", $hiddenSections)

  function handleBookClick(source = "main-page") {
    trackEvent("book-recommendation-click", {
      source,
      book: "puzzle-mania",
    })
  }

  function openModal(event) {
    pageX = event.pageX
    pageY = event.pageY
    clientY = event.clientY
    showModal = true
  }

  function closeModal() {
    showModal = false
  }

  $: adjustedPageX = (() => {
    let x = pageX
    if (x < modalWidth / 2) {
      x = modalWidth / 2 + 5
    }
    if (x + modalWidth / 2 > document.documentElement.clientWidth) {
      x = document.documentElement.clientWidth - modalWidth / 2 - 5
    }
    return x
  })()

  $: adjustedPageY = (() => {
    let y = pageY
    if (clientY < modalHeight) {
      y += modalHeight - clientY
    }
    return y
  })()
</script>

<div class="book-card">
  <div class="book-header">
    <div class="label">
      <div class="flex-shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          width="28"
          ><path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 19V6.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C5.52 3 6.08 3 7.2 3h9.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C20 4.52 20 5.08 20 6.2V17H6a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h14M9 7h6m-6 4h6m4 6v4"
          /></svg
        >
      </div>
      My Book Picks
    </div>
  </div>

  {#if !isHidden}
    <div class="book-content">
      <div class="book-layout">
        <button class="book-image-container" on:click={openModal}>
          <img
            src="/puzzle-mania.jpg"
            alt="Puzzle Mania book cover"
            class="book-image"
          />
        </button>

        <div class="book-text">
          <button class="book-title" on:click={openModal}>Puzzle Mania!</button>
          <p class="book-description">
            Creative twists on Wordle, Connections, and more!
          </p>
        </div>
      </div>
      <button class="hide-section" on:click={hideCard}>
        Hide section (1)
      </button>
    </div>
  {:else}
    <div class="book-content">
      <button class="hide-section" on:click={showCard}>
        Show section (1)
      </button>
    </div>
  {/if}

  {#if showModal}
    <div
      class="book-popup bevel"
      style="left: {adjustedPageX}px; top: {adjustedPageY}px; width: {modalWidth}px"
      use:clickOutside
      on:click_outside={closeModal}
    >
      <div class="popup-grid">
        <img
          src="/puzzle-mania.jpg"
          alt="Puzzle Mania book cover"
          class="popup-book-image"
        />

        <h2 class="popup-title">Puzzle Mania!</h2>
        <button on:click={closeModal} class="popup-close-btn">
          <IconClose />
        </button>
        <p class="popup-description">
          Unique puzzle collection with creative twists on Wordle, Connections,
          and more! I keep a copy next to my bed.
        </p>
      </div>

      <a
        href="https://amzn.to/4rFiiYf"
        target="_blank"
        rel="noopener noreferrer"
        class="popup-cta-button"
        on:click={() => handleBookClick("modal")}
      >
        View book on Amazon
      </a>

      <p class="popup-affiliate-disclosure">
        Affiliate link - I may earn a commission at no extra cost.
      </p>
    </div>
  {/if}
</div>

<style lang="postcss">
  .book-card {
    @apply mb-2 break-inside-avoid shadow-sm shadow-colorNeutralSoft;
  }

  .book-header {
    @apply py-2 px-2 bg-gradient-to-r from-amber-600/80 to-amber-500/80 border-b-2 border-colorText flex items-center justify-between;
  }

  :global(.dark) .book-header {
    @apply from-amber-800/70 to-amber-700/70;
  }

  .label {
    @apply m-auto flex flex-wrap justify-center items-center gap-1 text-base md:text-lg text-colorText font-semibold;
  }

  :global(.dark) .label {
    @apply text-amber-50;
  }

  .hide-section {
    @apply text-[12px] text-colorTextSofter hover:text-colorText underline italic cursor-pointer bg-transparent hover:bg-yellow-50 bg-colorCardC border-none p-2 text-center w-full rounded;
  }

  :global(.dark) .hide-section {
    @apply hover:bg-slate-950;
  }

  .book-content {
    @apply bg-colorCardB flex flex-col gap-2;
  }

  :global(.dark) .book-content {
    @apply bg-colorCardB;
  }

  .book-layout {
    @apply flex flex-row items-center gap-2 p-2;
  }

  .book-image-container {
    @apply flex-shrink-0 w-10 md:w-14 hover:opacity-90 transition-opacity;
  }

  .book-image {
    @apply w-full h-auto rounded shadow-sm border border-amber-200/50;
  }

  :global(.dark) .book-image {
    @apply border-amber-800/50;
  }

  .book-text {
    @apply flex-1 flex flex-col gap-1;
  }

  .book-title {
    @apply text-sm md:text-base text-colorText leading-tight underline cursor-pointer hover:decoration-colorTextSoft transition-transform duration-300 bg-transparent border-none p-0 text-left decoration-colorTextSoftest;
    text-decoration-thickness: 2px;
  }

  :global(.dark) .book-title {
    @apply hover:text-amber-400;
  }

  .book-description {
    @apply text-xs text-colorText leading-snug;
  }

  /* Popup styles */
  .book-popup {
    @apply absolute p-3 flex flex-col gap-2 bg-colorCardC rounded-lg shadow-sm shadow-colorTextSoftest z-50;
    transform: translate(-50%, -99%);
  }

  .popup-grid {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto auto;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .popup-book-image {
    @apply w-16 min-w-16 h-auto rounded shadow-sm border border-colorNeutralSoft;
    grid-row: 1 / 3;
    grid-column: 1;
  }

  .popup-title {
    @apply text-base font-bold text-colorText text-left;
    grid-row: 1;
    grid-column: 2;
  }

  .popup-close-btn {
    @apply bg-transparent border-none cursor-pointer p-0 text-colorText hover:text-colorTextSofter transition-colors;
    grid-row: 1;
    grid-column: 3;
  }

  .popup-description {
    @apply text-xs text-colorText leading-snug;
    grid-row: 2;
    grid-column: 2 / 4;
  }

  .popup-cta-button {
    @apply px-3 py-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-700 text-amber-950 font-semibold rounded text-sm shadow-sm hover:shadow-md transition-all duration-200 text-center active:scale-95;
  }

  :global(.dark) .popup-cta-button {
    @apply bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white;
  }

  .popup-affiliate-disclosure {
    @apply text-[10px] text-colorTextSofter italic text-center;
  }
</style>
