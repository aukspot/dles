<script>
  import { base } from "$app/paths"
  import SimpleLink from "../SimpleLink.svelte"
  import SimpleCard from "../SimpleCard.svelte"

  export let url = ""
  export let description = ""
  export let comments = ""

  $: disabled = [url, description, comments].every((s) => s.length == 0)
  $: criteria = disabled ? "text-colorError" : ""
</script>

<svelte:head>
  <title>Suggest a game!</title>
  <meta
    name="description"
    content="Suggest a game to be added to the list of dles."
  />
</svelte:head>
<SimpleLink href="{base}/" text="Go back to collection" />

<div class="divider"></div>
<div class="mt-8 mx-auto sm:w-full max-w-lg flex flex-col gap-3">
  <SimpleCard>
    <h2 class="mb-0 text-center text-lg font-semibold">Suggest a game!</h2>
    <p class="text-center text-colorTextSoft px-2">
      Is there a fun game / dle that is missing from the list? Make an anonymous
      suggestion below!
    </p>
    <div class="flex justify-center items-center">
      <form
        class="w-full"
        method="POST"
        action="https://formspree.io/f/xpzvdyzl"
      >
        <fieldset class="p-1 flex flex-col justify-end gap-2 bg-colorCardA">
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

          <p id="criteria" class="text-center {criteria}">
            * Must fill at least one box.
          </p>

          <button class="btn mt-2 mx-auto w-48" type="submit" {disabled}
            >Submit</button
          >
        </fieldset>
      </form>
    </div>
  </SimpleCard>
</div>

<style lang="postcss">
  .formElementContainer {
    @apply flex flex-col justify-between;
  }
</style>
