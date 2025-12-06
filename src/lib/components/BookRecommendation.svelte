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
    trackEvent("book-recommendation-hidden", {})
  }

  function showCard() {
    hiddenSections.show("bookRecommendation")
    trackEvent("book-recommendation-shown", {})
  }

  $: isHidden = hiddenSections.isHidden("bookRecommendation", $hiddenSections)

  function handleBookClick(source = "main-page") {
    trackEvent("book-recommendation-click", {
      source,
      book: "nyt-puzzle-book-collection",
    })
  }

  function openModal(event) {
    pageX = event.pageX
    pageY = event.pageY
    clientY = event.clientY
    showModal = true
    trackEvent("book-modal-opened", {})
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
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          width="24"
          height="24"
        >
          <path
            d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
          />
        </svg>
      </div>
      My Book Picks
    </div>
  </div>

  {#if !isHidden}
    <div class="book-content">
      <div class="book-layout">
        <a
          href="https://amzn.to/4rFiiYf"
          target="_blank"
          rel="noopener noreferrer"
          class="book-image-container"
          on:click={handleBookClick}
        >
          <img
            src="/puzzle-mania.jpg"
            alt="Puzzle Mania book cover"
            class="book-image"
          />
        </a>

        <div class="book-text">
          <button class="book-title" on:click={openModal}>Puzzle Mania</button>
          <p class="book-description">
            Creative twists on Wordle, Connections, and more!
          </p>
        </div>
      </div>
      <button class="hide-section" on:click={hideCard}> Hide section </button>
    </div>
  {:else}
    <div class="book-content">
      <button class="hide-section" on:click={showCard}> Show section </button>
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
        <h2 class="popup-title">Puzzle Mania</h2>
        <button on:click={closeModal} class="popup-close-btn">
          <IconClose />
        </button>
        <p class="popup-description">
          Quality puzzle collection featuring creative twists on Wordle,
          Connections, and more! Perfect for your bedside or coffee table.
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
    @apply mb-2 break-inside-avoid shadow-lg shadow-colorNeutralSoft;
  }

  .book-header {
    @apply py-2 px-2 bg-gradient-to-r from-amber-600/80 to-amber-500/80 border-b-2 border-amber-700 flex items-center justify-between;
  }

  :global(.dark) .book-header {
    @apply from-amber-800/70 to-amber-700/70 border-amber-600;
  }

  .label {
    @apply m-auto flex flex-wrap justify-center items-center gap-1 text-base md:text-lg text-amber-950 font-semibold;
  }

  :global(.dark) .label {
    @apply text-amber-50;
  }

  .hide-section {
    @apply text-[12px] text-colorTextSofter hover:text-colorText underline italic transition-all cursor-pointer bg-transparent hover:bg-amber-200/60 border-none p-1 text-center w-full rounded;
  }

  :global(.dark) .hide-section {
    @apply hover:bg-amber-700/40;
  }

  .book-content {
    @apply p-2 bg-amber-50/30 flex flex-col gap-2;
  }

  :global(.dark) .book-content {
    @apply bg-amber-950/20;
  }

  .book-layout {
    @apply flex flex-row items-center gap-2;
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
    @apply text-sm md:text-base font-bold text-colorText leading-tight underline cursor-pointer hover:text-amber-700 transition-colors bg-transparent border-none p-0 text-left decoration-colorTextSoftest;
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
    @apply px-3 py-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-700 text-amber-950 font-semibold rounded text-sm shadow-sm hover:shadow-md transition-all duration-200 text-center active:scale-95 underline;
  }

  :global(.dark) .popup-cta-button {
    @apply bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white;
  }

  .popup-affiliate-disclosure {
    @apply text-[10px] text-colorTextSofter italic text-center;
  }
</style>
