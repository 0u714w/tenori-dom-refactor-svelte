import './OctaveControl.css.proxy.js';
/* src/OctaveControl.svelte generated by Svelte v3.38.2 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	run_all,
	safe_not_equal,
	space
} from "../web_modules/svelte/internal.js";

import { tenoriState } from "./stores.js";

function create_fragment(ctx) {
	let div;
	let button0;
	let t0;
	let i1;
	let t1;
	let button1;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			button0 = element("button");
			button0.innerHTML = `<i class="fas fa-minus"></i>`;
			t0 = space();
			i1 = element("i");
			t1 = space();
			button1 = element("button");
			button1.innerHTML = `<i class="fas fa-plus"></i>`;
			attr(button0, "class", "svelte-nvn2zx");
			attr(i1, "class", "fas fa-music");
			attr(button1, "class", "svelte-nvn2zx");
			attr(div, "class", "svelte-nvn2zx");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, button0);
			append(div, t0);
			append(div, i1);
			append(div, t1);
			append(div, button1);

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*click_handler*/ ctx[1]),
					listen(button1, "click", /*click_handler_1*/ ctx[2])
				];

				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self) {
	const waveChange = num => {
		tenoriState.update(store => {
			if (num > 0) {
				store.octave += 1;
			} else {
				store.octave -= 1;
			}

			return store;
		});
	};

	const click_handler = () => waveChange(0);
	const click_handler_1 = () => waveChange(1);
	return [waveChange, click_handler, click_handler_1];
}

class OctaveControl extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default OctaveControl;