<script>
  import { base } from "$app/paths"
  // import DleCard from "./DleCard.svelte"
  // import dles_json from "../data/dles.json"
  // import Filters from "./Filters.svelte"
  // import FilterTagGroup from "./FilterTagGroup.svelte"
  // import { dles, filteredDles, tagNames, tags } from "../stores"
  import DleList from "./DleList.svelte"
  import Settings from "./Settings.svelte"
  import SimpleLink from "./SimpleLink.svelte"

  // function initializeDles() {
  //   $dles = dles_json
  //   for (let dle of $dles) {
  //     dle.hidden = false
  //   }
  // }

  // function initializeTags() {
  //   $tagNames = $dles
  //     .map((dle) => dle.tags)
  //     .flat()
  //     .filter((x, i, a) => a.indexOf(x) == i)
  //     .sort()

  //   $tags = {}
  //   for (let tag_name of $tagNames) {
  //     $tags[tag_name] = {
  //       included: false,
  //       excluded: false,
  //     }
  //   }
  // }

  // initializeDles()
  // initializeTags()

  // $: includedTags = $tagNames.filter((tagName) => $tags[tagName].included)
  // $: excludedTags = $tagNames.filter((tagName) => $tags[tagName].excluded)

  // $: hasFilters = includedTags.length > 0 || excludedTags.length > 0

  // $: $filteredDles = $dles.filter((dle) => {
  //   let result = false
  //   if (includedTags.every((tag) => dle.tags.includes(tag))) {
  //     result = true
  //   }
  //   if (excludedTags.some((tag) => dle.tags.includes(tag))) {
  //     result = false
  //   }
  //   return result
  // })

  // function clearFilters() {
  //   for (let includedTag of includedTags) {
  //     $tags[includedTag].included = false
  //   }
  //   for (let excludedTag of excludedTags) {
  //     $tags[excludedTag].excluded = false
  //   }
  // }
</script>

<svelte:head>
  <title>The Dles</title>
  <meta
    name="description"
    content="A curated collection of free daily games."
  />
  <meta
    name="keywords"
    content="list, collection, links, games, daily, dles, wordle"
  />
  <meta name="author" content="aukspot" />
</svelte:head>

<SimpleLink href="{base}/suggest" text="Suggest a game to add!"></SimpleLink>

<!-- <details>
  <summary>What is a "dle"?</summary>
  <p>
    A dle is generally a game that changes everyday which has the same version
    for everyone that plays, taking inspiration from Wor<u>dle</u>.
  </p>
</details> -->
<!-- <div class="divider"></div> -->
<Settings />
<DleList />
