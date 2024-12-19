// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body{margin:0;font-family:'Apercu', Helvetica, sans-serif;background-color:rgb(28, 28, 28);display:flex;flex-direction:column;justify-content:center;align-content:center;width:100vw;height:100vh;background-image:url('./compBook.png');background-position:center;background-repeat:no-repeat;background-size:cover}html{line-height:1.15;color:#43414e}*{box-sizing:border-box}@font-face{font-family:'Apercu';font-style:normal;font-weight:500;src:url('./apercu_regular-webfont.woff')}.App.svelte-bytw94{display:grid;gap:10px;margin:auto;background-color:white;width:80%;max-width:800px;padding:5px;border-radius:3px;font-size:1.3em}button{transition:0.28s ease-in-out}button:hover{color:rgb(120, 120, 120);transform:scale(1.4, 1.4);transition:0.2s ease-in-out}@media(max-width: 767px){.App.svelte-bytw94{width:100%;font-size:1em}}@media(max-width: 375px){.App.svelte-bytw94{width:unset;font-size:1em;padding:unset;gap:10px}}@media(max-width: 321px){.App.svelte-bytw94{height:100vh}}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}