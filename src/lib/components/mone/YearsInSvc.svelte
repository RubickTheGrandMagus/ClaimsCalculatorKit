<script lang="ts">
    import {YearsInSvc} from './shared.svelte.js';

    const daysInAYear:number = 360;
    const minimumAccumulatedDaysInService:number = 360; //minimum days to qualify for monetization
    let des: Date = $state(new Date());
    let doa: Date = $state(new Date());
    let dob: Date = $state(new Date());

    interface CalculatedDate{
        year:number,
        month:number,
        day:number
    }

    let appdate:string = $state((YearsInSvc.doa.length===0)? (new Date()).toISOString().slice(0,10):YearsInSvc.doa);
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
    let showSuspendedSvc:boolean = $state(YearsInSvc.allService.suspension.state);
    let showIsNUP:boolean = $state(YearsInSvc.isNUP);

    function getYearsInService(){
        if(appdate=="" || svcdate=="" || bdate=="")
            return;

        dob = new Date(bdate);
        des = new Date(svcdate);
        doa = new Date(appdate);
        totalsvc.year = doa.getFullYear()-des.getFullYear();
        totalsvc.month = doa.getMonth()-des.getMonth();
        totalsvc.day = doa.getDate()-des.getDate();

        calibrateGetYearsInService();

        YearsInSvc.dob = bdate;
        YearsInSvc.des = svcdate;
        YearsInSvc.doa = appdate;
        YearsInSvc.total.y = totalsvc.year;
        YearsInSvc.total.m = totalsvc.month;
        YearsInSvc.total.d = totalsvc.day;
        YearsInSvc.allService.bfp.years = totalsvc.year;
        YearsInSvc.allService.bfp.months = totalsvc.month;
        YearsInSvc.allService.bfp.days = totalsvc.day;
    }

    function calibrateGetYearsInService(){
        if(appdate=="" || svcdate=="" || bdate=="")
            return;

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
        if(appdate=="" || svcdate=="" || bdate=="")
            return;

        dob = new Date(bdate);
        validAge.year = des.getFullYear()-dob.getFullYear();
    };

    function validateDateofRetirement():boolean{
        let compulsoryDate = new Date(bdate);
        compulsoryDate.setFullYear(compulsoryDate.getFullYear()+56);
        const age56Formated = compulsoryDate.getFullYear()+"-"+(String(compulsoryDate.getMonth()+1).padStart(2, '0'))+"-"+String(compulsoryDate.getDate()).padStart(2, '0');
        if(appdate>age56Formated)
            return true;

        return false;
    }
    function validateDateofRetirementNUP():boolean{
        let compulsoryDate = new Date(bdate);
        compulsoryDate.setFullYear(compulsoryDate.getFullYear()+65);
        const age65Formated = compulsoryDate.getFullYear()+"-"+(String(compulsoryDate.getMonth()+1).padStart(2, '0'))+"-"+String(compulsoryDate.getDate()).padStart(2, '0');
        if(appdate>age65Formated)
            return true;

        return false;
    }
    
    function errorHandler(){
        if(bdate=="")
            error = "Date of Birth must not be empty.";
        else if(svcdate=="")
            error = "Date Entered Service must not be empty.";
        else if(appdate=="")
            error = "Date Applied must not be empty.";
        else if(validAge.year<18 && validAge.year>0)
            error = "You are to young to enter the service. <br> Please change Date Entered Service.";
        else if(validAge.year>35)
            error = "You are to old to enter the service.<br> Please change DES or DOB";
        else if(validAge.year<=0)
            error = "Invalid Date. Please change Date of Birth.";
        else if(validateDateofRetirement() && !showIsNUP)
            error = "Please change Date Applied.<br> It is above the mandatory age of 56.";
        else if(validateDateofRetirementNUP() && showIsNUP)
            error = "Please change Date Applied.<br> It is above the mandatory age of 65.";
        else if((new Date(doa))< (new Date("1991-01-29")))
            error = "Application date is beyond BFP's established date. <br> Please change Date Applied.";
        else if(totalsvc.year<0)
            error = "Invalid Years in Service. <br> Please change added suspension";
        else if(!validAccumulatedDaysInService())
            error = "Minimum years in service is 1 year. <br> Please change date of application.";
        else
            error = "";

        YearsInSvc.error.text = error;
        YearsInSvc.error.state = (error.length>0)? true:false;
    }

    function toggleNUP(){
        YearsInSvc.isNUP = showIsNUP;
    }

    function addOtherSvc(){
        if(appdate=="" || svcdate=="" || bdate=="")
            return;

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

        YearsInSvc.allService.suspension.state = showSuspendedSvc;
    }

    function counterSuspendedService(){
        if(appdate=="" || svcdate=="" || bdate=="")
            return;

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

    function validAccumulatedDaysInService():boolean{
        let totalDaysInService = (totalsvc.year*daysInAYear) + (totalsvc.month*30) + totalsvc.day;

        if(totalDaysInService>=minimumAccumulatedDaysInService)
            return true;
        
        return false;
    }

     //intro guide for ease of use
     import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';

    onMount(() => {
        setTimeout(() => {
            introJs().exit(true);
        },500);
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
                        element: 'label[for="doa"]',
                        intro: 'Please Enter your Date Applied'
                    },
                    {
                        element: 'label[for="suspendedSvc"]',
                        intro: 'Toggle to add Gap(s) in Service'
                    }
                ],
                dontShowAgain: true,
                showBullets:false,
                dontShowAgainCookie:'introYrs',
                dontShowAgainCookieDays:7
            }).start();
        }, 1000);
    });
</script>

<h2 class="card-title">Calculate Years in Service - MLC</h2>
<p>Please Enter Dates</p>
<label for="dob" class="flex input mb-2">
    <span class="label">Date of Birth:</span> 
    <input id ="dob" type="date" class="text-right block" bind:value={bdate} onchange={()=>{getYearsInService();getAgeValidation();errorHandler();}}>
</label>
<label for="des" class="flex input mb-2">
    <span class="label">Date Entered Service:</span> 
    <input id ="des" type="date" class="text-right block" bind:value={svcdate} onchange={()=>{getYearsInService();getAgeValidation();errorHandler();}}>
</label>
<label for="doa" class="flex input mb-2">
    <span class="label">Date Applied:</span> 
    <input id ="doa" type="date" class="text-right block" bind:value={appdate} onchange={()=>{getYearsInService();getAgeValidation();errorHandler();}}>
</label>
Total Years in Service: 
<div class="flex flex-row items-center mb-2">
    <span class="font-mono text-4xl  mr-2 ">{totalsvc.year}</span> years
    <span class="font-mono text-4xl  mr-2 ml-2">{totalsvc.month}</span> months
    <span class="font-mono text-4xl  mr-2 ml-2">{totalsvc.day}</span> days
</div>
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
{#if validateDateofRetirement()}
    <label for="rank" class="flex mb-2">
        <input type="checkbox" class="toggle toggle-success mr-2" bind:checked={showIsNUP} onchange={()=>{toggleNUP();errorHandler();}}/>
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
        <span>{@html error}</span>
    </div>
{/if}