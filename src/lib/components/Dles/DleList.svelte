<script>
  import { settings } from "$lib/stores"
  import DlesByCategory from "./DlesByCategory.svelte"
  import DlesDetailed from "./DlesDetailed.svelte"
</script>

<!-- <div
  class="mt-3 pt-3 pb-1 border border-colorNeutral leading-6 align-middle font-mono rounded text-center text-2xl shadow-sm shadow-colorNeutralSoft md:text-3xl"
>
  <strong>{$filteredDles.length}</strong>
  {$filteredDles.length != 1 ? "dles" : "dle"}
  {#if includedTags.length > 0}
    <div class="mt-1 text-sm md:text-base">
      {$filteredDles.length != 1 ? "have" : "has"} the {includedTags.length > 1
        ? "tags"
        : "tag"}
      <FilterTagGroup tags={includedTags} type="include" inDropdown={false} />
    </div>
  {/if}
  <div class="mt-1 text-sm md:text-base">
    {#if excludedTags.length > 0}
      {#if includedTags.length > 0}
        but not the
      {:else}
        don't have the
      {/if}
      {excludedTags.length > 1 ? "tags" : "tag"}
    {/if}
    <FilterTagGroup tags={excludedTags} type="exclude" inDropdown={false} />
  </div>
</div>
<Toolbar /> -->

{#if $settings.view == "detailed"}
  <DlesDetailed />
{:else if $settings.view == "categories"}
  <DlesByCategory />
{/if}

<noscript>
  <DlesByCategory />
</noscript>
