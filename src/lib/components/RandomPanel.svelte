<script>
  import MenuRandom from "./MenuRandom.svelte"
  import PanelWrapper from "./PanelWrapper.svelte"

  export let open = false
</script>

<PanelWrapper {open}>
  <MenuRandom />
</PanelWrapper>
