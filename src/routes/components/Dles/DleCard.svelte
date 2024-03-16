<script>
  import DleTagGroup from "./DleTagGroup.svelte";
  export let i;
  export let dle;
</script>

<div
  class="flex flex-row justify-between w-full px-2 pt-1 pb-2 ring-1 ring-colorNeutralSoft shadow-md shadow-colorNeutralSofter rounded-md"
>
  <div class="flex flex-col flex-wrap justify-between w-full">
    <div class="flex justify-between">
      <div class="flex items-baseline align-top gap-1">
        <span class="unselectable">{i}. </span>
        <span class="text-lg font-semibold">{dle.name}</span>

      </div>
      <a href={dle.url} target="_blank" rel="noreferrer"
        ><svg class="btn !p-0" width="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-6m-3.889-7H12m0 0v3.889M12 12l-7 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg></a
      >
    </div>
    <div class="text-sm text-colorTextSoft mt-1 sm:text-base">
      {dle.description}
    </div>
    <div class="mt-2">
      <DleTagGroup tags={dle.tags}></DleTagGroup>
    </div>
  </div>

  <!-- <div class="flex items-center py-1">
    <a href={dle.url} target="_blank" rel="noreferrer"
      ><button class="btn !px-2 bg-colorBackground ml-3 unselectable"
        >Play</button
      ></a
    >
  </div> -->
</div>
