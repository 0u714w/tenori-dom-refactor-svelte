// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "div.svelte-cy6x0n{margin-top:10px;display:grid;grid-template-columns:repeat(4, 30px);gap:10px;justify-content:flex-end;padding-right:6px}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}