<script>
  import DleTagGroup from "./DleTagGroup.svelte"
  export let i
  export let dle
</script>

<li
  class="flex flex-row justify-between w-full px-2 pt-1 pb-2 ring-1 ring-colorNeutralSoft shadow-md shadow-colorNeutralSofter rounded-md [&:nth-child(odd)]:bg-colorCard lg:[&:nth-child(odd)]:bg-colorBackground"
>
  <div class="flex flex-col flex-wrap justify-between w-full">
    <div class="flex justify-between">
      <div class="flex items-baseline align-top gap-1">
        <span class="not-selectable">{i}. </span>
        <span class="text-lg font-semibold">{dle.name}</span>
      </div>
      <div class="flex items-center pt-1">
        <a href={dle.url} target="_blank" rel="noreferrer"
          ><button class="btn not-selectable">Play</button></a
        >
      </div>
    </div>
    <div class="text-sm text-colorTextSoft mt-1">
      {dle.description}
    </div>
    <div class="mt-2">
      <DleTagGroup tags={dle.tags}></DleTagGroup>
    </div>
  </div>
</li>
