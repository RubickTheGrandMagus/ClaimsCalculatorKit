<script lang="ts">
	import type { PageData } from './$types';
	import { ComIntro, YearsInSvcComponent, CalculateHSR, Lumpsum, LeaveCredits } from '$lib/components';
    import { YearsInSvc } from '$lib/components/shared.svelte';
    import { fly } from 'svelte/transition';

	let { data }: { data: PageData } = $props();
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

<div class="flex flex-col items-center justify-center">
	<div class="card w-auto bg-base-100 shadow-xl">
		<div class="card-body">
            {#if pageIndex==0}
                <div in:fly={{ x: 200}}>
                    <ComIntro />
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
			<div class="flex justify-between">
				<div>
                    {#if pageIndex!=0}
                        <button class="btn btn-sm gap-2 md:btn-md lg:gap-3 {(pageIndex==page.length-1)? 'btn-neutral':''}"
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
				<div>
                    {#if pageIndex!=page.length-1}
                        <button class="btn btn-neutral btn-sm gap-2 md:btn-md lg:gap-3" 
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