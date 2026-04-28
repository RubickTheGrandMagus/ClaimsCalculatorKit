<script lang="ts">
	import { OptIntro, YearsInSvcComponent, CalculateHSR, Lumpsum, LeaveCredits } from '$lib/components/optional';
    import { YearsInSvc } from '$lib/components/optional/shared.svelte';
    import { fly } from 'svelte/transition';

	let page = $state([
		'Intro',
		'Yrs in Svc',
		'HSR',
		'Lumpsum',
		'Terminal'
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

<div class="flex flex-col items-center justify-center min-h-[70vh] p-4">
    <!-- Stepper indicator -->
    <ul class="steps steps-horizontal w-full max-w-4xl mb-8 overflow-x-auto">
        {#each page as stepLabel, i}
            <li class="step {i <= pageIndex ? 'step-primary' : ''} text-xs sm:text-sm font-medium whitespace-nowrap">{stepLabel}</li>
        {/each}
    </ul>

	<div class="card w-full max-w-4xl bg-base-100 shadow-xl border border-base-200">
		<div class="card-body">
            {#if pageIndex==0}
                <div in:fly={{ x: 200}}>
                    <OptIntro />
                </div>
            {:else if pageIndex==1}
                <div in:fly={{ x: 200}}>
                    <YearsInSvcComponent />    
                </div>
            {:else if pageIndex==2}
                <div in:fly={{ x: 200}}>
                    <CalculateHSR />    
                </div>
            {:else if pageIndex==3}
                <div in:fly={{ x: 200}}>
                    <Lumpsum />    
                </div>
            {:else if pageIndex==4}
                <div in:fly={{ x: 200}}>
                    <LeaveCredits />    
                </div>
            {/if}
			<div class="flex justify-between mt-8 pt-4 border-t border-base-200">
				<div>
                    {#if pageIndex!=0}
                        <button class="prev btn btn-sm gap-2 md:btn-md lg:gap-3 {(pageIndex==page.length-1)? 'btn-neutral':'btn-outline btn-primary'}"
                            onclick={()=>movepage(false)}
                            ><svg
                                class="h-6 w-6 fill-current md:h-8 md:w-8"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                ><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg
                            >
                            <div class="flex flex-col items-start">
                                <span class="hidden text-xs font-normal text-base-content/50 md:block">Prev</span>
                                    <span>{page[pageIndex-1]}</span>
                        </div></button><!---->
                    {/if}
				</div>
				<div class="flex justify-end w-full">
                    {#if pageIndex!=page.length-1}
                        <button class="next btn btn-primary btn-sm gap-2 md:btn-md lg:gap-3 shadow-md" 
                            onclick={()=>movepage(true)}
                            ><div class="flex flex-col items-end">
                                <span class="hidden text-xs font-normal text-neutral-content/50 md:block">Next</span>
                                <span>{page[pageIndex+1]}</span>
                            </div>
                            <svg
                                class="h-6 w-6 fill-current md:h-8 md:w-8"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                ><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg
                            ></button
                        ><!---->
                    {/if}
				</div>
			</div>
		</div>
	</div>
</div>