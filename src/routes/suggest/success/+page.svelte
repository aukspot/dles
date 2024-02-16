<script>
  import SimpleLink from "../../SimpleLink.svelte";
</script>

<div class="container">
  <h2>Success!</h2>
  <p>Suggestion successfully submitted.</p>
  <SimpleLink href="/dles/suggest" text="Submit another suggestion." />
  <SimpleLink href="/" text="Go home." />
</div>

<style>
  .container {
    margin: 0 auto;
    max-width: 30rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  h2 {
    margin-top: 3rem;
    margin-bottom: 0;
  }

  h2,
  p {
    text-align: center;
  }
</style>
