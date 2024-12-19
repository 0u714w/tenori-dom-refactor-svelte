// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "div.svelte-nvn2zx{display:grid;grid-template-columns:repeat(3, 1fr);justify-items:center}button.svelte-nvn2zx{border:none;appearance:none;background-color:inherit;outline:none;cursor:pointer}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}