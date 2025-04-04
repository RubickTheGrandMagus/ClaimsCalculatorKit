<script lang="ts">
    import {YearsInSvc, HighestSalaryReceived} from './shared.svelte.js';

    const daysInAYear:number = 360;
    let des: Date = $state(new Date());
    let dos: Date = $state(new Date());
    let dob: Date = $state(new Date());

    interface CalculatedDate{
        year:number,
        month:number,
        day:number
    }

    let sepdate:string = $state((YearsInSvc.dos.length===0)? "":YearsInSvc.dos);
    let bdate:string = $state((YearsInSvc.dob.length===0)? "":YearsInSvc.dob);
    let svcdate:string = $state((YearsInSvc.des.length===0)? "":YearsInSvc.des);
    let totalsvc:CalculatedDate=$state({
        year:YearsInSvc.total.y,month:YearsInSvc.total.m,day:YearsInSvc.total.d
    });
    let validAge:CalculatedDate=$state({
        year:0,month:0,day:0
    });
    let suspendedSvc:CalculatedDate=$state({
        year:YearsInSvc.allService.suspension.years,
        month:YearsInSvc.allService.suspension.months,
        day:YearsInSvc.allService.suspension.days
    });
    let error:string = $state(YearsInSvc.error.text);
    let showSVCadd:boolean = $state(YearsInSvc.allService.state);
    let showSuspendedSvc:boolean = $state(YearsInSvc.allService.suspension.state);
    let showIsNUP:boolean = $state(YearsInSvc.isNUP);

    function getYearsInService(){
        dob = new Date(bdate);
        des = new Date(svcdate);
        dos = new Date(sepdate);
        totalsvc.year = dos.getFullYear()-des.getFullYear();
        totalsvc.month = dos.getMonth()-des.getMonth();
        totalsvc.day = dos.getDate()-des.getDate();

        calibrateGetYearsInService();

        YearsInSvc.dob = bdate;
        YearsInSvc.des = svcdate;
        YearsInSvc.dos = sepdate;
        YearsInSvc.total.y = totalsvc.year;
        YearsInSvc.total.m = totalsvc.month;
        YearsInSvc.total.d = totalsvc.day;
        YearsInSvc.allService.bfp.years = totalsvc.year;
        YearsInSvc.allService.bfp.months = totalsvc.month;
        YearsInSvc.allService.bfp.days = totalsvc.day;
    }

    function calibrateGetYearsInService(){
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

        if(totalsvc.day>30){
            totalsvc.day -=30
            totalsvc.month +=1;
        }

        if(totalsvc.month>12){
            totalsvc.month -=12;
            totalsvc.year +=1;
        }
        
        if(isNaN(totalsvc.year))
            totalsvc.year = 0;
        if(isNaN(totalsvc.month))
            totalsvc.month = 0;
        if(isNaN(totalsvc.day))
            totalsvc.day = 0;    
    }

    function getAgeValidation(){
        dob = new Date(bdate);
        validAge.year = des.getFullYear()-dob.getFullYear();
    };

    function validateDateofRetirement():boolean{
        let compulsoryDate = new Date(bdate);
        compulsoryDate.setFullYear(compulsoryDate.getFullYear()+56);
        const age56Formated = compulsoryDate.getFullYear()+"-"+(String(compulsoryDate.getMonth()+1).padStart(2, '0'))+"-"+String(compulsoryDate.getDate()).padStart(2, '0');
        if(sepdate>age56Formated)
            return true;

        return false;
    }
    function validateDateofRetirementNUP():boolean{
        let compulsoryDate = new Date(bdate);
        compulsoryDate.setFullYear(compulsoryDate.getFullYear()+65);
        const age65Formated = compulsoryDate.getFullYear()+"-"+(String(compulsoryDate.getMonth()+1).padStart(2, '0'))+"-"+String(compulsoryDate.getDate()).padStart(2, '0');
        if(sepdate>age65Formated)
            return true;

        return false;
    }
    
    function errorHandler(){
        if(validAge.year<18 && validAge.year>0)
            error = "You are to young to enter the service. Please change Date Entered Service.";
        else if(validAge.year>35)
            error = "You are to old to enter the service. Please change DES or DOB";
        else if(validAge.year<=0)
            error = "Invalid Date. Please change Date of Birth.";
        else if(bdate=="")
            error = "Date of Birth must not be empty.";
        else if(svcdate=="")
            error = "Date Entered Service must not be empty.";
        else if(sepdate=="")
            error = "Date Separated must not be empty.";
        else if(validateDateofRetirement() && !showIsNUP)
            error = "Please change Date of Separation. It is above the mandatory age of 56.";
        else if(validateDateofRetirementNUP() && showIsNUP)
            error = "Please change Date of Separation. It is above the mandatory age of 65.";
        else if((new Date(dos))< (new Date("1991-01-29")))
            error = "Severance is beyond BFP's established date. Please change Date of Separation.";
        else if(totalsvc.year<0)
            error = "Invalid Years in Service. Please change added suspension";
        else
            error = "";

        YearsInSvc.error.text = error;
        YearsInSvc.error.state = (error.length>0)? true:false;
    }

    function toggleNUP(){
        YearsInSvc.isNUP = showIsNUP;
    }

    function showSVCaddHandler(){
        showSVCadd = (totalsvc.year!=0 || totalsvc.month!=0 || totalsvc.day!=0)? true:false;
        if(error.length>0) showSVCadd = false;

        YearsInSvc.allService.state = showSVCadd;
    }

    function addOtherSvc(){
        if(!showSVCadd)
            return
        if(showSuspendedSvc){
            totalsvc.year -= suspendedSvc.year;
            totalsvc.month -= suspendedSvc.month;
            totalsvc.day -= suspendedSvc.day;
            
            getBFPservice();
        }

        calibrateGetYearsInService();

        YearsInSvc.des = svcdate;
        YearsInSvc.total.y = totalsvc.year;
        YearsInSvc.total.m = totalsvc.month;
        YearsInSvc.total.d = totalsvc.day;

        YearsInSvc.allService.suspension.state = showSuspendedSvc;
    }

    function counterSuspendedService(){
        if(suspendedSvc.day>=30){
            suspendedSvc.day = 0;
            suspendedSvc.month += 1;
        }
        if(suspendedSvc.month>=12){
            suspendedSvc.month = 0;
            suspendedSvc.year += 1;
        }
        if(suspendedSvc.day<0)
            suspendedSvc.day = 0;
        if(suspendedSvc.month<0)
            suspendedSvc.month = 0;
        if(suspendedSvc.year<0)
            suspendedSvc.year = 0;

        YearsInSvc.allService.suspension.years = suspendedSvc.year;
        YearsInSvc.allService.suspension.months = suspendedSvc.month;
        YearsInSvc.allService.suspension.days = suspendedSvc.day;
    }

    function getBFPservice(){
        YearsInSvc.allService.bfp.years -= suspendedSvc.year;
        YearsInSvc.allService.bfp.months -= suspendedSvc.month;
        YearsInSvc.allService.bfp.days -= suspendedSvc.day;

        if(YearsInSvc.allService.bfp.months==12){
            YearsInSvc.allService.bfp.years +=1;
            YearsInSvc.allService.bfp.months = 0;
        }
        if(YearsInSvc.allService.bfp.days==30){
            YearsInSvc.allService.bfp.months +=1;
            YearsInSvc.allService.bfp.days = 0;
        }
    }
</script>

<h2 class="card-title">Calculate Years in Service</h2>
<p>Please Enter Dates</p>
<label for="dob" class="flex input mb-2">
    <span class="label">Date of Birth:</span> 
    <input id ="dob" type="date" class="text-right block" bind:value={bdate} onchange={()=>{getYearsInService();getAgeValidation();errorHandler();showSVCaddHandler();}}>
</label>
<label for="des" class="flex input mb-2">
    <span class="label">Date Entered Service:</span> 
    <input id ="des" type="date" class="text-right block" bind:value={svcdate} onchange={()=>{getYearsInService();getAgeValidation();errorHandler();showSVCaddHandler();}}>
</label>
<label for="dos" class="flex input mb-2">
    <span class="label">Date Separated:</span> 
    <input id ="dos" type="date" class="text-right block" bind:value={sepdate} onchange={()=>{getYearsInService();getAgeValidation();errorHandler();showSVCaddHandler();}}>
</label>
Total Years in Service: 
<div class="flex flex-row items-center mb-2">
    <span class="font-mono text-4xl">{totalsvc.year}</span> years
    <span class="font-mono text-4xl ml-2">{totalsvc.month}</span> months
    <span class="font-mono text-4xl ml-2">{totalsvc.day}</span> days
</div>
{#if showSVCadd}
    <label for="suspendedsvc" class="flex items-center mb-2">
        <input type="checkbox" class="toggle toggle-success" bind:checked={showSuspendedSvc} onchange={()=>{getYearsInService();addOtherSvc();}}>
        Suspended/Detained/Rehab in Service
    </label>
    {#if showSuspendedSvc}
        <div class="grid grid-cols-[auto,auto,auto]">
            <div class="p-1">
                <input type="number" min="0" max="20" class="w-14 input input-error input-sm input-bordered text-right "
                bind:value={suspendedSvc.year} onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}>
                Yrs
            </div> 
            <div class="p-1">
                <input type="number" min="0" max="12" class="w-14 input input-error input-sm input-bordered text-right "
                bind:value={suspendedSvc.month} onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}>
                Mos
            </div> 
            <div class="p-1">
                <input type="number" min="0" max="30" class="w-14 input input-error input-sm input-bordered text-right "
                bind:value={suspendedSvc.day} onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}>
                Days
            </div> 
        </div>
    {/if}
{/if}
{#if validateDateofRetirement()}
    <label for="rank" class="flex mb-2">
        <input type="checkbox" class="toggle toggle-success mr-2" bind:checked={showIsNUP} onchange={()=>{toggleNUP();errorHandler();showSVCaddHandler();}}/>
        <span class="{(showIsNUP)? "": "text-gray-400"}">{(showIsNUP)? " Personnel is NUP":" Personnel is non-NUP"}</span>
    </label>
{/if}
{#if error.length>0}
    <div role="alert" class="alert alert-error mt-2">
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