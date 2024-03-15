<script>
  import { filteredDles } from "../../stores";

  let url = "/random";
  let dle = {
    url,
  };

  function randomDle() {
    let randomIndex = Math.floor(Math.random() * $filteredDles.length);
    console.log(randomIndex);
    return $filteredDles[randomIndex];
  }

  function playRandomDle() {
    dle = randomDle();
  }
</script>

<div class="flex justify-center items-center">
  <div class="flex flex-col gap-1">
    <a href={dle.url} class="mx-auto" target="_blank" rel="noreferrer"
      ><button id="playButton" class="btn mt-2" on:click={playRandomDle}
        >Play random!</button
      ></a
    >
    <div class="text-xs mx-auto">(Opens in new tab)</div>
  </div>
</div>
