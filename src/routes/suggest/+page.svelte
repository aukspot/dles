<script>
  import { base } from "$app/paths"
  import SimpleLink from "$lib/components/SimpleLink.svelte"
  import SimpleCard from "$lib/components/SimpleCard.svelte"
  import IconSuggest from "$lib/components/Icons/IconSuggest.svelte"

  export let url = ""
  export let description = ""
  export let comments = ""

  $: disabled = url.length === 0
  $: criteria = disabled ? "text-colorError" : ""
</script>

<svelte:head>
  <title>Suggest a game!</title>
  <meta
    name="description"
    content="Suggest a daily game to be added to the list of dles."
  />
</svelte:head>

<!-- <div class="divider"></div> -->
<div class="mt-4 mx-auto sm:w-full max-w-lg flex flex-col gap-3">
  <SimpleCard>
    <h2
      class="mb-2 flex justify-center gap-2 text-xl font-semibold fill-colorText"
    >
      <IconSuggest /> Suggest a game!
    </h2>
    <p class="text-center text-colorTextSoft px-2 mb-2">
      Is there a fun daily game that is missing from the list? Make an anonymous
      suggestion below!
    </p>
    <div class="flex justify-center items-center">
      <form
        class="w-full"
        method="POST"
        action="https://formspree.io/f/xpzvdyzl"
      >
        <fieldset class="p-1 flex flex-col justify-end gap-2">
          <div class="formElementContainer">
            <label for="url"
              >URL <span id="criteria" class={criteria}>
                (required)
              </span></label
            >
            <input
              bind:value={url}
              type="text"
              id="url"
              name="url"
              placeholder="example.game"
              required
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

          <button class="btn mt-2 mx-auto w-48" type="submit" {disabled}
            >Submit</button
          >
        </fieldset>
      </form>
    </div>
    <p class="text-center text-sm md:text-base">
      Form handling by <a href="https://formspree.io" target="_blank"
        >formspree.io</a
      >
    </p>
  </SimpleCard>
  <SimpleLink href="{base}/" text="Go back to collection" />
  <span class="text-center leading-none">or...</span>
  <SimpleLink href="{base}/report" text="Report a bug!" />
</div>

<style lang="postcss">
  .formElementContainer {
    @apply flex flex-col justify-between;
    label {
      @apply font-semibold;
    }
  }
</style>
