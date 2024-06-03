<script>
  import IconMenu from "$lib/components/Icons/IconMenu.svelte"
  import Settings from "$lib/components/Settings.svelte"
  import DropdownMenuButton from "../DropdownMenuButton.svelte"
</script>

<DropdownMenuButton>
  <IconMenu /> <span class="only-md">Settings</span>
  <div slot="menu">
    <Settings />
  </div>
</DropdownMenuButton>
