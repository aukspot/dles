<script>
  import { page } from "$app/stores";
</script>

<div>
  <h1>{$page.status}</h1>
  <h2>{$page.error.message}</h2>
  <p>Would you like to go <a href="/">home</a>?</p>
</div>

<style>
  div {
    margin: auto auto;
  }
  h1,
  h2 {
    text-align: center;
    margin: 0.5rem;
  }
</style>
