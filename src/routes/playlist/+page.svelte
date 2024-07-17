<script>
  import { dles } from "$lib/stores"
  import { page } from "$app/stores"
  import DlesTable from "$lib/components/Dles/DlesTable.svelte"
  import { onMount } from "svelte"

  let params
  let playlistDles = []

  function checkCode(code) {
    const decryptedCode = atob(code)
    try {
      const splitDecryptedCode = decryptedCode.split(",")
      console.log(splitDecryptedCode)
    } catch (error) {
      return false
    }
    return true
  }

  function dlesFromParams(params) {
    let result = []
    const names = [] //params.get("list").split(",")
    const code = params.get("code")
    checkCode(code)
    for (let name of names) {
      for (let dle of $dles) {
        if (dle.name.toLowerCase() === name.toLowerCase()) {
          result.push(dle)
        }
      }
    }
    return result
  }

  onMount(() => {
    params = $page.url.searchParams
    playlistDles = dlesFromParams(params)
  })
</script>

<svelte:head>
  <title>Playlist - The Dles</title>
  <meta name="description" content="A Playlist of Dles" />
</svelte:head>

<DlesTable name="playlist" bind:dlesList={playlistDles} />
