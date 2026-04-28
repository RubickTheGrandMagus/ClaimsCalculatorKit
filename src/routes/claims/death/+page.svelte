<script lang="ts">
	import { DeathIntro, DeathBenefits, SpecialFinancialAssistance, YearsInSvcComponent, CalculateHSR, Pension, LeaveCredits } from '$lib/components/death';
    import { YearsInSvc } from '$lib/components/death/shared.svelte';
    import { fly } from 'svelte/transition';

	let page = $state([
		'Intro',
		'Yrs in Svc',
		'HSR',
		'Pension',
		'Terminal',
        'Death Benefits',
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

<div class="flex flex-col xl:flex-row gap-6 p-4 md:p-8 max-w-7xl mx-auto h-full overflow-visible">
	<!-- Sidebar / Stepper Navigation -->
	<div class="xl:w-1/4 flex flex-col gap-4">
        <div class="bg-base-200 rounded-box p-4 shadow-sm border border-base-300">
            <h1 class="text-2xl font-bold px-4 pt-2 text-primary">Claims Calculator</h1>
            <p class="px-4 pb-4 text-sm opacity-70">Death Benefits Module</p>
            <ul class="steps steps-vertical w-full font-medium">
                {#each page as p, i}
                    <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                    <li class="step cursor-pointer transition-all hover:scale-[1.02] active:scale-95 {pageIndex >= i ? 'step-primary font-bold' : 'opacity-60'}" 
                        onclick={()=>{
                            if(i > pageIndex && YearsInSvc.error.state) return;
                            pageIndex = i;
                        }}>
                        {p}
                    </li>
                {/each}
            </ul>
        </div>
        
        <!-- Progress Indicator for Desktop -->
        <div class="bg-base-200 rounded-box p-6 shadow-sm border border-base-300 flex-row justify-between items-center hidden xl:flex">
             <div class="text-sm opacity-70 font-semibold uppercase tracking-wider">Progress</div>
             <div class="radial-progress text-primary font-bold bg-primary/10 border-4 border-primary/10" style="--value:{Math.round(((pageIndex) / (page.length - 1)) * 100)}; --size:3.5rem;">{Math.round(((pageIndex) / (page.length - 1)) * 100)}%</div>
        </div>
    </div>
    
	<!-- Main Content Area -->
	<div class="flex-1 flex flex-col min-w-0 h-full">
		<div class="card bg-base-100 shadow-xl border border-base-200 h-full overflow-visible">
			<div class="card-body p-6 md:p-10 flex flex-col min-h-[500px]">
                
                <!-- Dynamic Content Rendering -->
                <div class="flex-grow relative h-full">
                     {#if pageIndex==0}
                        <div in:fly={{ x: 20, duration: 400, delay: 100 }} out:fly={{ x: -20, duration: 200 }} class="absolute inset-0">
                            <DeathIntro />
                        </div>
                    {:else if pageIndex==1}
                        <div in:fly={{ x: 20, duration: 400, delay: 100 }} out:fly={{ x: -20, duration: 200 }} class="absolute inset-0">
                            <YearsInSvcComponent />    
                        </div>
                    {:else if pageIndex==2}
                        <div in:fly={{ x: 20, duration: 400, delay: 100 }} out:fly={{ x: -20, duration: 200 }} class="absolute inset-0">
                            <CalculateHSR />    
                        </div>
                    {:else if pageIndex==3}
                        <div in:fly={{ x: 20, duration: 400, delay: 100 }} out:fly={{ x: -20, duration: 200 }} class="absolute inset-0">
                            <Pension />    
                        </div>
                    {:else if pageIndex==4}
                        <div in:fly={{ x: 20, duration: 400, delay: 100 }} out:fly={{ x: -20, duration: 200 }} class="absolute inset-0">
                            <LeaveCredits />    
                        </div>
                    {:else if pageIndex==5}
                        <div in:fly={{ x: 20, duration: 400, delay: 100 }} out:fly={{ x: -20, duration: 200 }} class="absolute inset-0">
                            <DeathBenefits />    
                        </div>
                    {:else if pageIndex==6}
                        <div in:fly={{ x: 20, duration: 400, delay: 100 }} out:fly={{ x: -20, duration: 200 }} class="absolute inset-0">
                            <SpecialFinancialAssistance />    
                        </div>
                    {/if}
                </div>

                <!-- Navigation Controls -->
                <div class="flex justify-between items-center mt-12 pt-6 border-t border-base-200">
                    <div class="w-1/3 flex justify-start">
                        {#if pageIndex!=0}
                            <button class="prev btn btn-neutral btn-sm md:btn-md gap-3 shadow-md hover:shadow-lg transition-all"
                                onclick={()=>movepage(false)}>
                                <svg class="back h-5 w-5 md:h-6 md:w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>
                                <div class="flex flex-col items-start gap-0 leading-none">
                                    <span class="hidden text-[10px] uppercase font-bold text-neutral-content/60 md:block">Back</span>
                                    <span class="opacity-90">{page[pageIndex-1]}</span>
                                </div>
                            </button>
                        {/if}
                    </div>
                    
                    <div class="w-1/3 flex justify-center xl:hidden shrink-0">
                         <div class="radial-progress text-primary font-bold bg-primary/10 text-xs" style="--value:{Math.round(((pageIndex) / (page.length - 1)) * 100)}; --size:2.5rem; --thickness: 0.2rem;">{Math.round(((pageIndex) / (page.length - 1)) * 100)}%</div>
                    </div>

                    <div class="w-1/3 flex justify-end">
                        {#if pageIndex!=page.length-1}
                            <button class="next btn btn-primary btn-sm md:btn-md gap-3 shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition-all font-bold group" 
                                onclick={()=>movepage(true)}>
                                <div class="flex flex-col items-end gap-0 leading-none">
                                    <span class="hidden text-[10px] uppercase font-bold text-primary-content/70 md:block group-hover:text-primary-content transition-colors">Next</span>
                                    <span>{page[pageIndex+1]}</span>
                                </div>
                                <svg class="h-5 w-5 md:h-6 md:w-6 fill-current group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
                            </button>
                        {/if}
                    </div>
                </div>

			</div>
		</div>
	</div>
</div>