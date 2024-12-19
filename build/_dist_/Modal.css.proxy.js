// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".overlay.svelte-171p3bj{position:absolute;display:grid;grid-template-columns:1fr;align-content:center;top:0;left:0;height:100%;width:100%;z-index:10;background-color:rgba(20, 20, 20, 0.5)}.modal.svelte-171p3bj{justify-self:center;border-radius:3px;background-color:white;width:400px;min-height:200px;overflow:hidden}.content.svelte-171p3bj{padding:15px;margin:30px 0}button.svelte-171p3bj{font-weight:bold;width:min-content;height:min-content;justify-self:end;padding:10px;border:none;appearance:none;color:white;background-color:#43414e;outline:none;cursor:pointer}button.svelte-171p3bj:hover{background-color:rgb(120, 120, 120);transition:unset;transform:unset;transition:color 0.28s ease-in-out}.button-div.svelte-171p3bj{display:grid;justify-self:end}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}