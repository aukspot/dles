<script>
  import FavoriteButton from "../Buttons/FavoriteButton.svelte"
  export let i
  export let dle

  function trackGameClick(dle, clickType) {
    if (typeof window !== 'undefined' && window.umami) {
      window.umami.track('game-click', {
        game_name: dle.name,
        game_category: dle.category,
        game_id: dle.id,
        click_type: clickType, // 'play-button' or 'title-link'
        game_position: i,
        view_type: 'card'
      });
    }
  }
</script>

<div class="card">
  <div class="cardRows">
    <div class="cardTop">
      <div class="cardLabel">
        <span class="unselectable">{i}. </span>
        <span class="cardName"><a href={dle.url} on:click={() => trackGameClick(dle, 'title-link')}>{dle.name}</a></span>
      </div>
    </div>
    <div class="cardDescription">
      {dle.description}
    </div>
  </div>

  <div class="playButton">
    <span class="flex items-baseline">
      <FavoriteButton {dle} />
    </span>
    <a class="flex justify-center" href={dle.url} target="_blank" rel="noopener" on:click={() => trackGameClick(dle, 'play-button')}
      ><button class="btn unselectable">Play</button></a
    >
  </div>
</div>

<style lang="postcss">
  .card {
    @apply flex flex-row justify-between w-full px-2 pt-1 pb-2 ring-1 ring-colorNeutralSoft shadow-md shadow-colorNeutralSofter rounded-md;
  }
  .cardRows {
    @apply flex flex-col flex-wrap gap-y-1 justify-between w-full;
  }
  .cardTop {
    @apply flex justify-between;
  }
  .cardLabel {
    @apply flex items-baseline align-top gap-1;
  }
  .cardName {
    @apply text-lg md:text-xl font-semibold;
    a {
      @apply text-colorText;
    }
  }
  .cardDescription {
    @apply text-sm text-colorTextSoft mt-1 sm:text-base md:text-lg;
  }
  .playButton {
    @apply ml-3 flex flex-col justify-between items-center py-1;
    a {
      button {
        @apply !px-3 !border !border-colorNeutralSoft bg-colorBackground;
      }
    }
  }
</style>
