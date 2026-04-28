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

    function getYearsInService(){
        if(svcdate=="" || bdate=="")
            return

        des = new Date(svcdate);
        dor = new Date(retdate);
        dob = new Date(bdate);
        totalsvc.year = dor.getFullYear()-des.getFullYear();
        totalsvc.month = dor.getMonth()-des.getMonth();
        totalsvc.day = dor.getDate()-des.getDate();

        calibrateGetYearsInService();

        YearsInSvc.des = svcdate;
        YearsInSvc.dor = retdate;
        YearsInSvc.dob = bdate;
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
        if(retdate>age56Formated)
            return true;

        return false;
    }
    
    function errorHandler(){
        if(bdate=="")
            error = "Date of Birth must not be empty.";
        else if(svcdate=="")
            error = "Date Entered Service must not be empty.";
        else if(validAge.year<18 && validAge.year>0)
            error = "You are to young to enter the service. <br> Please change Date Entered Service.";
        else if(validAge.year>35)
            error = "You are to old to enter the service. <br> Please change DES or DOB";
        else if(validAge.year<=0)
            error = "Invalid Date. Please change Date of Birth.";
        else if(validateDateofRetirement())
            error = "Please change Date of Retirement. <br> It is above the mandatory age of 56.";
        else if((new Date(dor))< (new Date("1991-01-29")))
            error = "Retirement is beyond BFP's established date. <br> Please change Date of Retirement.";
        else
            error = "";

        YearsInSvc.error.text = error;
        YearsInSvc.error.state = (error.length>0)? true:false;
    }

    function addOtherSvc(){
        if(svcdate=="" || bdate=="")
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
            return

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
                        intro: 'Please Enter your Date of Birth'
                    },
                    {
                        element: 'label[for="des"]',
                        intro: 'Please Enter your Date Entered Service'
                    },
                    {
                        element: 'label[for="dor"]',
                        intro: 'Please Enter your effective Date of Retirement/Separation'
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
                dontShowAgainCookie:'introYrsOpt',
                dontShowAgainCookieDays:7
            }).start();
        }, 1000);
    });
</script>

<div class="flex items-center justify-between mb-6 pb-2 border-b border-base-200">
    <div>
        <h2 class="text-3xl font-extrabold text-primary flex items-center gap-3 drop-shadow-sm uppercase tracking-wider mt-2">
            Years in Service
        </h2>
        <p class="text-base-content/60 text-sm mt-1">Calculate your total active service timeline.</p>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <div class="flex flex-col gap-4">
        <label for="dob" class="form-control w-full">
            <div class="label pb-1">
                <span class="label-text font-bold">Date of Birth <span class="text-error">*</span></span>
            </div>
            <input id="dob" type="date" class="input input-bordered w-full bg-base-100 shadow-sm focus:input-primary transition-colors text-lg font-mono font-bold" bind:value={bdate} onchange={()=>{getYearsInService();getAgeValidation();counterGovService();addOtherSvc();errorHandler();}}>
        </label>
        
        <label for="des" class="form-control w-full">
            <div class="label pb-1">
                <span class="label-text font-bold">Date Entered Service <span class="text-error">*</span></span>
            </div>
            <input id="des" type="date" class="input input-bordered w-full bg-base-100 shadow-sm focus:input-primary transition-colors text-lg font-mono font-bold" bind:value={svcdate} onchange={()=>{getYearsInService();getAgeValidation();counterGovService();addOtherSvc();errorHandler();}}>
        </label>
        
        <label for="dor" class="form-control w-full">
            <div class="label pb-1">
                <span class="label-text font-bold">Date of Retirement/Sep <span class="text-error">*</span></span>
            </div>
            <input id="dor" type="date" class="input input-bordered w-full bg-base-100 shadow-sm focus:input-primary transition-colors text-lg font-mono font-bold" bind:value={retdate} onchange={()=>{getYearsInService();getAgeValidation();counterGovService();addOtherSvc();errorHandler();}}>
        </label>

        <div class="divider my-0"></div>

        <div class="form-control w-full border border-base-300 rounded-xl p-4 bg-base-200/50 shadow-inner">
            <label for="otherGovSvc" class="label cursor-pointer p-0 mb-3 hover:opacity-80 transition-opacity">
                <span class="label-text font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-indigo-500"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" /></svg>
                    Other Government Service
                </span> 
                <input id="otherGovSvc" type="checkbox" class="toggle toggle-success toggle-md" bind:checked={showOtherGovSvc} onchange={()=>{getYearsInService();addOtherSvc();errorHandler();}} />
            </label>
            
            {#if showOtherGovSvc}
                <div class="grid grid-cols-3 gap-3 origin-top my-1">
                    <div class="join w-full shadow-sm">
                        <input type="number" min="0" max="20" class="input input-primary input-bordered join-item w-full px-2 text-center focus:outline-offset-0 font-mono font-bold" bind:value={otherGovSvc.year} onchange={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}} onkeyup={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}}>
                        <div class="btn btn-primary join-item no-animation pointer-events-none px-2 uppercase text-[10px]">Yrs</div>
                    </div>
                    <div class="join w-full shadow-sm">
                        <input type="number" min="0" max="12" class="input input-primary input-bordered join-item w-full px-2 text-center focus:outline-offset-0 font-mono font-bold" bind:value={otherGovSvc.month} onchange={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}} onkeyup={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}}>
                        <div class="btn btn-primary join-item no-animation pointer-events-none px-2 uppercase text-[10px]">Mos</div>
                    </div>
                    <div class="join w-full shadow-sm">
                        <input type="number" min="0" max="30" class="input input-primary input-bordered join-item w-full px-2 text-center focus:outline-offset-0 font-mono font-bold" bind:value={otherGovSvc.day} onchange={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}} onkeyup={()=>{counterGovService();getYearsInService();addOtherSvc();errorHandler();}}>
                        <div class="btn btn-primary join-item no-animation pointer-events-none px-2 uppercase text-[10px]">Day</div>
                    </div>
                </div>
            {/if}
        </div>

        <div class="form-control w-full border border-base-300 rounded-xl p-4 bg-base-200/50 shadow-inner">
            <label for="suspendedSvc" class="label cursor-pointer p-0 mb-3 hover:opacity-80 transition-opacity">
                <span class="label-text font-bold flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-error"><path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" /></svg>
                    Gap(s) in Service
                </span> 
                <input id="suspendedSvc" type="checkbox" class="toggle toggle-error toggle-md" bind:checked={showSuspendedSvc} onchange={()=>{getYearsInService();addOtherSvc();errorHandler();}} />
            </label>
            
            {#if showSuspendedSvc}
                <div class="grid grid-cols-3 gap-3 origin-top my-1">
                    <div class="join w-full shadow-sm">
                        <input type="number" min="0" max="20" class="input input-error input-bordered join-item w-full px-2 text-center focus:outline-offset-0 font-mono font-bold" bind:value={suspendedSvc.year} onkeyup={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}} onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}>
                        <div class="btn btn-error join-item no-animation pointer-events-none px-2 uppercase text-[10px]">Yrs</div>
                    </div>
                    <div class="join w-full shadow-sm">
                        <input type="number" min="0" max="12" class="input input-error input-bordered join-item w-full px-2 text-center focus:outline-offset-0 font-mono font-bold" bind:value={suspendedSvc.month} onkeyup={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}} onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}>
                        <div class="btn btn-error join-item no-animation pointer-events-none px-2 uppercase text-[10px]">Mos</div>
                    </div>
                    <div class="join w-full shadow-sm">
                        <input type="number" min="0" max="30" class="input input-error input-bordered join-item w-full px-2 text-center focus:outline-offset-0 font-mono font-bold" bind:value={suspendedSvc.day} onkeyup={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}} onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}>
                        <div class="btn btn-error join-item no-animation pointer-events-none px-2 uppercase text-[10px]">Day</div>
                    </div>
                </div>
            {/if}
        </div>
    </div>

    <div class="flex flex-col gap-6">
        <div class="h-full bg-accent/10 border-2 border-accent/20 rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center text-center shadow-lg relative overflow-hidden">
            <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/20 to-transparent pointer-events-none"></div>
            
            <div class="mb-2 text-sm font-bold uppercase tracking-widest text-accent-content/70">Total Years in Service</div>
            <div class="flex items-end justify-center gap-1 sm:gap-2 mb-6 w-full mt-2 drop-shadow-md">
                <div class="flex flex-col items-center">
                    <span class="font-mono text-5xl sm:text-6xl lg:text-7xl font-extrabold text-accent-content leading-none">{totalsvc.year}</span>
                    <span class="text-xs uppercase font-bold mt-1 opacity-75">Years</span>
                </div>
                <span class="text-3xl font-light opacity-50 mb-4 px-1">:</span>
                <div class="flex flex-col items-center">
                    <span class="font-mono text-5xl sm:text-6xl lg:text-7xl font-extrabold text-accent-content leading-none">{String(totalsvc.month).padStart(2, '0')}</span>
                    <span class="text-xs uppercase font-bold mt-1 opacity-75">Months</span>
                </div>
                <span class="text-3xl font-light opacity-50 mb-4 px-1">:</span>
                <div class="flex flex-col items-center">
                    <span class="font-mono text-5xl sm:text-6xl lg:text-7xl font-extrabold text-accent-content leading-none">{String(totalsvc.day).padStart(2, '0')}</span>
                    <span class="text-xs uppercase font-bold mt-1 opacity-75">Days</span>
                </div>
            </div>

            {#if showOtherGovSvc}
                <div class="w-full bg-base-100 rounded-xl p-4 shadow-sm border border-base-200 mt-4 relative z-10 transition-all duration-300">
                    <div class="text-[10px] font-bold uppercase tracking-widest text-base-content/50 mb-1">BFP Service Only</div>
                    <div class="flex justify-center items-center gap-2 font-mono text-xl font-bold">
                        <span>{YearsInSvc.allService.bfp.years}<span class="text-xs font-sans font-normal opacity-50 ml-0.5">y</span></span>
                        <span class="opacity-30">•</span>
                        <span>{YearsInSvc.allService.bfp.months}<span class="text-xs font-sans font-normal opacity-50 ml-0.5">m</span></span>
                        <span class="opacity-30">•</span>
                        <span>{YearsInSvc.allService.bfp.days}<span class="text-xs font-sans font-normal opacity-50 ml-0.5">d</span></span>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

{#if error && error.length>0}
    <div role="alert" class="alert alert-error shadow-md mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span class="font-medium">{@html error}</span>
    </div>
{/if}