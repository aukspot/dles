<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  onMount(() => {
    // Redirect to external Tally form
    window.location.href = 'https://tally.so/r/mOKOea'
  })
</script>

<svelte:head>
  <title>Suggest a Game - Redirecting...</title>
  <meta http-equiv="refresh" content="0; url=https://tally.so/r/mOKOea">
</svelte:head>

<div class="text-center p-8">
  <h1 class="text-2xl mb-4">Redirecting to suggestion form...</h1>
  <p class="mb-4">If you are not automatically redirected, please <a href="https://tally.so/r/mOKOea" class="underline">click here</a>.</p>
</div>