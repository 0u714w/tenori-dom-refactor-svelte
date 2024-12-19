// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "button.svelte-9a49ql{border:none;appearance:none;background-color:inherit;outline:none;cursor:pointer;transition:0.1s ease-in-out}i.svelte-9a49ql{color:grey}i.activeStep.svelte-9a49ql{color:pink;transform:scale(1.25, 1.25);transition:0.1s ease-in-out}i.selected.svelte-9a49ql{color:aquamarine}i.playing.svelte-9a49ql{color:#43414e;transform:scale(1.4, 1.4);transition:0.1s ease-in-out}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}