<!-- <script>
  import SimpleLink from "../SimpleLink.svelte";
  import { invalidateAll, goto } from "$app/navigation";
  import { applyAction, deserialize } from "$app/forms";

  export let url = "";
  export let description = "";
  export let comments = "";

  async function handleSubmit(e) {
    const isFormValid = [url, description, comments].some((s) => s.length != 0);

    if (!isFormValid) {
      document.getElementById("criteria").style.color = "var(--color-red)";
      return;
    }

    const data = new FormData(e.currentTarget);

    const response = await fetch(e.currentTarget.action, {
      method: "POST",
      body: data,
    });

    const result = deserialize(await response.text());

    if (result.type === "success") {
      // rerun all `load` functions, following the successful update
      await invalidateAll();
    }

    applyAction(result);
    goto("/suggest/success");

    // if ([url, description, comments].every((s) => s.length == 0)) {
    //   console.log("ERROR EMPTY STRINGS");
    //   return;
    // }
    // console.log(url, description, comments);
  }
</script>

<svelte:head>
  <title>About</title>
  <meta
    name="description"
    content="Suggest a game to be added to the list of dles."
  />
</svelte:head>

<div class="container">
  <h2>Suggest a game!</h2>
  <p>
    Is there a game / dle you like that is missing from the list? Make an
    anonymous suggestion below!
  </p>
  <div id="formContainer">
    <form method="POST" on:submit|preventDefault={handleSubmit}>
      <fieldset>
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

        <p id="criteria">* Must fill at least one box.</p>

        <button class="submit" type="submit">Submit</button>
      </fieldset>
    </form>
  </div>

  <SimpleLink href="/" text="Back to home" />
</div>

<style lang="less">
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
  #formContainer {
    // background: #efefef;
    // min-height: 100vh;
    // margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    width: 100%;
  }
  fieldset {
    background-color: var(--color-card-bg-3);
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 0.5rem;
  }

  label {
    font-size: 1.05rem;
    // font-family: var(--font-mono);
  }

  input {
    margin: 0.4rem;
  }

  input[type="text"],
  textarea {
    padding: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.9rem;
  }

  textarea {
    margin: 0.4rem;
    resize: vertical;
    min-height: 2rem;
    max-height: 8rem;
  }

  .formElementContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .submit {
    padding: 0.5rem 0.25rem;
    margin: 0.6rem;
    font-size: 1rem;
  }
</style> -->
