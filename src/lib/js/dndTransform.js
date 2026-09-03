export function preventDragScroll(el) {
  el.focus = function (options) {
    HTMLElement.prototype.focus.call(this, { ...options, preventScroll: true })
  }
}
