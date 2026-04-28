<script lang="ts">
	import { MoneIntro, YearsInSvcComponent, CalculateHSR, LeaveCredits } from '$lib/components/mone';
	import { YearsInSvc } from '$lib/components/mone/shared.svelte';
	import { fly, fade } from 'svelte/transition';

	let page = $state(['Intro', 'Service Record', 'Salary & Rank', 'Monetize Calculation']);
	let pageIndex = $state(0);
	function movepage(direction: boolean) {
		if (
			(pageIndex == 0 && !direction) ||
			(pageIndex == page.length - 1 && direction) ||
			YearsInSvc.error.state
		)
			return;

		if (direction) pageIndex += 1;
		else pageIndex -= 1;
	}
</script>

<div
	class="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 overflow-x-hidden lg:flex-row lg:gap-8"
>
	<div
		class="sticky top-6 z-10 hidden w-full shrink-0 rounded-3xl border border-base-200 bg-base-100 p-6 shadow-lg lg:block lg:w-1/4 xl:w-1/5"
	>
		<ul class="steps steps-vertical h-full w-full gap-4">
			{#each page as p, i}
				<li
					class="step {pageIndex >= i
						? 'step-primary font-bold transition-all duration-300'
						: 'text-base-content/50'} 
                    {pageIndex === i
						? 'origin-left scale-105 text-primary'
						: ''} cursor-pointer text-sm"
					onclick={() => {
						if (!YearsInSvc.error.state) {
							pageIndex = i;
						}
					}}
				>
					<span class="text-left leading-tight">{p}</span>
				</li>
			{/each}
		</ul>
	</div>
	<div class="mb-2 w-full rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm lg:hidden">
		<ul class="steps w-full text-xs">
			{#each page as p, i}
				<li
					class="step {pageIndex >= i ? 'step-primary font-bold' : 'text-base-content/50'}"
					onclick={() => {
						if (!YearsInSvc.error.state) {
							pageIndex = i;
						}
					}}
				>
					{p}
				</li>
			{/each}
		</ul>
	</div>

	<div class="flex w-full min-w-0 flex-1 flex-col">
		<div
			class="card relative w-full overflow-hidden rounded-3xl border border-base-200 bg-base-100 shadow-xl"
		>
			<div class="card-body flex flex-col p-6 sm:p-8 md:p-10">
				<div class="flex min-h-[500px] w-full flex-col">
					{#if pageIndex == 0}
						<div in:fly={{ y: 20, duration: 400, delay: 100 }} class="w-full">
							<MoneIntro />
						</div>
					{:else if pageIndex == 1}
						<div in:fly={{ y: 20, duration: 400, delay: 100 }} class="w-full">
							<YearsInSvcComponent />
						</div>
					{:else if pageIndex == 2}
						<div in:fly={{ y: 20, duration: 400, delay: 100 }} class="w-full">
							<CalculateHSR />
						</div>
					{:else if pageIndex == 3}
						<div in:fly={{ y: 20, duration: 400, delay: 100 }} class="w-full">
							<LeaveCredits />
						</div>
					{/if}
				</div>
			</div>

			<div
				class="bg-base-200/50 z-10 flex shrink-0 items-center justify-between border-t border-base-200 p-4 sm:p-6"
			>
				<div>
					{#if pageIndex != 0}
						<button
							class="btn btn-primary btn-outline w-full gap-2 rounded-xl shadow-sm transition-all hover:shadow-md sm:w-auto"
							onclick={() => movepage(false)}
						>
							<svg
								class="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
								></path></svg
							>
							<div class="flex flex-col items-start leading-none">
								<span
									class="hidden text-[10px] font-bold uppercase tracking-wider opacity-70 sm:block"
									>Previous Steps</span
								>
								<span class="hidden font-bold sm:block">{page[pageIndex - 1]}</span>
								<span class="sm:hidden">Back</span>
							</div>
						</button>
					{/if}
				</div>
				<div>
					{#if pageIndex != page.length - 1}
						<button
							class="next btn btn-primary w-full gap-2 rounded-xl text-primary-content shadow-md transition-all hover:shadow-lg sm:w-auto"
							onclick={() => movepage(true)}
						>
							<div class="flex flex-col items-end leading-none">
								<span
									class="hidden text-[10px] font-bold uppercase tracking-wider opacity-80 sm:block"
									>Next Steps</span
								>
								<span class="hidden font-bold sm:block">{page[pageIndex + 1]}</span>
								<span class="sm:hidden">Next</span>
							</div>
							<svg
								class="h-5 w-5"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg
							>
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
