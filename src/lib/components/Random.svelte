<script>
  import { filteredDles } from "$lib/stores";

  let url = "";
  let dle = {
    url,
  };

  function randomDle() {
    let randomIndex = Math.floor(Math.random() * $filteredDles.length);
    return $filteredDles[randomIndex];
  }

  async function playRandomDle() {
    dle = randomDle();
    this.parentElement.href = dle.url;
    setTimeout(() => {
      this.parentElement.href = "?random";
    }, 300);
  }
</script>

<div class="flex justify-center items-center">
  <div class="flex flex-col gap-1">
    <a
      href="?random"
      id="randomDleLink"
      class="mx-auto"
      target="_blank"
      rel="noreferrer"
      ><button id="playButton" class="btn mt-2" on:click={playRandomDle}
        >Play random!</button
      ></a
    >
    <div class="text-xs mx-auto">(Opens in new tab)</div>
  </div>
</div>
