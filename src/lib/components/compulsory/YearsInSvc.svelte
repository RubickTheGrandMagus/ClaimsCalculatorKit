<script lang="ts">
    import {YearsInSvc} from './shared.svelte.js';

    const daysInAYear:number = 360;
    const minimumDaysInService:number = 10*daysInAYear; //Number of Days in 10 Years of Service
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
        year:YearsInSvc.allService.gov.years,
        month:YearsInSvc.allService.gov.months,
        day:YearsInSvc.allService.gov.days
    });
    let suspendedSvc:CalculatedDate=$state({
        year:YearsInSvc.allService.suspension.years,
        month:YearsInSvc.allService.suspension.months,
        day:YearsInSvc.allService.suspension.days
    });
    let error:string = $state(YearsInSvc.error.text);
    let showSVCadd:boolean = $state(YearsInSvc.allService.state);
    let showOtherGovSvc:boolean = $state(YearsInSvc.allService.gov.state);
    let showSuspendedSvc:boolean = $state(YearsInSvc.allService.suspension.state);

    function getRetirementDate(){
        dor = new Date(bdate);
        dor.setFullYear(dor.getFullYear()+56);
        retdate = dor.getFullYear()+"-"+(String(dor.getMonth()+1).padStart(2, '0'))+"-"+String(dor.getDate()).padStart(2, '0');
        YearsInSvc.dor = retdate;
        YearsInSvc.dob = bdate;
    }

    function getYearsInService(){
        des = new Date(svcdate);
        totalsvc.year = dor.getFullYear()-des.getFullYear();
        totalsvc.month = dor.getMonth()-des.getMonth();
        totalsvc.day = dor.getDate()-des.getDate();

        calibrateGetYearsInService();

        YearsInSvc.des = svcdate;
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
        
        if(totalsvc.day>=30){
            totalsvc.month +=1;
            totalsvc.day -= 30;
        }
        
        if(totalsvc.month>=12){
            totalsvc.year +=1;
            totalsvc.month -= 12;
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
        else if(validAge.year<=0)
            error = "Invalid Date. Please change Date of Birth.";
        else if(svcdate=="")
            error = "Date Entered Service must not be empty.";
        else if(totalsvc.year<10 && totalsvc.year!=0 && totalsvc.month!=0 && totalsvc.day!=0)
            error = "You are not qualified for this benefit. Please change Date entered service.";
        else if((new Date(dor))< (new Date("1991-01-29")))
            error = "Retirement is beyond BFP's established date. Please change Date of Retirement.";
        else
            error = "";

        YearsInSvc.error.text = error;
        YearsInSvc.error.state = (error.length>0)? true:false;
    }

    function showSVCaddHandler(){
        showSVCadd = (totalsvc.year!=0)? true:false;
        if(error.length>0) showSVCadd = false;

        YearsInSvc.allService.state = showSVCadd;
    }

    function addOtherSvc(){
        if(!showSVCadd)
            return

        if(showOtherGovSvc){
            totalsvc.year += otherGovSvc.year;
            totalsvc.month += otherGovSvc.month;
            totalsvc.day += otherGovSvc.day;
        }
        if(showSuspendedSvc){
            totalsvc.year -= suspendedSvc.year;
            totalsvc.month -= suspendedSvc.month;
            totalsvc.day -= suspendedSvc.day;
            
            getBFPserviceVSsuspension();
        }

        calibrateGetYearsInService();

        if(totalsvc.year*daysInAYear<minimumDaysInService ){
            totalsvc.year = 10;
            totalsvc.month = 0;
            totalsvc.day = 0;
        }

        YearsInSvc.des = svcdate;
        YearsInSvc.total.y = totalsvc.year;
        YearsInSvc.total.m = totalsvc.month;
        YearsInSvc.total.d = totalsvc.day;

        YearsInSvc.allService.gov.state = showOtherGovSvc;
        YearsInSvc.allService.suspension.state = showSuspendedSvc;
    }

    function counterGovService(){
        if(otherGovSvc.day>=30){
            otherGovSvc.day =0;
            otherGovSvc.month +=1;
        }
        if(otherGovSvc.month>=12){
            otherGovSvc.month = 0;
            otherGovSvc.year +=1;
        }
        if(otherGovSvc.day<0)
            otherGovSvc.day = 0;
        if(otherGovSvc.month<0)
            otherGovSvc.month = 0;
        if(otherGovSvc.year<0)
            otherGovSvc.year = 0;

        YearsInSvc.allService.gov.years = otherGovSvc.year;
        YearsInSvc.allService.gov.months = otherGovSvc.month;
        YearsInSvc.allService.gov.days = otherGovSvc.day;
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

    function getBFPserviceVSsuspension(){
        YearsInSvc.allService.bfp.years -= suspendedSvc.year;
        YearsInSvc.allService.bfp.months -= suspendedSvc.month;
        YearsInSvc.allService.bfp.days -= suspendedSvc.day;

        if(YearsInSvc.allService.bfp.years*daysInAYear < minimumDaysInService){
            YearsInSvc.allService.bfp.years = 10;
            YearsInSvc.allService.bfp.months = 0;
            YearsInSvc.allService.bfp.days = 0;
        }

        if(YearsInSvc.allService.bfp.months>=12){
            YearsInSvc.allService.bfp.years +=1;
            YearsInSvc.allService.bfp.months -= 12;
        }
        if(YearsInSvc.allService.bfp.days>=30){
            YearsInSvc.allService.bfp.months +=1;
            YearsInSvc.allService.bfp.days -= 30;
        }
        if(YearsInSvc.allService.bfp.months<0){
            YearsInSvc.allService.bfp.years -= 1;
            YearsInSvc.allService.bfp.months += 12;
        }
        if(YearsInSvc.allService.bfp.days<0){
            YearsInSvc.allService.bfp.months -= 1;
            YearsInSvc.allService.bfp.days += 30;
        }
    }

    //intro guide for ease of use
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';

    onMount(() => {
        introJs().setOptions({
            steps: [
                {
                    element: 'label[for="dob"]',
                    intro: 'Please Enter your Date of Birth'
                },
                {
                    element: 'label[for="des"]',
                    intro: 'Please Enter your Date Entered Service'
                }
            ],
            dontShowAgain: true,
            showBullets:false,
            dontShowAgainCookie:'introYrsCom',
            dontShowAgainCookieDays:7
        }).start();
    });
</script>

<h2 class="card-title">Calculate Years in Service - COM</h2>
<p>Please Enter Dates</p>
<label for="dob" class="flex input mb-2">
    <span class="label">Date of Birth:</span> 
    <input id ="dob" type="date" class="text-right block" bind:value={bdate} onchange={()=>{getRetirementDate();getYearsInService();getAgeValidation();errorHandler();showSVCaddHandler();}}>
</label>
<label for="des" class="flex input mb-2">
    <span class="label">Date Entered Service:</span> 
    <input id ="des" type="date" class="text-right block" bind:value={svcdate} onchange={()=>{getRetirementDate();getYearsInService();getAgeValidation();errorHandler();showSVCaddHandler();}}>
</label>
<label for="dor" class="flex input mb-2">
    <span class="label">Date of Retirement:</span> 
    <input id ="dor" type="date" class="text-right block" bind:value={retdate} readonly>
</label>
Total Years in Service: 
<div class="flex flex-row items-center mb-2">
    <span class="font-mono text-4xl">{totalsvc.year}</span> years
    <span class="font-mono text-4xl ml-2">{totalsvc.month}</span> months
    <span class="font-mono text-4xl ml-2">{totalsvc.day}</span> days
</div>
{#if showOtherGovSvc}
    BFP Service: 
    <div class="flex flex-row items-center mb-2">
        <span class="font-mono text-4xl">{YearsInSvc.allService.bfp.years}</span> years
        <span class="font-mono text-4xl ml-2">{YearsInSvc.allService.bfp.months}</span> months
        <span class="font-mono text-4xl ml-2">{YearsInSvc.allService.bfp.days}</span> days
    </div>
{/if}
{#if showSVCadd}
    <label for="othergovsvc" class="flex items-center mb-2">
        <input type="checkbox" class="toggle toggle-success mr-2" bind:checked={showOtherGovSvc} onchange={()=>{getRetirementDate();getYearsInService();addOtherSvc();}}>
        Other Government Service
    </label>
    {#if showOtherGovSvc}
        <div class="grid grid-cols-[auto,auto,auto]">
            <div class="p-1">
                <input type="number" min="0" max="20" class="w-14 input input-primary input-sm input-bordered text-right "
                bind:value={otherGovSvc.year} onchange={()=>{counterGovService();getRetirementDate();getYearsInService();addOtherSvc();}}>
                Yrs
            </div> 
            <div class="p-1">
                <input type="number" min="0" max="12" class="w-14 input input-primary input-sm input-bordered text-right "
                bind:value={otherGovSvc.month} onchange={()=>{counterGovService();getRetirementDate();getYearsInService();addOtherSvc();}}>
                Mos
            </div> 
            <div class="p-1">
                <input type="number" min="0" max="30" class="w-14 input input-primary input-sm input-bordered text-right "
                bind:value={otherGovSvc.day} onchange={()=>{counterGovService();getRetirementDate();getYearsInService();addOtherSvc();}}>
                Days
            </div> 
        </div>
    {/if}
    <label for="suspendedsvc" class="flex items-center mb-2">
        <input type="checkbox" class="toggle toggle-success mr-2" bind:checked={showSuspendedSvc} onchange={()=>{getRetirementDate();getYearsInService();addOtherSvc();}}>
        Gap in Service
    </label>
    {#if showSuspendedSvc}
        <div class="grid grid-cols-[auto,auto,auto]">
            <div class="p-1">
                <input type="number" min="0" max="20" class="w-14 input input-error input-sm input-bordered text-right "
                bind:value={suspendedSvc.year} onchange={()=>{counterSuspendedService();getRetirementDate();getYearsInService();addOtherSvc();}}>
                Yrs
            </div> 
            <div class="p-1">
                <input type="number" min="0" max="12" class="w-14 input input-error input-sm input-bordered text-right "
                bind:value={suspendedSvc.month} onchange={()=>{counterSuspendedService();getRetirementDate();getYearsInService();addOtherSvc();}}>
                Mos
            </div> 
            <div class="p-1">
                <input type="number" min="0" max="30" class="w-14 input input-error input-sm input-bordered text-right "
                bind:value={suspendedSvc.day} onchange={()=>{counterSuspendedService();getRetirementDate();getYearsInService();addOtherSvc();}}>
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