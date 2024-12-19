// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "button.svelte-vn88ew{border:none;appearance:none;background-color:inherit;outline:none;cursor:pointer}span.svelte-vn88ew{display:inline-block;background-color:pink;border-radius:3px;font-size:0.8em;justify-self:center;padding:2px 10px;margin:10px 0}input.svelte-vn88ew{outline:none}.errors.svelte-vn88ew{text-align:center;display:grid;grid-template-columns:1fr}.get-setting-form.svelte-vn88ew{display:grid;grid-template-columns:min-content 1fr min-content;gap:10px;text-align:center}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}