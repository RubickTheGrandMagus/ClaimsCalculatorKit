<script lang="ts">
    import {YearsInSvc} from './shared.svelte.js';

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
    let showSuspendedSvc:boolean = $state(YearsInSvc.allService.suspension.state);
    let showIsNUP:boolean = $state(YearsInSvc.isNUP);

    function getYearsInService(){
        // if(bdate=="" || svcdate=="" || sepdate==""){
        //     return;
        // }
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
        if(bdate=="")
            error = "Date of Birth must not be empty.";
        else if(svcdate=="")
            error = "Date Entered Service must not be empty.";
        else if(sepdate=="")
            error = "Date Separated must not be empty.";
        else if(validAge.year<18 && validAge.year>0)
            error = "You are to young to enter the service. <br> Please change Date Entered Service.";
        else if(validAge.year>35)
            error = "You are to old to enter the service.<br> Please change DES or DOB";
        else if(validAge.year<=0)
            error = "Invalid Date. Please change Date of Birth.";
        else if(validateDateofRetirement() && !showIsNUP)
            error = "Please change Date of Separation.<br> It is above the mandatory age of 56.";
        else if(validateDateofRetirementNUP() && showIsNUP)
            error = "Please change Date of Separation.<br> It is above the mandatory age of 65.";
        else if((new Date(dos))< (new Date("1991-01-29")))
            error = "Severance is beyond BFP's established date.<br> Please change Date of Separation.";
        else if(totalsvc.year<0)
            error = "Invalid Years in Service.<br> Please change added suspension";
        else
            error = "";

        YearsInSvc.error.text = error;
        YearsInSvc.error.state = (error.length>0)? true:false;
    }

    function toggleNUP(){
        YearsInSvc.isNUP = showIsNUP;
    }

    function addOtherSvc(){
        if(bdate=="" || svcdate=="" || sepdate==""){
            return;
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
                        element: 'label[for="dos"]',
                        intro: 'Please Enter your Date of Separation'
                    },
                    {
                        element: 'label[for="suspendedSvc"]',
                        intro: 'Toggle to add Gap(s) in Service'
                    }
                ],
                dontShowAgain: true,
                showBullets:false,
                dontShowAgainCookie:'introYrsEtc',
                dontShowAgainCookieDays:7
            }).start();
        }, 1000);
    });
</script>

<div class="flex items-center justify-between mb-8 pb-4 border-b border-base-200">
    <div>
        <h2 class="text-2xl font-extrabold text-primary flex items-center gap-3 drop-shadow-sm uppercase tracking-wider">
            Record of Service
        </h2>
        <p class="text-base-content/60 text-sm mt-1">Provide your entry and validity dates to assess terminal eligibility.</p>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-6">
    <div class="bg-base-200 p-6 sm:p-8 rounded-2xl shadow-inner border border-base-300 flex flex-col gap-6">
        <h3 class="text-sm font-bold uppercase tracking-wider text-base-content/70 border-b border-base-300 pb-2">Service Dates</h3>
        
        <div class="form-control w-full">
            <label for="dob" class="label pb-1">
                <span class="label-text font-bold text-sm">Date of Birth</span>
            </label>
            <input id="dob" type="date" class="input input-bordered w-full font-mono text-lg bg-base-100 transition-all focus:input-primary focus:shadow-md" bind:value={bdate} onchange={()=>{getYearsInService();getAgeValidation();addOtherSvc();errorHandler();}}>
        </div>

        <div class="form-control w-full">
            <label for="des" class="label pb-1">
                <span class="label-text font-bold text-sm">Date Entered Service</span>
            </label>
            <input id="des" type="date" class="input input-bordered w-full font-mono text-lg bg-base-100 transition-all focus:input-primary focus:shadow-md" bind:value={svcdate} onchange={()=>{getYearsInService();getAgeValidation();addOtherSvc();errorHandler();}}>
        </div>

        <div class="form-control w-full">
            <label for="dos" class="label pb-1">
                <span class="label-text font-bold text-sm text-primary">Date Separated</span>
            </label>
            <input id="dos" type="date" class="input input-bordered input-primary shadow-sm w-full font-mono text-lg bg-base-100 transition-all focus:shadow-md" bind:value={sepdate} onchange={()=>{getYearsInService();getAgeValidation();addOtherSvc();errorHandler();}}>
        </div>

        <div class="divider my-0"></div>

        <div class="form-control bg-base-100 p-4 rounded-xl border border-base-200 shadow-sm transition-all hover:shadow-md">
            <label class="label cursor-pointer justify-start gap-4">
                <input type="checkbox" id="suspendedSvc" class="toggle toggle-warning toggle-md shadow-inner" bind:checked={showSuspendedSvc} onchange={()=>{getYearsInService();addOtherSvc();errorHandler();}} />
                <div>
                    <span class="label-text font-bold block">Declare Gap(s) in Service</span>
                    <span class="text-xs text-base-content/60 w-full block mt-0.5">Subtract non-creditable periods from your total service</span>
                </div>
            </label>
        </div>

        {#if showSuspendedSvc}
            <div class="bg-warning/5 p-5 rounded-xl border border-warning/20 shadow-inner -mt-2 animate-in slide-in-from-top-2">
                <span class="text-xs font-bold uppercase text-warning/80 mb-3 block">Deductible Periods (Gaps)</span>
                <div class="grid grid-cols-3 gap-3">
                    <div class="form-control">
                        <label class="label pt-0 pb-1"><span class="label-text text-xs font-bold">Years</span></label>
                        <input type="number" min="0" max="20" class="input input-bordered input-warning input-sm w-full font-mono text-center"
                            bind:value={suspendedSvc.year} 
                            onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}
                            onkeyup={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}>
                    </div>
                    <div class="form-control">
                        <label class="label pt-0 pb-1"><span class="label-text text-xs font-bold">Months</span></label>
                        <input type="number" min="0" max="11" class="input input-bordered input-warning input-sm w-full font-mono text-center"
                            bind:value={suspendedSvc.month} 
                            onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}
                            onkeyup={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}>
                    </div>
                    <div class="form-control">
                        <label class="label pt-0 pb-1"><span class="label-text text-xs font-bold">Days</span></label>
                        <input type="number" min="0" max="29" class="input input-bordered input-warning input-sm w-full font-mono text-center"
                            bind:value={suspendedSvc.day} 
                            onchange={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}
                            onkeyup={()=>{counterSuspendedService();getYearsInService();addOtherSvc();errorHandler();}}>
                    </div>
                </div>
            </div>
        {/if}

        {#if validateDateofRetirement()}
            <div class="form-control bg-base-100 p-4 rounded-xl border border-base-200 shadow-sm transition-all hover:shadow-md -mt-2 animate-in fade-in">
                <label class="label cursor-pointer justify-start gap-4" for="rank">
                    <input type="checkbox" id="rank" class="toggle toggle-success toggle-md shadow-inner" bind:checked={showIsNUP} onchange={()=>{toggleNUP();errorHandler();}} />
                    <div>
                        <span class="label-text font-bold block {showIsNUP ? 'text-success' : ''}">Personnel is NUP</span>
                        <span class="text-xs text-base-content/60 w-full block mt-0.5">Toggle if the claiming personnel is a Non-Uniformed Personnel</span>
                    </div>
                </label>
            </div>
        {/if}
    </div>

    <div class="flex flex-col gap-6 lg:sticky lg:top-8">
        <div class="relative bg-primary p-6 sm:p-8 rounded-3xl text-primary-content shadow-xl overflow-hidden min-h-[300px] flex flex-col items-center justify-center text-center">
            <div class="absolute -right-16 -top-16 opacity-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-64 h-64"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            
            <h3 class="text-sm font-bold uppercase tracking-widest opacity-80 mb-6 drop-shadow-sm relative z-10 w-full">Total Years in Service</h3>
            
            <div class="flex flex-row items-center justify-center gap-4 sm:gap-8 relative z-10 flex-wrap w-full">
                <div class="flex flex-col items-center group">
                    <div class="bg-base-100/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 min-w-[80px] sm:min-w-[100px] border border-base-100/20 shadow-inner group-hover:bg-base-100/20 transition-all">
                        <span class="font-mono text-4xl sm:text-6xl font-black drop-shadow-md">{totalsvc.year}</span>
                    </div>
                    <span class="text-xs sm:text-sm uppercase font-bold tracking-widest mt-3 opacity-90 group-hover:opacity-100 transition-opacity">Years</span>
                </div>
                <div class="flex flex-col items-center group">
                    <div class="bg-base-100/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 min-w-[80px] sm:min-w-[100px] border border-base-100/20 shadow-inner group-hover:bg-base-100/20 transition-all">
                        <span class="font-mono text-4xl sm:text-6xl font-black drop-shadow-md">{totalsvc.month}</span>
                    </div>
                    <span class="text-xs sm:text-sm uppercase font-bold tracking-widest mt-3 opacity-90 group-hover:opacity-100 transition-opacity">Months</span>
                </div>
                <div class="flex flex-col items-center group">
                    <div class="bg-base-100/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 min-w-[80px] sm:min-w-[100px] border border-base-100/20 shadow-inner group-hover:bg-base-100/20 transition-all">
                        <span class="font-mono text-4xl sm:text-6xl font-black drop-shadow-md">{totalsvc.day}</span>
                    </div>
                    <span class="text-xs sm:text-sm uppercase font-bold tracking-widest mt-3 opacity-90 group-hover:opacity-100 transition-opacity">Days</span>
                </div>
            </div>
            
            {#if totalsvc.year >= 0}
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-success/0 via-success to-success/0"></div>
            {/if}
        </div>

        {#if error.length>0}
            <div role="alert" class="alert alert-error shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span class="font-medium">{@html error}</span>
            </div>
        {/if}
    </div>
</div>