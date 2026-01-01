<script>
  import { favorites, favoriteIds, filteredDles } from "$lib/stores"
  import { trackEvent } from "$lib/js/trackingUtils"
  import Modal from "../Modal.svelte"
  import ModalHeader from "../ModalHeader.svelte"
  import IconDownload from "../Icons/IconDownload.svelte"
  import IconUpload from "../Icons/IconUpload.svelte"
  import IconCopy from "../Icons/IconCopy.svelte"
  import IconPaste from "../Icons/IconPaste.svelte"

  export let mode = "export" // "export" or "import"
  export let onClose

  let fileInputRef
  let selectedFile = null
  let importData = null
  let importError = null
  let copySuccess = false
  let pasteText = ""
  let showPasteInput = false

  // Derived property to get dle objects from importData IDs
  $: importedDles = importData
    ? importData
        .map((id) => $filteredDles.find((dle) => dle.id === id))
        .filter((dle) => dle !== undefined)
    : []

  function handleExport() {
    const exportData = $favoriteIds

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `dles-favorites-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    trackEvent("favorites-export", {
      count: $favorites.length,
    })

    onClose()
  }

  async function handleCopy() {
    const exportData = $favoriteIds

    const dataStr = JSON.stringify(exportData, null, 2)

    try {
      await navigator.clipboard.writeText(dataStr)
      copySuccess = true

      trackEvent("favorites-copy", {
        count: $favorites.length,
      })

      setTimeout(() => {
        copySuccess = false
      }, 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  function handleFileSelect(event) {
    const file = event.target.files[0]
    if (!file) return

    selectedFile = file
    importError = null

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result)

        if (!Array.isArray(data)) {
          importError = "Invalid file format: Expected an array of IDs"
          importData = null
          return
        }

        importData = data
      } catch (error) {
        importError = "Invalid JSON file"
        importData = null
      }
    }
    reader.readAsText(file)
  }

  function handleImport() {
    if (!importData) return

    const importedIds = importData.filter(
      (id) => id !== undefined && id !== null,
    )

    const previousCount = $favoriteIds.length

    // Use .set() to ensure reactivity triggers properly
    favoriteIds.set(importedIds)

    if (typeof localStorage !== "undefined") {
      localStorage.favorites = JSON.stringify(importedIds)
    }

    trackEvent("favorites-import", {
      imported: importedIds.length,
      previous: previousCount,
    })

    onClose()
  }

  async function handlePasteFromClipboard() {
    try {
      const clipboardText = await navigator.clipboard.readText()
      pasteText = clipboardText

      // Automatically try to parse and submit
      const data = JSON.parse(clipboardText)

      if (!Array.isArray(data)) {
        importError = "Invalid format: Expected an array of IDs"
        importData = null
        showPasteInput = true
        return
      }

      importData = data
      importError = null
      showPasteInput = false

      trackEvent("favorites-paste", {
        count: data.length,
      })
    } catch (error) {
      if (error.name === "SyntaxError" || error.name === "TypeError") {
        importError = "Invalid JSON format"
        importData = null
        showPasteInput = true
      } else {
        // Clipboard read failed, show manual input
        showPasteInput = true
        pasteText = ""
        importError = null
        importData = null
      }
    }
  }

  function handlePasteTextChange(event) {
    pasteText = event.target.value
  }

  function handlePasteSubmit() {
    try {
      const data = JSON.parse(pasteText)

      if (!Array.isArray(data)) {
        importError = "Invalid format: Expected an array of IDs"
        importData = null
        return
      }

      importData = data
      importError = null
      showPasteInput = false

      trackEvent("favorites-paste-submit", {
        count: data.length,
      })
    } catch (error) {
      importError = "Invalid JSON format"
      importData = null
    }
  }
</script>

<Modal {onClose} overlay={true} zIndex={1000}>
  <div class="modal">
    <ModalHeader
      title={mode === "export" ? "Export Favorites" : "Import Favorites"}
      {onClose}
      variant="section"
    />

    <div class="modal-content">
      {#if mode === "export"}
        <div class="export-content">
          <div class="info-block">
            <p class="block-text">
              This will download a JSON file containing all your favorite dles
              <strong>({$favorites.length} total)</strong>.
            </p>
          </div>

          <div class="info-block">
            <p class="block-text">
              You can use this file to import your favorites on another device
              or to back up your favorites.
            </p>
          </div>

          <div class="favorites-preview-block">
            <div class="block-header">Your favorites:</div>
            <div class="favorites-list">
              {#each $favorites.slice(0, 5) as dle}
                <div class="favorite-item">• {dle.name}</div>
              {/each}
              {#if $favorites.length > 5}
                <div class="favorite-item more">
                  ... and {$favorites.length - 5} more
                </div>
              {/if}
            </div>
          </div>
        </div>
      {:else}
        <div class="import-content">
          {#if $favoriteIds.length > 0}
            <div class="warning-block">
              <div class="warning-title">⚠️ Warning</div>
              <ul class="warning-list">
                <li class="warning-item">
                  Importing will <strong>replace all</strong> of your current
                  favorites ({$favoriteIds.length} total) with the favorites from
                  the file.
                </li>
                <li class="warning-item">
                  Make sure to export your current favorites first if you want
                  to keep them!
                </li>
              </ul>
            </div>
          {:else}
            <div class="info-block">
              <p class="block-text">Choose a favorites file to import.</p>
            </div>
          {/if}

          {#if !importData}
            <div class="import-options">
              <div class="file-input-container">
                <input
                  type="file"
                  accept="application/json,.json"
                  on:change={handleFileSelect}
                  bind:this={fileInputRef}
                  class="file-input"
                />
                <button
                  class="file-input-button"
                  on:click={() => fileInputRef?.click()}
                >
                  <IconUpload />
                  <span>Choose File</span>
                </button>
              </div>

              <div class="or-divider">
                <span class="or-text">or</span>
              </div>

              <div class="paste-container">
                <button
                  class="file-input-button"
                  on:click={handlePasteFromClipboard}
                >
                  <IconPaste />
                  <span>Paste from Clipboard</span>
                </button>

                {#if showPasteInput}
                  <div class="paste-input-area">
                    <textarea
                      class="paste-textarea"
                      placeholder="Paste your favorites JSON here..."
                      bind:value={pasteText}
                      on:input={handlePasteTextChange}
                      rows="6"
                    ></textarea>
                    <button
                      class="paste-submit-button"
                      on:click={handlePasteSubmit}
                      disabled={!pasteText.trim()}
                    >
                      Submit
                    </button>
                  </div>
                {/if}
              </div>
            </div>
          {/if}

          {#if importError}
            <div class="error-block">{importError}</div>
          {/if}

          {#if importData}
            <div class="import-preview-block">
              <div class="block-header">
                Ready to import {importData.length} favorites
              </div>
              <div class="favorites-list">
                {#each importedDles.slice(0, 10) as dle}
                  <div class="favorite-item">• {dle.name}</div>
                {/each}
                {#if importedDles.length > 10}
                  <div class="favorite-item more">
                    ... and {importedDles.length - 10} more
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <div class="modal-footer">
      {#if mode === "export"}
        <div class="export-actions">
          <button class="file-input-button" on:click={handleExport}>
            <IconDownload />
            <span>Download File</span>
          </button>

          <div class="or-divider">
            <span class="or-text">or</span>
          </div>

          <button
            class="file-input-button"
            on:click={handleCopy}
            disabled={copySuccess}
          >
            <IconCopy />
            <span>{copySuccess ? "Copied!" : "Copy to Clipboard"}</span>
          </button>
        </div>
      {:else if importData}
        <button class="action-button" on:click={handleImport}>
          <IconUpload />
          <span>Confirm Import</span>
        </button>
      {/if}
    </div>
  </div>
</Modal>

<style lang="postcss">
  .modal {
    @apply bg-colorCardC border border-colorTextSofter shadow-2xl flex flex-col;
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
  }

  :global(.dark) .modal {
    @apply border-colorTextSoftest;
  }

  .modal-content {
    @apply p-3 overflow-y-auto flex-1;
  }

  .export-content,
  .import-content {
    @apply flex flex-col gap-2;
  }

  .info-block {
    @apply bg-colorCardB border border-colorTextSoftest p-3;
  }

  .block-text {
    @apply text-sm text-colorText leading-relaxed;
  }

  .warning-block {
    @apply bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-300 dark:border-orange-700 p-3;
  }

  .warning-title {
    @apply text-sm font-bold text-orange-900 dark:text-orange-200 mb-2 uppercase tracking-wide;
  }

  .warning-list {
    @apply list-none pl-0 space-y-2;
  }

  .warning-item {
    @apply text-xs text-orange-800 dark:text-orange-300 pl-4 relative;
  }

  .warning-item::before {
    content: "•";
    @apply absolute left-0 font-bold;
  }

  .import-options {
    @apply flex flex-col gap-2;
  }

  .file-input-container {
    @apply mt-1;
  }

  .file-input {
    @apply hidden;
  }

  .file-input-button {
    @apply flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-colorText bg-colorCardB hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-colorTextSofter shadow-sm hover:shadow-md active:scale-95 transition-all duration-75 stroke-colorTextSoft cursor-pointer w-full;
  }

  .or-divider {
    @apply flex items-center justify-center my-1;
  }

  .or-text {
    @apply text-xs text-colorTextSofter uppercase tracking-wider px-2;
  }

  .paste-container {
    @apply flex flex-col gap-2;
  }

  .paste-input-area {
    @apply flex flex-col gap-2 mt-2;
  }

  .paste-textarea {
    @apply w-full px-3 py-2 text-sm font-mono text-colorText bg-colorCardB border-2 border-colorTextSofter focus:border-blue-500 focus:outline-none resize-y;
  }

  .paste-submit-button {
    @apply px-3 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 shadow-md hover:shadow-lg active:scale-95 transition-all duration-75 uppercase tracking-wide cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600;
  }

  .error-block {
    @apply bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 p-3 text-sm text-red-800 dark:text-red-300;
  }

  .favorites-preview-block,
  .import-preview-block {
    @apply bg-colorCardB border border-colorTextSoftest p-3;
  }

  .block-header {
    @apply text-sm font-semibold text-colorText mb-2 uppercase tracking-wide;
  }

  .favorites-list {
    @apply flex flex-col gap-1;
  }

  .favorite-item {
    @apply text-xs text-colorTextSoft;
  }

  .favorite-item.more {
    @apply italic text-colorTextSofter;
  }

  .modal-footer {
    @apply p-3 bg-colorCardB border-t-2 border-colorTextSofter flex justify-center;
  }

  .export-actions {
    @apply flex flex-col gap-2 w-full;
  }

  .action-button {
    @apply flex items-center gap-2 px-3 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 border-2 border-blue-700 hover:border-blue-800 shadow-md hover:shadow-lg active:scale-95 transition-all duration-75 stroke-white uppercase tracking-wide cursor-pointer flex-1;
  }
</style>
