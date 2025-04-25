<script lang="ts">
    import {YearsInSvc} from './shared.svelte.js';

    let des: Date = $state(new Date());
    let dod: Date = $state(new Date());
    let dob: Date = $state(new Date());

    interface CalculatedDate{
        year:number,
        month:number,
        day:number
    }

    let deadate:string = $state((YearsInSvc.dod.length===0)? "":YearsInSvc.dod);
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
    let showOtherGovSvc:boolean = $state(YearsInSvc.allService.gov.state);
    let showSuspendedSvc:boolean = $state(YearsInSvc.allService.suspension.state);

    function getYearsInService(){
        des = new Date(svcdate);
        dod = new Date(deadate);
        totalsvc.year = dod.getFullYear()-des.getFullYear();
        totalsvc.month = dod.getMonth()-des.getMonth();
        totalsvc.day = dod.getDate()-des.getDate();
        
        calibrateGetYearsInService();
        
        YearsInSvc.dob = bdate;
        YearsInSvc.des = svcdate;
        YearsInSvc.dod = deadate;
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
        
        if(totalsvc.month<0){
            totalsvc.year -=1;
            totalsvc.month +=12;
        }

        if(totalsvc.day>=30){
            totalsvc.day -=30
            totalsvc.month +=1;
        }

        if(totalsvc.month>=12){
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

    function calibrateBFPService(){
        if(YearsInSvc.allService.bfp.days<0){
            YearsInSvc.allService.bfp.months -=1;
            YearsInSvc.allService.bfp.days +=30;
        }
        
        if(YearsInSvc.allService.bfp.days>=30){
            YearsInSvc.allService.bfp.months +=1;
            YearsInSvc.allService.bfp.days -= 30;
        }
        
        if(YearsInSvc.allService.bfp.months>=12){
            YearsInSvc.allService.bfp.years +=1;
            YearsInSvc.allService.bfp.months -= 12;
        }

        if(YearsInSvc.allService.bfp.months<0){
            YearsInSvc.allService.bfp.years -=1;
            YearsInSvc.allService.bfp.months +=12;
        }

        if(isNaN(YearsInSvc.allService.bfp.years))
            YearsInSvc.allService.bfp.years = 0;
        if(isNaN(YearsInSvc.allService.bfp.months))
            YearsInSvc.allService.bfp.months = 0;
        if(isNaN(YearsInSvc.allService.bfp.days))
            YearsInSvc.allService.bfp.days = 0;    
    }

    function getAgeValidation(){
        dob = new Date(bdate);
        validAge.year = des.getFullYear()-dob.getFullYear();
    };

    function validateDateofRetirement():boolean{
        let compulsoryDate = new Date(bdate);
        compulsoryDate.setFullYear(compulsoryDate.getFullYear()+56);
        const age56Formated = compulsoryDate.getFullYear()+"-"+(String(compulsoryDate.getMonth()+1).padStart(2, '0'))+"-"+String(compulsoryDate.getDate()).padStart(2, '0');
        if(deadate>age56Formated)
            return true;

        return false;
    }
    
    function errorHandler(){
        if(bdate=="")
            error = "Date of Birth must not be empty.";
        else if(svcdate=="")
            error = "Date Entered Service must not be empty.";
        else if(deadate=="")
            error = "Date of Death must not be empty.";
        else if(validAge.year<18 && validAge.year>0)
            error = "Too young to enter the service. <br> Please change Date Entered Service.";
        else if(validAge.year>35)
            error = "Too old to enter the service.<br> Please change DES or DOB";
        else if(validAge.year<=0)
            error = "Invalid Date. Please change Date of Birth.";
        else if(validateDateofRetirement())
            error = "Please change Date of Death.<br> It is above the mandatory age of 56.";
        else if((new Date(dod))< (new Date("1991-01-29")))
            error = "Death is beyond BFP's established date. <br> Please change Date of Death.";
        else
            error = "";

        YearsInSvc.error.text = error;
        YearsInSvc.error.state = (error.length>0)? true:false;
    }

    function addOtherSvc(){
        if(showOtherGovSvc){
            totalsvc.year += otherGovSvc.year;
            totalsvc.month += otherGovSvc.month;
            totalsvc.day += otherGovSvc.day;
        }
        if(showSuspendedSvc){
            totalsvc.year -= suspendedSvc.year;
            totalsvc.month -= suspendedSvc.month;
            totalsvc.day -= suspendedSvc.day;
            YearsInSvc.allService.bfp.years -= suspendedSvc.year;
            YearsInSvc.allService.bfp.months -= suspendedSvc.month;
            YearsInSvc.allService.bfp.days -= suspendedSvc.day;
        }

        calibrateGetYearsInService();
        calibrateBFPService();

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

    //intro guide for ease of use
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';

    onMount(() => {
        setTimeout(() => {
            introJs().exit(true);
        }, 500);
        setTimeout(() => {
            introJs().setOptions({
                steps: [
                    {
                        element: 'label[for="dob"]',
                        intro: 'Please Enter Date of Birth'
                    },
                    {
                        element: 'label[for="des"]',
                        intro: 'Please Enter Date Entered Service'
                    },
                    {
                        element: 'label[for="dod"]',
                        intro: 'Please Enter Date of Death'
                    },
                    {
                        element: 'label[for="otherGovSvc"]',
                        intro: 'Toggle to add Other Government Service'
                    },
                    {
                        element: 'label[for="suspendedSvc"]',
                        intro: 'Toggle to add Gap(s) in Service'
                    }
                ],
                dontShowAgain: true,
                showBullets:false,
                dontShowAgainCookie:'introYrsDeath',
                dontShowAgainCookieDays:7
            }).start();
        }, 1000);
    });
</script>

<h2 class="card-title">Calculate Years in Service - DEA</h2>
<p>Please Enter Dates</p>
<label for="dob" class="flex input mb-2">
    <span class="label">Date of Birth:</span> 
    <input id ="dob" type="date" class="text-right block" bind:value={bdate} onchange={()=>{getYearsInService();getAgeValidation();errorHandler();}}>
</label>
<label for="des" class="flex input mb-2">
    <span class="label">Date Entered Service:</span> 
    <input id ="des" type="date" class="text-right block" bind:value={svcdate} onchange={()=>{getYearsInService();getAgeValidation();errorHandler();}}>
</label>
<label for="dod" class="flex input mb-2">
    <span class="label">Date of Death:</span> 
    <input id ="dod" type="date" class="text-right block" bind:value={deadate} onchange={()=>{getYearsInService();getAgeValidation();errorHandler();}}>
</label>
Total Years in Service: 
<div class="flex flex-row items-center mb-2">
    <span class="font-mono text-4xl mr-2 ">{totalsvc.year}</span> years
    <span class="font-mono text-4xl mr-2 ml-2">{totalsvc.month}</span> months
    <span class="font-mono text-4xl mr-2 ml-2">{totalsvc.day}</span> days
</div>
{#if showOtherGovSvc}
    BFP Service: 
    <div class="flex flex-row items-center mb-2">
        <span class="font-mono text-4xl mr-2 ">{YearsInSvc.allService.bfp.years}</span> years
        <span class="font-mono text-4xl mr-2 ml-2">{YearsInSvc.allService.bfp.months}</span> months
        <span class="font-mono text-4xl mr-2 ml-2">{YearsInSvc.allService.bfp.days}</span> days
    </div>
{/if}
<label for="otherGovSvc" class="flex items-center mb-2">
    <input type="checkbox" class="toggle toggle-success mr-2" bind:checked={showOtherGovSvc} onchange={()=>{getYearsInService();addOtherSvc();errorHandler();}}>
    Other Government Service
</label>
{#if showOtherGovSvc}
    <div class="grid grid-cols-[auto,auto,auto]">
        <div class="p-1">
            <input type="number" min="0" max="20" class="w-14 input input-primary input-sm input-bordered text-right "
            bind:value={otherGovSvc.year} 
            onchange={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}}
            onkeyup={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}}
            >
            Yrs
        </div> 
        <div class="p-1">
            <input type="number" min="0" max="12" class="w-14 input input-primary input-sm input-bordered text-right "
            bind:value={otherGovSvc.month} 
            onchange={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}}
            onkeyup={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}}
            >
            Mos
        </div> 
        <div class="p-1">
            <input type="number" min="0" max="30" class="w-14 input input-primary input-sm input-bordered text-right "
            bind:value={otherGovSvc.day} 
            onchange={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}}
            onkeyup={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}}
            >
            Days
        </div> 
    </div>
{/if}
<label for="suspendedSvc" class="flex items-center mb-2">
    <input type="checkbox" class="toggle toggle-success mr-2" bind:checked={showSuspendedSvc} onchange={()=>{getYearsInService();addOtherSvc();errorHandler();}}>
    Gap(s) in Service
</label>
{#if showSuspendedSvc}
    <div class="grid grid-cols-[auto,auto,auto]">
        <div class="p-1">
            <input type="number" min="0" max="20" class="w-14 input input-error input-sm input-bordered text-right "
            bind:value={suspendedSvc.year} 
            onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}
            onkeyup={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}
            >
            Yrs
        </div> 
        <div class="p-1">
            <input type="number" min="0" max="12" class="w-14 input input-error input-sm input-bordered text-right "
            bind:value={suspendedSvc.month} 
            onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}
            onkeyup={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}
            >
            Mos
        </div> 
        <div class="p-1">
            <input type="number" min="0" max="30" class="w-14 input input-error input-sm input-bordered text-right "
            bind:value={suspendedSvc.day} 
            onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}
            onkeyup={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}
            >
            Days
        </div> 
    </div>
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
        <span>{@html error}</span>
    </div>
{/if}