<script lang="ts">
    import {YearsInSvc} from './shared.svelte.js';
    let des: Date = $state(new Date());
    let dor: Date = $state(new Date());
    let dob: Date = $state(new Date());

    interface CalculatedDate{
        year:number,
        month:number,
        day:number
    }

    let retdate:string = $state((YearsInSvc.dor.length===0)? "":YearsInSvc.dor);
    let bdate:string = $state((YearsInSvc.dob.length===0)? "":YearsInSvc.dob);
    let svcdate:string = $state((YearsInSvc.des.length===0)? "":YearsInSvc.des);
    let totalsvc:CalculatedDate=$state({
        year:YearsInSvc.total.y,month:YearsInSvc.total.m,day:YearsInSvc.total.d
    });
    let validAge:CalculatedDate=$state({
        year:0,month:0,day:0
    });
    let otherGovSvc:CalculatedDate=$state({
        year:0,month:0,day:0
    });
    let suspendedSvc:CalculatedDate=$state({
        year:0,month:0,day:0
    });
    let error:string = $state("");
    let showSVCadd:boolean = $state(false);
    let showOtherGovSvc:boolean = $state(false);
    let showSuspendedSvc:boolean = $state(false);

    function getRetirementDate(){
        dor = new Date(bdate);
        dor.setFullYear(dor.getFullYear()+56);
        retdate = dor.toISOString().substring(0,10);
        YearsInSvc.dor = retdate;
        YearsInSvc.dob = bdate;
    }

    function getYearsInService(){
        des = new Date(svcdate);
        totalsvc.year = dor.getFullYear()-des.getFullYear();
        totalsvc.month = dor.getMonth()-des.getMonth();
        totalsvc.day = dor.getDate()-des.getDate();

        if(totalsvc.day<0){
            totalsvc.month -=1;
            totalsvc.day +=30;
        }
        
        if(totalsvc.day==30){
            totalsvc.month +=1;
            totalsvc.day = 0;
        }
        
        if(totalsvc.month==12){
            totalsvc.year +=1;
            totalsvc.month = 0;
        }

        if(totalsvc.month<0){
            totalsvc.year -=1;
            totalsvc.month +=12;
        }
        
        if(isNaN(totalsvc.year))
            totalsvc.year = 0;
        if(isNaN(totalsvc.month))
            totalsvc.month = 0;
        if(isNaN(totalsvc.day))
            totalsvc.day = 0;    

        YearsInSvc.des = svcdate;
        YearsInSvc.total.y = totalsvc.year;
        YearsInSvc.total.m = totalsvc.month;
        YearsInSvc.total.d = totalsvc.day;
        
    }

    function getAgeValidation(){
        dob = new Date(bdate);
        validAge.year = des.getFullYear()-dob.getFullYear();
    };
    
    function errorHandler(){
        if(validAge.year<18 && validAge.year>0)
            error = "You are to young to enter the service. Please change Date Entered Service.";
        else if(validAge.year>35)
            error = "You are to old to enter the service. Please change DES or DOB";
        else if(validAge.year<0)
            error = "Invalid Date. Please change Date of Birth.";
        else if(totalsvc.year<10 && totalsvc.year!=0 && totalsvc.month!=0 && totalsvc.day!=0)
            error = "You are not qualified for this benefit. Please change Date entered service.";
        else
            error = "";
    }

    function showSVCaddHandler(){
        showSVCadd = (totalsvc.year!=0 && totalsvc.month!=0 && totalsvc.day!=0)? true:false;
        if(error.length>0) showSVCadd = false;
    }
</script>

<h2 class="card-title">Calculate Years in Service</h2>
<p>Please Enter Dates</p>
<label for="dob" class="flex items-center gap-2 label">
    Date of Birth:
    <input id ="dob" type="date" class="grow input input-sm input-bordered text-right" bind:value={bdate} onchange={()=>{getRetirementDate();getYearsInService();getAgeValidation();errorHandler();showSVCaddHandler();}}>
</label>
<label for="des" class="flex items-center gap-2 label">
    Date Entered Service:
    <input id ="des" type="date" class="grow input input-sm input-bordered text-right" bind:value={svcdate} onchange={()=>{getRetirementDate();getYearsInService();getAgeValidation();errorHandler();showSVCaddHandler();}}>
</label>
<label for="dor" class="flex items-center gap-2 label">
    Date of Retirement:
    <input id ="dor" type="date" class="grow input input-sm input-bordered text-right" bind:value={retdate} readonly>
</label>
Total Years in Service: 
<div class="flex flex-row items-center">
    <span class="font-mono text-4xl">{totalsvc.year}</span> years
    <span class="font-mono text-4xl ml-2">{totalsvc.month}</span> months
    <span class="font-mono text-4xl ml-2">{totalsvc.day}</span> days
</div>
{#if showSVCadd}
    <label for="othergovsvc" class="label">
        <input type="checkbox" class="toggle toggle-success" bind:checked={showOtherGovSvc}/>
        Other Government Service
    </label>
    {#if showOtherGovSvc}
        <div class="grid grid-cols-[auto,auto,auto]">
            <div class="p-1">
                <input type="number" min="0" max="{35-YearsInSvc.total.y}" class="w-14 input input-primary input-sm input-bordered text-right "
                bind:value={otherGovSvc.year}>
                Yrs
            </div> 
            <div class="p-1">
                <input type="number" min="0" max="{11-YearsInSvc.total.m}" class="w-14 input input-primary input-sm input-bordered text-right "
                bind:value={otherGovSvc.month}>
                Mos
            </div> 
            <div class="p-1">
                <input type="number" min="0" max="{30-YearsInSvc.total.d}" class="w-14 input input-primary input-sm input-bordered text-right "
                bind:value={otherGovSvc.day}>
                Days
            </div> 
        </div>
    {/if}
    <label for="suspendedsvc" class="label">
        <input type="checkbox" class="toggle toggle-success" bind:checked={showSuspendedSvc}/>
        Suspended in Service
    </label>
    {#if showSuspendedSvc}
        <div class="grid grid-cols-[auto,auto,auto]">
            <div class="p-1">
                <input type="number" min="0" max="1" class="w-14 input input-primary input-sm input-bordered text-right "
                bind:value={suspendedSvc.year}>
                Yrs
            </div> 
            <div class="p-1">
                <input type="number" min="0" max="12" class="w-14 input input-primary input-sm input-bordered text-right "
                bind:value={suspendedSvc.month}>
                Mos
            </div> 
            <div class="p-1">
                <input type="number" min="0" max="30" class="w-14 input input-primary input-sm input-bordered text-right "
                bind:value={suspendedSvc.day}>
                Days
            </div> 
        </div>
    {/if}
{/if}
{#if error.length>0}
    <div role="alert" class="alert alert-error">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        <span>{error}</span>
    </div>
{/if}