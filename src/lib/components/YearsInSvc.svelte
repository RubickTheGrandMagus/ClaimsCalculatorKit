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
    let error:string = $state("");

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
        if(totalsvc.month<0){
            totalsvc.year -=1;
            totalsvc.month +=12;
        }

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
        else if(totalsvc.year<10)
            error = "You are not qualified for this benefit. Please change Date entered service.";
        else
            error = "";
    }
</script>

<h2 class="card-title">Calculate Years in Service</h2>
<p>Please Enter Dates</p>
<label for="dob" class="flex items-center gap-2 label">
    Date of Birth:
    <input id ="dob" type="date" class="grow input input-sm input-bordered" bind:value={bdate} onchange={()=>{getRetirementDate();getYearsInService();getAgeValidation();errorHandler()}}>
</label>
<label for="des" class="flex items-center gap-2 label">
    Date Entered Service:
    <input id ="des" type="date" class="grow input input-sm input-bordered" bind:value={svcdate} onchange={()=>{getRetirementDate();getYearsInService();getAgeValidation();errorHandler()}}>
</label>
<label for="dor" class="flex items-center gap-2 label">
    Date of Retirement:
    <input id ="dor" type="date" class="grow input input-sm input-bordered" bind:value={retdate} readonly>
</label>
Total Years in Service: 
<div class="flex flex-row items-center">
    <span class="font-mono text-4xl">{totalsvc.year}</span> years
    <span class="font-mono text-4xl ml-2">{totalsvc.month}</span> months
    <span class="font-mono text-4xl ml-2">{totalsvc.day}</span> days
</div>
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