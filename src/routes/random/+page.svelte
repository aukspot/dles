<script>
  import { onMount } from "svelte";
  import { filteredDles } from "../../stores";

  let dle = {
    url: "",
  };

  function randomDle() {
    let randomIndex = Math.floor(Math.random() * $filteredDles.length);
    console.log(randomIndex);
    return $filteredDles[randomIndex];
  }

  function playRandomDle() {
    dle = randomDle();
    // document.getElementById("playButton").click();
  }

  onMount(() => {
    // playRandomDle();
  });
</script>

<div class="hidden">
  <a href={dle.url} target="_blank" rel="noreferrer"
    ><button id="playButton" class="btn mt-2" on:click={playRandomDle}
      >Play random!</button
    ></a
  >
</div>
