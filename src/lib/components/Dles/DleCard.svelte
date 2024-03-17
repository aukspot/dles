<script>
  import DleTagGroup from "./DleTagGroup.svelte"
  export let i
  export let dle
</script>

<div class="card">
  <div class="cardRows">
    <div class="cardTop">
      <div class="cardLabel">
        <span class="unselectable">{i}. </span>
        <span class="cardName">{dle.name}</span>
      </div>
    </div>
    <div class="cardDescription">
      {dle.description}
    </div>
    <div class="mt-2">
      <DleTagGroup tags={dle.tags}></DleTagGroup>
    </div>
  </div>

  <div class="playButton">
    <a href={dle.url} target="_blank" rel="noreferrer"
      ><button class="btn unselectable">Play</button></a
    >
  </div>
</div>

<style lang="postcss">
  .card {
    @apply flex flex-row justify-between w-full px-2 pt-1 pb-2 ring-1 ring-colorNeutralSoft shadow-md shadow-colorNeutralSofter rounded-md;
    .cardRows {
      @apply flex flex-col flex-wrap gap-y-1 justify-between w-full;
      .cardTop {
        @apply flex justify-between;
        .cardLabel {
          @apply flex items-baseline align-top gap-1;
        }
        .cardName {
          @apply text-lg font-semibold;
        }
      }
      .cardDescription {
        @apply text-sm text-colorTextSoft mt-1 sm:text-base;
      }
    }
    .playButton {
      @apply flex items-center py-1;
      a {
        button {
          @apply !px-2 !border !border-colorNeutralSoft bg-colorBackground ml-3;
        }
      }
    }
  }
</style>
