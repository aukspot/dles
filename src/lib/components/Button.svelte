<script>
  export let variant = "action"
  export let color = "neutral"
  export let icon = null
  export let iconPosition = "left"
  export let href = null
  export let target = "_blank"
  export let rel = "noopener noreferrer"
  export let disabled = false
  export let active = false
  export let ariaLabel = null
  export let title = null
  export let size = "md" // "sm" | "md" | "lg"
  export let fullWidth = false
  export let uppercase = false

  let className = ""
  export { className as class }

  $: element = href ? "a" : variant === "toggle" ? "label" : "button"

  // Map old variants to new system for backward compatibility
  $: mappedVariant = variant === "action" ? "secondary" : variant

  $: variantClass =
    {
      primary: "btn-primary",
      secondary: "btn-secondary",
      action: "btn-action", // Keep for backward compatibility
      "action-big": "btn-action-big", // Keep for backward compatibility
      settings: "btn-settings",
      "menu-item": "btn-menu-item",
      toggle: "btn-toggle",
      "poll-option": "btn-poll-option",
    }[variant] ||
    (mappedVariant === "primary"
      ? "btn-primary"
      : mappedVariant === "secondary"
        ? "btn-secondary"
        : "btn-action")

  $: sizeClass =
    {
      sm: "btn-size-sm",
      md: "btn-size-md",
      lg: "btn-size-lg",
    }[size] || "btn-size-md"

  $: widthClass = fullWidth ? "btn-full-width" : ""

  $: uppercaseClass = uppercase ? "btn-uppercase" : ""

  $: colorClass =
    {
      green: "hover:bg-green-100 dark:hover:bg-green-900",
      blue: "hover:bg-blue-200 dark:hover:bg-blue-800",
      orange: "hover:bg-orange-200 dark:hover:bg-orange-800",
      violet: "hover:bg-violet-200 dark:hover:bg-violet-800",
      red: "hover:bg-red-100 dark:hover:bg-red-900",
      neutral: "",
    }[color] || ""

  $: computedClass =
    `${variantClass} ${sizeClass} ${widthClass} ${uppercaseClass} ${colorClass} ${className}`.trim()

  // Only apply disabled to button elements
  $: disabledProp = element === "button" ? disabled : undefined

  // Only apply href/target/rel to anchor elements
  $: hrefProp = element === "a" ? href : undefined
  $: targetProp = element === "a" ? target : undefined
  $: relProp = element === "a" ? rel : undefined
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
  this={element}
  class={computedClass}
  class:active={active && variant === "toggle"}
  href={hrefProp}
  target={targetProp}
  rel={relProp}
  disabled={disabledProp}
  aria-label={ariaLabel}
  {title}
  on:click
  on:mouseenter
  on:mouseleave
  on:focus
  on:blur
>
  {#if icon && iconPosition === "left"}
    <svelte:component this={icon} />
  {/if}

  <slot />

  {#if icon && iconPosition === "right"}
    <svelte:component this={icon} />
  {/if}
</svelte:element>
