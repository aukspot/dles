<script>
  import { settings } from "$lib/stores"
  import BackToTopButton from "../Buttons/BackToTopButton.svelte"
  import DlesByCategory from "./DlesByCategory.svelte"
  import DlesByCategoryNoScript from "./DlesByCategoryNoScript.svelte"
  import DlesDetailed from "./DlesDetailed.svelte"
</script>

{#if $settings.view == "Detailed View"}
  <DlesDetailed />
{:else if $settings.view == "Category View"}
  <DlesByCategory />

{/if}

<noscript>
  <DlesByCategoryNoScript />
</noscript>

<BackToTopButton />
