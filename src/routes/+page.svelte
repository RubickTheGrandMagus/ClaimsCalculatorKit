<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import introJs from 'intro.js';
	import 'intro.js/introjs.css';

	/** @type {HTMLElement} */
	let vantaContainer: HTMLElement;
	/** @type {any} */
	let vantaEffect: any;

	onMount(async () => {
		/** @param {string} src */
		const loadScript = (src: string) =>
			new Promise((resolve, reject) => {
				if (document.querySelector(`script[src="${src}"]`)) return resolve(undefined);
				const script = document.createElement('script');
				script.src = src;
				script.onload = () => resolve(undefined);
				script.onerror = reject;
				document.head.appendChild(script);
			});

		try {
			await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
			await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js');

			// @ts-ignore
			if (window.VANTA && window.VANTA.NET) {
				// @ts-ignore
				vantaEffect = window.VANTA.NET({
					el: vantaContainer,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.0,
					minWidth: 200.0,
					scale: 1.0,
					scaleMobile: 1.0,
					color: 0x0ea5e9, // Tailwind sky-500
					backgroundColor: 0xffffff,
					backgroundAlpha: 0.0, // Transparent background
					points: 15.0,
					maxDistance: 22.0,
					spacing: 16.0
				});
			}
		} catch (e) {
			console.error('Failed to load Vanta.js', e);
		}

		introJs()
			.setOptions({
				steps: [
					{ intro: 'Welcome to the web app!' },
					{
						element: '.claims-menu',
						intro: 'Select one of the following options',
						position: 'right'
					},
					{
						element: 'label[for="my-drawer"]',
						intro: 'Click here to open the menu',
						position: 'right'
					},
					{
						element: '#home',
						intro: 'Click here to return to homepage'
					}
				],
				dontShowAgain: true
			})
			.start();
	});

	onDestroy(() => {
		if (vantaEffect) vantaEffect.destroy();
	});
</script>

<!-- Vanta.js Background -->
<div
	bind:this={vantaContainer}
	class="pointer-events-none fixed inset-0 z-[-1] min-h-screen w-full opacity-25"
></div>

<div class="container relative mx-auto mb-16 flex flex-col items-center px-4 py-8">
	<div class="mb-10 text-center">
		<h1 class="mb-3 text-3xl font-extrabold text-primary md:text-4xl">
			Retirement & Separation Benefits
		</h1>
		<p class="text-base-content/70 mx-auto max-w-2xl text-lg">
			Please select the applicable mode of retirement or benefit claim from the options below.
		</p>
	</div>

	<div class="claims-menu grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		<!-- Compulsory -->
		<a
			href="/claims/compulsory"
			class="group card border border-base-200 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
		>
			<div class="card-body items-center text-center">
				<div
					class="bg-primary/10 group-hover:bg-primary/20 mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-primary"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/></svg
					>
				</div>
				<h2 class="card-title mb-2 text-xl">Compulsory</h2>
				<p class="text-base-content/70 text-sm">
					For personnel reaching the mandatory retirement age.
				</p>
			</div>
		</a>

		<!-- Optional -->
		<a
			href="/claims/optional"
			class="group card border border-base-200 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
		>
			<div class="card-body items-center text-center">
				<div
					class="bg-secondary/10 group-hover:bg-secondary/20 mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-secondary"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
				</div>
				<h2 class="card-title mb-2 text-xl">Optional</h2>
				<p class="text-base-content/70 text-sm">
					For personnel who opt to retire early after fulfilling requirements.
				</p>
			</div>
		</a>

		<!-- NUP / Terminal Leave Claim -->
		<a
			href="/claims/other"
			class="group card border border-base-200 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
		>
			<div class="card-body items-center text-center">
				<div
					class="bg-info/10 group-hover:bg-info/20 mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-info"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/></svg
					>
				</div>
				<h2 class="card-title mb-2 text-lg">Terminal Leave Claim</h2>
				<p class="text-base-content/70 text-sm">For NUP / Resigned / Dismissed / AWOL personnel.</p>
			</div>
		</a>

		<!-- Monetization of Leave Credits -->
		<a
			href="/claims/mone"
			class="group card border border-base-200 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
		>
			<div class="card-body items-center text-center">
				<div
					class="bg-accent/10 group-hover:bg-accent/20 mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-accent"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
				</div>
				<h2 class="card-title mb-2 text-lg">Leave Monetization</h2>
				<p class="text-base-content/70 text-sm">Monetization of Leave Credits (MLC).</p>
			</div>
		</a>

		<!-- TPPD -->
		<a
			href="/claims/tppd"
			class="group card border border-base-200 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
		>
			<div class="card-body items-center text-center">
				<div
					class="bg-warning/10 group-hover:bg-warning/20 mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-warning"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/></svg
					>
				</div>
				<h2 class="card-title mb-2 text-base sm:text-lg">Total Permanent Physical Disability</h2>
				<p class="text-base-content/70 text-sm">
					Benefits (TPPD) for complete physical disability.
				</p>
			</div>
		</a>

		<!-- Death Benefits -->
		<a
			href="/claims/death"
			class="group card border border-base-200 bg-base-100 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
		>
			<div class="card-body items-center text-center">
				<div
					class="bg-error/10 group-hover:bg-error/20 mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-colors"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-error"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/></svg
					>
				</div>
				<h2 class="card-title mb-2 text-xl">Death Benefits</h2>
				<p class="text-base-content/70 text-sm">Claims related to death in service.</p>
			</div>
		</a>
	</div>
</div>

<style>
	.claims-menu .card:hover svg {
		transform: scale(1.2) rotate(6deg);
		transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
</style>
