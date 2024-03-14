<script>
  import DleTagGroup from "./DleTagGroup.svelte";
  export let i;
  export let dle;
</script>

<div
  class="flex flex-row justify-between w-full px-2 pt-1 pb-2 ring-1 ring-colorNeutralSoft shadow-md shadow-colorNeutralSofter rounded-md "
>
  <div class="flex flex-col flex-wrap justify-between w-full">
    <div class="flex justify-between">
      <div class="flex items-baseline align-top gap-1">
        <span class="unselectable">{i}. </span>
        <span class="text-lg font-semibold">{dle.name}</span>
      </div>
      <div class="flex items-center py-1">
        <a href={dle.url} target="_blank" rel="noreferrer"
          ><button class="btn !px-2 bg-colorBackground ml-1 unselectable"
            >Play</button
          ></a
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
</div>
