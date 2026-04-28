<script lang="ts">
	import { OtherIntro, YearsInSvcComponent, CalculateHSR, LeaveCredits } from '$lib/components/other';
    import { YearsInSvc } from '$lib/components/other/shared.svelte';
    import { fly, fade } from 'svelte/transition';

	let page = $state([
		'Intro',
		'Service Record',
		'Salary & Rank',
		'Terminal Computation'
	]);
    let pageIndex =$state(0);
    function movepage(direction:boolean){
        if((pageIndex==0 && !direction) || (pageIndex==page.length-1 && direction) || YearsInSvc.error.state) //dont move when beyond index
            return;

        if(direction)
            pageIndex +=1;
        else
            pageIndex -=1;
    }
</script>

<div class="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto w-full items-start">
    <div class="lg:w-1/4 xl:w-1/5 w-full bg-base-100 p-6 rounded-3xl shadow-lg border border-base-200 sticky top-6 z-10 shrink-0 hidden lg:block">
        <ul class="steps steps-vertical w-full h-full gap-4">
            {#each page as p, i}
                <li class="step {pageIndex >= i ? 'step-primary font-bold transition-all duration-300' : 'text-base-content/50'} 
                    {pageIndex === i ? 'text-primary scale-105 origin-left' : ''} text-sm cursor-pointer"
                    onclick={() => {
                        if(!YearsInSvc.error.state) {
                            pageIndex = i;
                        }
                    }}>
                    <span class="text-left leading-tight">{p}</span>
                </li>
            {/each}
        </ul>
    </div>
    <div class="lg:hidden w-full bg-base-100 p-4 rounded-2xl shadow-sm border border-base-200 mb-2">
        <ul class="steps w-full text-xs">
            {#each page as p, i}
                <li class="step {pageIndex >= i ? 'step-primary font-bold' : 'text-base-content/50'}"
                     onclick={() => {
                        if(!YearsInSvc.error.state) {
                            pageIndex = i;
                        }
                    }}>
                    {p}
                </li>
            {/each}
        </ul>
    </div>

    <div class="flex-1 w-full flex flex-col min-w-0">
        <div class="card w-full bg-base-100 shadow-xl border border-base-200 rounded-3xl overflow-hidden relative min-h-[600px]">
            <div class="card-body p-6 sm:p-8 md:p-10 flex flex-col h-full">
                <div class="flex-1 relative">
                    {#if pageIndex==0}
                        <div in:fly={{ x: 50, duration: 400, delay: 100 }} out:fade={{ duration: 100 }} class="absolute inset-0 overflow-y-auto overflow-x-hidden p-2">
                            <OtherIntro />
                        </div>
                    {:else if pageIndex==1}
                        <div in:fly={{ x: 50, duration: 400, delay: 100 }} out:fade={{ duration: 100 }} class="absolute inset-0 overflow-y-auto overflow-x-hidden p-2">
                            <YearsInSvcComponent />    
                        </div>
                    {:else if pageIndex==2}
                        <div in:fly={{ x: 50, duration: 400, delay: 100 }} out:fade={{ duration: 100 }} class="absolute inset-0 overflow-y-auto overflow-x-hidden p-2">
                            <CalculateHSR />    
                        </div>
                    {:else if pageIndex==3}
                        <div in:fly={{ x: 50, duration: 400, delay: 100 }} out:fade={{ duration: 100 }} class="absolute inset-0 overflow-y-auto overflow-x-hidden p-2">
                            <LeaveCredits />    
                        </div>
                    {/if}
                </div>
            </div>
            
            <div class="bg-base-200/50 p-4 sm:p-6 border-t border-base-200 flex justify-between items-center z-10 shrink-0">
                <div>
                    {#if pageIndex!=0}
                        <button class="btn btn-outline btn-primary shadow-sm hover:shadow-md transition-all rounded-xl gap-2 w-full sm:w-auto"
                            onclick={()=>movepage(false)}>
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
                            <div class="flex flex-col items-start leading-none">
                                <span class="text-[10px] uppercase opacity-70 font-bold tracking-wider hidden sm:block">Previous Steps</span>
                                <span class="font-bold hidden sm:block">{page[pageIndex-1]}</span>
                                <span class="sm:hidden">Back</span>
                            </div>
                        </button>
                    {/if}
                </div>
                <div>
                    {#if pageIndex!=page.length-1}
                        <button class="next btn btn-primary shadow-md hover:shadow-lg transition-all rounded-xl gap-2 w-full sm:w-auto text-primary-content" 
                            onclick={()=>movepage(true)}>
                            <div class="flex flex-col items-end leading-none">
                                <span class="text-[10px] uppercase opacity-80 font-bold tracking-wider hidden sm:block">Next Steps</span>
                                <span class="font-bold hidden sm:block">{page[pageIndex+1]}</span>
                                <span class="sm:hidden">Next</span>
                            </div>
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
                        </button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>