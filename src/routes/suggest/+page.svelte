<script>
  import { base } from "$app/paths"
  import SimpleLink from "../SimpleLink.svelte"

  export let url = ""
  export let description = ""
  export let comments = ""

  $: disabled = [url, description, comments].every((s) => s.length == 0)
  $: criteria = disabled ? "var(--color-red)" : "var(--color-text)"
</script>

<svelte:head>
  <title>Suggest a game!</title>
  <meta
    name="description"
    content="Suggest a game to be added to the list of dles."
  />
</svelte:head>

<div class="divider"></div>
<div class="mx-auto max-w-lg flex flex-col gap-3">
  <h2 class="mt-12 mb-0 text-center">Suggest a game!</h2>
  <p class="text-center">
    Is there a game / dle you like that is missing from the list? <br /> Make an
    anonymous suggestion below!
  </p>
  <div class="flex justify-center items-center">
    <form class="w-full" method="POST" action="https://formspree.io/f/xpzvdyzl">
      <fieldset class="p-5 flex flex-col justify-end gap-2">
        <div class="formElementContainer">
          <label for="url">URL</label>
          <input
            bind:value={url}
            type="text"
            id="url"
            name="url"
            placeholder="example.game"
          />
        </div>

        <div class="formElementContainer">
          <label for="description">Description</label>
          <textarea
            bind:value={description}
            id="description"
            name="description"
            placeholder="describe the game"
            rows="4"
          />
        </div>

        <div class="formElementContainer">
          <label for="comments">Comments</label>
          <textarea
            bind:value={comments}
            id="comments"
            name="comments"
            placeholder="share anything else here"
            rows="4"
          />
        </div>

        <p id="criteria" style="color: {criteria}">
          * Must fill at least one box.
        </p>

        <button class="btn" type="submit" {disabled}>Submit</button>
      </fieldset>
    </form>
  </div>

  <SimpleLink href="{base}/" text="Back to home" />
</div>

<style lang="postcss">
  label {
    @apply text-base;
  }

  input {
    @apply m-2;
  }

  input[type="text"],
  textarea {
    @apply p-2 font-mono text-sm;
  }

  textarea {
    @apply m-2 resize-y min-h-8 max-h-32;
  }

  .formElementContainer {
    @apply flex flex-col justify-between;
  }
</style>
