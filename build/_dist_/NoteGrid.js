import './NoteGrid.css.proxy.js';
/* src/NoteGrid.svelte generated by Svelte v3.38.2 */
import {
	SvelteComponent,
	assign,
	attr,
	check_outros,
	component_subscribe,
	create_component,
	destroy_component,
	destroy_each,
	detach,
	element,
	get_spread_object,
	get_spread_update,
	group_outros,
	init,
	insert,
	mount_component,
	safe_not_equal,
	transition_in,
	transition_out
} from "../web_modules/svelte/internal.js";

import { tenoriState } from "./stores.js";
import NoteRow from "./NoteRow.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (7:2) {#each $tenoriState.notes as note}
function create_each_block(ctx) {
	let noterow;
	let current;
	const noterow_spread_levels = [/*note*/ ctx[1]];
	let noterow_props = {};

	for (let i = 0; i < noterow_spread_levels.length; i += 1) {
		noterow_props = assign(noterow_props, noterow_spread_levels[i]);
	}

	noterow = new NoteRow({ props: noterow_props });

	return {
		c() {
			create_component(noterow.$$.fragment);
		},
		m(target, anchor) {
			mount_component(noterow, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const noterow_changes = (dirty & /*$tenoriState*/ 1)
			? get_spread_update(noterow_spread_levels, [get_spread_object(/*note*/ ctx[1])])
			: {};

			noterow.$set(noterow_changes);
		},
		i(local) {
			if (current) return;
			transition_in(noterow.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(noterow.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(noterow, detaching);
		}
	};
}

function create_fragment(ctx) {
	let section;
	let current;
	let each_value = /*$tenoriState*/ ctx[0].notes;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			section = element("section");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(section, "class", "svelte-luasge");
		},
		m(target, anchor) {
			insert(target, section, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(section, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*$tenoriState*/ 1) {
				each_value = /*$tenoriState*/ ctx[0].notes;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(section, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(section);
			destroy_each(each_blocks, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $tenoriState;
	component_subscribe($$self, tenoriState, $$value => $$invalidate(0, $tenoriState = $$value));
	return [$tenoriState];
}

class NoteGrid extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default NoteGrid;