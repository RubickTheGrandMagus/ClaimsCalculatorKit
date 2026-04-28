<script lang="ts">
	import { TppdIntro, YearsInSvcComponent, CalculateHSR, Gratuity, LeaveCredits, SpecialFinancialAssistance } from '$lib/components/tppd';
    import { YearsInSvc } from '$lib/components/optional/shared.svelte';
    import { fly } from 'svelte/transition';

	let page = $state([
		'Intro',
		'Yrs in Svc',
		'HSR',
		'Gratuity',
		'Terminal',
        'SFA'
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

<div class="flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto items-start">
    <div class="card bg-base-100 shadow-xl border border-base-200 lg:w-1/4 xl:w-1/5 sticky top-4 shrink-0">
        <div class="card-body p-6">
            <h2 class="card-title text-lg font-extrabold text-primary mb-6 border-b border-base-200 pb-4">
                TPPD Process
            </h2>
            <ul class="steps steps-vertical w-full font-sans">
                {#each page as step, i}
                    <li class="step {(i <= pageIndex) ? 'step-primary font-bold' : 'text-base-content/50'} text-left text-sm md:text-base cursor-pointer hover:opacity-80 transition-opacity"
                        class:step-primary={i <= pageIndex}
                        onclick={() => { 
                            if (!YearsInSvc.error.state || i < pageIndex) pageIndex = i; 
                        }}
                    >
                        {step}
                    </li>
                {/each}
            </ul>
        </div>
    </div>

    <div class="card bg-base-100 shadow-xl border border-base-200 flex-1 w-full relative overflow-hidden min-h-[600px]">
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>
        
        <div class="card-body p-6 sm:p-8 lg:p-10 flex flex-col justify-between z-10 w-full min-w-0">
            <div class="flex-1 w-full min-w-0 overflow-x-hidden">
                {#if pageIndex==0}
                    <div in:fly={{ x: 200, duration: 400 }}>
                        <TppdIntro />
                    </div>
                {:else if pageIndex==1}
                    <div in:fly={{ x: 200, duration: 400 }}>
                        <YearsInSvcComponent />    
                    </div>
                {:else if pageIndex==2}
                    <div in:fly={{ x: 200, duration: 400 }}>
                        <CalculateHSR />    
                    </div>
                {:else if pageIndex==3}
                    <div in:fly={{ x: 200, duration: 400 }}>
                        <Gratuity />    
                    </div>
                {:else if pageIndex==4}
                    <div in:fly={{ x: 200, duration: 400 }}>
                        <LeaveCredits />    
                    </div>
                {:else if pageIndex==5}
                    <div in:fly={{ x: 200, duration: 400 }}>
                        <SpecialFinancialAssistance />    
                    </div>
                {/if}
            </div>

            <div class="flex justify-between items-center mt-12 pt-6 border-t border-base-200">
                <div>
                    {#if pageIndex!=0}
                        <button class="btn btn-outline btn-neutral btn-sm md:btn-md gap-2"
                            onclick={()=>movepage(false)}>
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                            <span class="hidden sm:inline">Previous</span>
                        </button>
                    {/if}
                </div>
                <div>
                    {#if pageIndex!=page.length-1}
                        <button class="next btn btn-primary btn-sm md:btn-md gap-2 shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5" 
                            onclick={()=>movepage(true)}>
                            <span class="hidden sm:inline">Continue</span>
                            <span class="sm:hidden">Next</span>
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>