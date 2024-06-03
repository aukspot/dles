<script>
  import IconMenu from "$lib/components/Icons/IconMenu.svelte"
  import DropdownMenuButton from "$lib/components/Buttons/DropdownMenuButton.svelte"
  import Menu from "$lib/components/Menu.svelte"
</script>

<DropdownMenuButton name="main-menu">
  <IconMenu /> <span class="only-md">Menu</span>
  <div slot="menu">
    <Menu />
  </div>
</DropdownMenuButton>
