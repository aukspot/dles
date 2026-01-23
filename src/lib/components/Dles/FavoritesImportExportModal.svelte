<script>
  import { favorites, favoriteIds, filteredDles } from "$lib/stores"
  import { trackEvent } from "$lib/js/trackingUtils"
  import Modal from "../Modal.svelte"
  import ModalHeader from "../ModalHeader.svelte"
  import Button from "../Button.svelte"
  import Card from "../Card.svelte"
  import Input from "../Input.svelte"
  import StatusMessage from "../StatusMessage.svelte"
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
  <div class="modal-container">
    <ModalHeader
      title={mode === "export" ? "Export Favorites" : "Import Favorites"}
      {onClose}
      variant="section"
    />

    <div class="modal-content">
      {#if mode === "export"}
        <div class="export-content">
          <Card variant="info">
            <p class="block-text">
              This will download a JSON file containing all your favorite dles
              <strong>({$favorites.length} total)</strong>.
            </p>
          </Card>

          <Card variant="info">
            <p class="block-text">
              You can use this file to import your favorites on another device
              or to back up your favorites.
            </p>
          </Card>

          <Card variant="info">
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
          </Card>
        </div>
      {:else}
        <div class="import-content">
          {#if $favoriteIds.length > 0}
            <Card variant="warning">
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
            </Card>
          {:else}
            <Card variant="info">
              <p class="block-text">Choose a favorites file to import.</p>
            </Card>
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
                <Button
                  variant="secondary"
                  icon={IconUpload}
                  fullWidth
                  on:click={() => fileInputRef?.click()}
                >
                  Choose File
                </Button>
              </div>

              <div class="or-divider">
                <span class="or-text">or</span>
              </div>

              <div class="paste-container">
                <Button
                  variant="secondary"
                  icon={IconPaste}
                  fullWidth
                  on:click={handlePasteFromClipboard}
                >
                  Paste from Clipboard
                </Button>

                {#if showPasteInput}
                  <div class="paste-input-area">
                    <Input
                      type="textarea"
                      bind:value={pasteText}
                      placeholder="Paste your favorites JSON here..."
                      rows={6}
                      fullWidth
                    />
                    <Button
                      variant="primary"
                      uppercase
                      fullWidth
                      on:click={handlePasteSubmit}
                      disabled={!pasteText.trim()}
                    >
                      Submit
                    </Button>
                  </div>
                {/if}
              </div>
            </div>
          {/if}

          {#if importError}
            <StatusMessage type="error" message={importError} />
          {/if}

          {#if importData}
            <Card variant="info">
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
            </Card>
          {/if}
        </div>
      {/if}
    </div>

    <div class="modal-footer">
      {#if mode === "export"}
        <div class="footer-actions">
          <Button
            variant="secondary"
            icon={IconDownload}
            fullWidth
            on:click={handleExport}
          >
            Download File
          </Button>

          <div class="or-divider">
            <span class="or-text">or</span>
          </div>

          <Button
            variant="secondary"
            icon={IconCopy}
            fullWidth
            on:click={handleCopy}
            disabled={copySuccess}
          >
            {copySuccess ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </div>
      {:else if importData}
        <Button
          variant="primary"
          icon={IconUpload}
          fullWidth
          on:click={handleImport}
        >
          Confirm Import
        </Button>
      {/if}
    </div>
  </div>
</Modal>

<style lang="postcss">
  .export-content,
  .import-content {
    @apply flex flex-col gap-2;
  }

  .block-text {
    @apply text-sm text-colorText leading-relaxed;
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

  .paste-container {
    @apply flex flex-col gap-2;
  }

  .paste-input-area {
    @apply flex flex-col gap-2 mt-2;
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
</style>
