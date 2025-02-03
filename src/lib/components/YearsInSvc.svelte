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
        if(validAge.year<18)
            error = "You are to young to enter the service. Please change Date Entered Service.";
        else
            error = "";
    };
</script>

<h2 class="card-title">Calculate Years in Service</h2>
<p>Please Enter Dates</p>
<label for="dob" class="flex items-center gap-2">
    Date of Birth:
    <input id ="dob" type="date" class="grow input input-sm input-bordered" bind:value={bdate} onchange={()=>getRetirementDate()}>
</label>
<label for="des" class="flex items-center gap-2">
    Date Entered Service:
    <input id ="des" type="date" class="grow input input-sm input-bordered" bind:value={svcdate} onchange={()=>{getYearsInService();getAgeValidation()}}>
</label>
<label for="dor" class="flex items-center gap-2">
    Date of Retirement:
    <input id ="dor" type="date" class="grow input input-sm input-bordered" bind:value={retdate} readonly>
</label>
Total Years in Service: 
<div class="flex flex-row items-center">
    <span class="font-mono text-4xl">{totalsvc.year}</span> years
    <span class="font-mono text-4xl ml-2">{totalsvc.month}</span> months
    <span class="font-mono text-4xl ml-2">{totalsvc.day}</span> days
</div>
<span>{error}</span>