<script>
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
    console.log(dle);
  }
</script>

<div class="flex justify-center items-center">
  <button class="btn mt-2" on:click={playRandomDle}
    ><a href={dle.url} target="_blank" rel="noreferrer">Play random!</a></button
  >
</div>
