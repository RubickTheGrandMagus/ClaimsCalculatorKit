<script lang="ts">
	//intro guide for ease of use
	import { onMount } from 'svelte';
	import introJs from 'intro.js';
	import 'intro.js/introjs.css';
	import './custom.css';

	onMount(() => {
		setTimeout(() => {
			introJs()
				.setOptions({
					steps: [
						{
							element: '.next',
							intro: 'Please click to proceed',
							position: 'left'
						}
					],
					tooltipClass: 'customTooltip',
					dontShowAgain: true,
					showBullets: false,
					showButtons: false,
					dontShowAgainCookie: 'introMone',
					dontShowAgainCookieDays: 7
				})
				.start();
		}, 1000);
	});
</script>

<div class="mb-8 flex items-center justify-between border-b border-base-200 pb-4">
	<div>
		<h2
			class="flex items-center gap-3 text-2xl font-extrabold uppercase tracking-wider text-primary drop-shadow-sm"
		>
			Monetization of Leave Credits
		</h2>
		<p class="text-base-content/60 mt-1 text-sm">
			Convert your accumulated leave credits into monetary value.
		</p>
	</div>
</div>

<div
	class="border-secondary/20 alert mb-8 flex items-start rounded-xl border bg-base-100 p-5 shadow-sm"
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="h-6 w-6 shrink-0 stroke-secondary"
		><path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		></path></svg
	>
	<div class="ml-3 flex-1">
		<h3 class="m-0 text-sm font-bold text-base-content">Policy Notes & Guidelines</h3>
		<p class="text-base-content/80 mt-1 max-w-3xl text-xs leading-relaxed">
			Provided for under CSC MC No. 41, s. 1998: "Officials and employees in the career and
			non-career service whether permanent, temporary, casual, or coterminous, who have accumulated
			fifteen (15) days of vacation leave credits shall be allowed to monetize a minimum of ten (10)
			days; Provided, that at least five (5) days is retained after monetization and provided
			further that a maximum of thirty (30) days may be monetized in a given year."
		</p>
	</div>
</div>

<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
	<div
		class="bg-primary/5 border-primary/20 flex flex-col gap-3 rounded-2xl border p-6 shadow-inner"
	>
		<h3 class="text-sm font-bold uppercase tracking-wider text-primary">Required Documents</h3>
		<p class="text-base-content/80 text-sm">
			Please ensure you have prepared all necessary documentary requirements prior to filing your
			monetization claim.
		</p>
		<a href="/docs/mone" class="btn btn-primary btn-outline btn-sm mt-2 self-start"
			>View Requirements Checklist</a
		>
	</div>
</div>
