<script>
  import { onMount } from "svelte"
  import IconLightbulb from "$lib/components/Icons/IconLightbulb.svelte"
  import { useTheme } from "$lib/composables/useTheme"

  const theme = useTheme()
  const { toggleTheme } = theme

  onMount(() => {
    theme.applyTheme()
  })
</script>

<button
  on:click={toggleTheme}
  class="flex justify-end align-bottom rounded-md btn-menu-item"
>
  <IconLightbulb />
  <div>Toggle theme</div>
</button>
