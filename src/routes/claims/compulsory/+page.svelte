<script lang="ts">
	import type { PageData } from './$types';
	import { ComIntro } from '$lib/components';

	let { data }: { data: PageData } = $props();
	let page = $state([
		'Introduction',
		'Calculate Years in Service',
		'Highest Salary Received',
		'Computation of Gratuity Claim',
		'Computation of Terminal Claim'
	]);
    let pageIndex =$state(0);
    function movepage(direction:boolean){
        if((pageIndex==0 && !direction) || (pageIndex==page.length-1 && direction)) //dont move when beyond index
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
			    <ComIntro />    
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