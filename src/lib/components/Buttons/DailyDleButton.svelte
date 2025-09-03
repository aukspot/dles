<script>
  import { filteredDles } from "$lib/stores"
  import IconNew from "../Icons/IconNew.svelte"
  import MenuDaily from "../MenuDaily.svelte"
  import Random from "../MenuRandom.svelte"
  import DropdownMenuButton from "./DropdownMenuButton.svelte"
  let url = ""
  let dle = {
    url,
  }

  function randomDle() {
    let randomIndex = Math.floor(Math.random() * $filteredDles.length)
    return $filteredDles[randomIndex]
  }

  async function playRandomDle() {
    dle = randomDle()
    this.parentElement.href = dle.url
    setTimeout(() => {
      this.parentElement.href = "?random"
    }, 300)
  }
</script>

<DropdownMenuButton name="random-menu">
  <IconNew /><span class="only-md">Daily DLE Mode</span>
  <div slot="menu">
    <MenuDaily />
  </div>
</DropdownMenuButton>
