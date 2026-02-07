<script>
  import { settings } from "$lib/stores"
  import BackToTopButton from "../Buttons/BackToTopButton.svelte"
  import DlesByCategory from "./DlesByCategory.svelte"
  import DlesByCategoryNoScript from "./DlesByCategoryNoScript.svelte"
  import { onMount } from "svelte"
  import { isLocalStorageAvailable } from "$lib/js/utilities"

  // Migrate DetailedView to Category View (deprecation)
  onMount(() => {
    if (isLocalStorageAvailable() && localStorage.view === "Detailed View") {
      $settings.view = "Category View"
      localStorage.view = "Category View"
    }
  })
</script>

<DlesByCategory />

<noscript>
  <DlesByCategoryNoScript />
</noscript>

<BackToTopButton />
