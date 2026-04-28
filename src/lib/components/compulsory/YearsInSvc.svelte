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

    function getRetirementDate(){
        if(svcdate=="" || bdate=="")
            return;

        dor = new Date(bdate);
        dor.setFullYear(dor.getFullYear()+56);
        retdate = dor.getFullYear()+"-"+(String(dor.getMonth()+1).padStart(2, '0'))+"-"+String(dor.getDate()).padStart(2, '0');
        YearsInSvc.dor = retdate;
        YearsInSvc.dob = bdate;
    }

    function getYearsInService(){
        if(svcdate=="" || bdate=="")
            return;

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
    
    function errorHandler(){
        if(svcdate=="")
            error = "Date Entered Service must not be empty.";
        else if(bdate=="")
            error = "Date of Birth must not be empty.";
        else if(validAge.year<18 && validAge.year>0)
            error = "You are to young to enter the service. <br> Please change Date Entered Service.";
        else if(validAge.year>35)
            error = "You are to old to enter the service. <br> Please change DES or DOB";
        else if(validAge.year<=0)
            error = "Invalid Date. Please change Date of Birth.";
        else if(totalsvc.year<20)
            error = "You are not qualified for this benefit. <br> Please change Date entered service.";
        else if(totalsvc.year<10 && totalsvc.year!=0 && totalsvc.month!=0 && totalsvc.day!=0)
            error = "You are not qualified for this benefit. <br> Please change Date entered service.";
        else if((new Date(dor))< (new Date("1991-01-29")))
            error = "Retirement is beyond BFP's established date.<br> Please change Date of Retirement.";
        else
            error = "";

        YearsInSvc.error.text = error;
        YearsInSvc.error.state = (error.length>0)? true:false;
    }

    function addOtherSvc(){
        if(svcdate=="" || bdate=="")
            return;

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
        if(svcdate=="" || bdate=="")
            return;

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
        });
        setTimeout(() => {
            introJs().setOptions({
                steps: [
                    {
                        element: 'label[for="dob"]',
                        intro: 'Please Enter your Date of Birth'
                    },
                    {
                        element: 'label[for="des"]',
                        intro: 'Please Enter your Date Entered Service'
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
                dontShowAgainCookie:'introYrsCom',
                dontShowAgainCookieDays:7
            }).start();
        }, 1000);
    });
</script>

<h2 class="card-title text-2xl font-bold mb-2">Calculate Years in Service</h2>
<p class="text-base-content/70 mb-6">Please enter the required dates to compute your service duration.</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-base-200 p-6 rounded-2xl">
    <div class="form-control w-full">
        <label for="dob" class="label font-semibold"><span class="label-text">Date of Birth</span></label> 
        <input id="dob" type="date" class="input input-bordered w-full" bind:value={bdate} onchange={()=>{getRetirementDate();getYearsInService();getAgeValidation();counterGovService();addOtherSvc();errorHandler();}}>
    </div>

    <div class="form-control w-full">
        <label for="des" class="label font-semibold"><span class="label-text">Date Entered Service</span></label> 
        <input id="des" type="date" class="input input-bordered w-full" bind:value={svcdate} onchange={()=>{getRetirementDate();getYearsInService();getAgeValidation();counterGovService();addOtherSvc();errorHandler();}}>
    </div>

    <div class="form-control w-full md:col-span-2">
        <label for="dor" class="label font-semibold"><span class="label-text">Date of Retirement</span></label> 
        <input id="dor" type="date" class="input input-bordered w-full bg-base-100/50" bind:value={retdate} readonly>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    <div class="card bg-primary text-primary-content shadow-lg">
        <div class="card-body">
            <h3 class="card-title text-sm opacity-90">Total Years in Service</h3>
            <div class="flex items-center justify-center gap-4 mt-2">
                <div class="text-center"><div class="font-mono text-4xl font-bold">{totalsvc.year}</div><div class="text-xs opacity-70">y</div></div>
                <div class="text-center"><div class="font-mono text-4xl font-bold">{totalsvc.month}</div><div class="text-xs opacity-70">m</div></div>
                <div class="text-center"><div class="font-mono text-4xl font-bold">{totalsvc.day}</div><div class="text-xs opacity-70">d</div></div>
            </div>
        </div>
    </div>
    
    {#if showOtherGovSvc}
    <div class="card bg-base-200 text-base-content shadow-lg border border-base-300">
        <div class="card-body">
            <h3 class="card-title text-sm opacity-70">BFP Service</h3>
            <div class="flex items-center justify-center gap-4 mt-2">
                <div class="text-center"><div class="font-mono text-4xl font-bold text-primary">{YearsInSvc.allService.bfp.years}</div><div class="text-xs opacity-70">y</div></div>
                <div class="text-center"><div class="font-mono text-4xl font-bold text-primary">{YearsInSvc.allService.bfp.months}</div><div class="text-xs opacity-70">m</div></div>
                <div class="text-center"><div class="font-mono text-4xl font-bold text-primary">{YearsInSvc.allService.bfp.days}</div><div class="text-xs opacity-70">d</div></div>
            </div>
        </div>
    </div>
    {/if}
</div>

<div class="divider">Adjustments</div>

<div class="space-y-4">
    <div class="bg-base-100 border border-base-200 p-4 rounded-xl shadow-sm">
        <label for="otherGovSvc" class="flex flex-row items-center justify-between cursor-pointer">
            <span class="font-medium">Other Government Service</span>
            <input id="otherGovSvc" type="checkbox" class="toggle toggle-success" bind:checked={showOtherGovSvc} onchange={()=>{getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}}>
        </label>
        {#if showOtherGovSvc}
            <div class="grid grid-cols-3 gap-4 mt-4">
                <div class="form-control">
                    <label class="label text-xs">Years</label>
                    <input type="number" min="0" max="20" class="input input-primary input-sm input-bordered w-full text-center"
                    bind:value={otherGovSvc.year} onchange={()=>{counterGovService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}} onkeyup={()=>{counterGovService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}}>
                </div> 
                <div class="form-control">
                    <label class="label text-xs">Months</label>
                    <input type="number" min="0" max="12" class="input input-primary input-sm input-bordered w-full text-center"
                    bind:value={otherGovSvc.month} onchange={()=>{counterGovService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}} onkeyup={()=>{counterGovService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}}>
                </div> 
                <div class="form-control">
                    <label class="label text-xs">Days</label>
                    <input type="number" min="0" max="30" class="input input-primary input-sm input-bordered w-full text-center"
                    bind:value={otherGovSvc.day} onchange={()=>{counterGovService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}} onkeyup={()=>{counterGovService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}}>
                </div> 
            </div>
        {/if}
    </div>

    <div class="bg-base-100 border border-base-200 p-4 rounded-xl shadow-sm">
        <label for="suspendedSvc" class="flex flex-row items-center justify-between cursor-pointer">
            <span class="font-medium">Gap(s) in Service</span>
            <input id="suspendedSvc" type="checkbox" class="toggle toggle-success" bind:checked={showSuspendedSvc} onchange={()=>{getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}}>
        </label>
        {#if showSuspendedSvc}
            <div class="grid grid-cols-3 gap-4 mt-4">
                <div class="form-control">
                    <label class="label text-xs">Years</label>
                    <input type="number" min="0" max="20" class="input input-error input-sm input-bordered w-full text-center"
                    bind:value={suspendedSvc.year} onchange={()=>{counterSuspendedService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}} onkeyup={()=>{counterSuspendedService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}}>
                </div> 
                <div class="form-control">
                    <label class="label text-xs">Months</label>
                    <input type="number" min="0" max="12" class="input input-error input-sm input-bordered w-full text-center"
                    bind:value={suspendedSvc.month} onchange={()=>{counterSuspendedService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}} onkeyup={()=>{counterSuspendedService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}}>
                </div> 
                <div class="form-control">
                    <label class="label text-xs">Days</label>
                    <input type="number" min="0" max="30" class="input input-error input-sm input-bordered w-full text-center"
                    bind:value={suspendedSvc.day} onchange={()=>{counterSuspendedService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}} onkeyup={()=>{counterSuspendedService();getRetirementDate();getYearsInService();addOtherSvc();errorHandler();}}>
                </div> 
            </div>
        {/if}
    </div>
</div>

{#if error && error.length>0}
    <div role="alert" class="alert alert-error mt-6 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current drop-shadow-sm" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-medium">{@html error}</span>
    </div>
{/if}