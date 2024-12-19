// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "section.svelte-9b48nj{display:grid;gap:10px;max-height:130px;grid-template-columns:repeat(2, auto)}div.svelte-9b48nj:nth-child(2){display:grid;grid-template-columns:repeat(3, 30px);align-items:center;justify-content:end;height:100%;gap:10px;padding-right:6px}div.svelte-9b48nj:first-child{display:grid;margin-left:10px;grid-template-rows:repeat(2, auto);justify-content:start}button.svelte-9b48nj{border:none;appearance:none;background-color:inherit;outline:none;cursor:pointer}small.svelte-9b48nj{visibility:hidden;color:rgb(120, 120, 120);min-height:30px;background-color:aquamarine;border-radius:3px;padding:5px 6px;text-align:center}span.svelte-9b48nj{display:inline-block}.showName.svelte-9b48nj{visibility:unset}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}