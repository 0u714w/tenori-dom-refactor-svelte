// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "button.svelte-1cb7hai{border:none;appearance:none;background-color:inherit;outline:none;cursor:pointer}span.svelte-1cb7hai{display:inline-block;background-color:pink;border-radius:3px;font-size:0.8em;justify-self:center;padding:2px 10px;margin:10px 0}input.svelte-1cb7hai{outline:none}.result.svelte-1cb7hai{display:grid;gap:10px;grid-template-columns:1fr}.save-form.svelte-1cb7hai{text-align:center}small.svelte-1cb7hai{color:rgb(120, 120, 120);min-height:30px;background-color:aquamarine;border-radius:3px;padding:5px 6px;text-align:center}.saved-result.svelte-1cb7hai{display:grid;grid-template-columns:min-content;gap:15px;justify-content:center}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}