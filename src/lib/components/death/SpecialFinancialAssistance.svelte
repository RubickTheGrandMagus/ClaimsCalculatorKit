<script lang="ts">
    import {HighestSalaryReceived, moneyFormat} from './shared.svelte.js';
    interface OverAllAllowances{
        pera:number,                
        hazard:number,
        quarter:number,
        clothing:number,
        laundry:number,
        bonus:number,
        subsistence:number
    }
    interface AllowanceMatrix{
        rank:string,
        quarter:number,
        laundry:number
    }

    let allowance:OverAllAllowances = {pera:0,hazard:0,quarter:0,clothing:0,laundry:0,bonus:0,subsistence:0};
    const otherAllowance:AllowanceMatrix[] = [
        {rank:"FO1 (SG 10)",quarter:400,laundry:30},
        {rank:"FO2 (SG 12)",quarter:400,laundry:30},
        {rank:"FO3 (SG 14)",quarter:400,laundry:30},
        {rank:"SFO1 (SG 16)",quarter:400,laundry:30},
        {rank:"SFO2 (SG 17)",quarter:450,laundry:30},
        {rank:"SFO3 (SG 18)",quarter:450,laundry:30},
        {rank:"SFO4 (SG 19)",quarter:500,laundry:30},
        {rank:"FINSP (SG 22)",quarter:600,laundry:60},
        {rank:"FSINSP (SG 23)",quarter:650,laundry:60},
        {rank:"FCINSP (SG 24)",quarter:700,laundry:60},
        {rank:"FSUPT (SG 25)",quarter:800,laundry:60},
        {rank:"FSSUPT (SG 26)",quarter:900,laundry:60},
        {rank:"FCSUPT (SG 27)",quarter:1050,laundry:60},
        {rank:"FDIR (SG 28)",quarter:1200,laundry:60},
    ];

    if(HighestSalaryReceived.rank != ""){
        let index:number = otherAllowance.findIndex(t=>t.rank == HighestSalaryReceived.rank);
        allowance.pera = 2000;
        allowance.hazard = 540;
        allowance.quarter = otherAllowance[index].quarter;
        allowance.clothing = 200;
        allowance.laundry = otherAllowance[index].laundry;
        allowance.bonus = (HighestSalaryReceived.retbp+5000)/12;
        allowance.subsistence = 4500;
    }
    let total:number = allowance.pera + allowance.hazard + allowance.quarter + allowance.clothing + allowance.laundry + HighestSalaryReceived.retbp + HighestSalaryReceived.retlp;

    let specialFinancialAssistanceClaim:number = total + allowance.bonus + allowance.subsistence; //Only 6 months for Special Financial Assistance

    //intro guide for ease of use
    import { onMount } from "svelte";
    import introJs from "intro.js";
    import 'intro.js/introjs.css';

    onMount(() => {
        setTimeout(() => {
            introJs().setOptions({
                steps: [
                    {
                        element: ".allowances",
                        intro: 'Please click See Allowances',
                    }
                ],
                dontShowAgain: true,
                showBullets:false,
                showButtons:false,
                dontShowAgainCookie:'introSFADea',
                dontShowAgainCookieDays:7
            }).start();
        },1000);
    });
</script>
<div class="flex items-center justify-between mb-6 pb-2 border-b border-base-200">
    <div>
        <h2 class="text-3xl font-extrabold text-primary flex items-center gap-3 drop-shadow-sm uppercase tracking-wider mt-2">
            Special Financial Assistance
        </h2>
        <p class="text-base-content/60 text-sm mt-1 italic">Note: This Special Benefit is only applicable to Uniformed Personnel who died in firefighting.</p>
    </div>
</div>

<div class="flex flex-col xl:flex-row gap-6 mb-8">
    <div class="xl:w-2/3 bg-base-200 rounded-2xl p-6 shadow-inner border border-base-300">
        <h3 class="text-sm font-bold uppercase text-base-content/60 mb-4 tracking-wider border-b border-base-300 pb-2">Compensation Matrix</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 font-mono text-sm sm:text-base">
            <div class="col-span-1 md:col-span-2 flex justify-between items-center bg-base-100 p-3 rounded-lg border border-base-200 shadow-sm mb-2">
                <span class="text-base-content/80 font-sans text-xs sm:text-sm">Basepay (<span class="font-bold opacity-80">{HighestSalaryReceived.rank}</span>)</span>
                <span class="font-bold text-primary">₱ {moneyFormat(HighestSalaryReceived.retbp.toFixed(2))}</span>
            </div>
            
            <div class="col-span-1 md:col-span-2 flex justify-between items-center bg-base-100 p-3 rounded-lg border border-base-200 shadow-sm mb-4">
                <span class="text-base-content/80 font-sans text-xs sm:text-sm flex items-center gap-2">Longevity Pay <span class="badge badge-sm badge-outline">{HighestSalaryReceived.pagi}</span></span>
                <span class="font-bold text-primary">₱ {moneyFormat(HighestSalaryReceived.retlp.toFixed(2))}</span>
            </div>

            <div class="col-span-1 md:col-span-2 form-control w-full mt-2">
                <div tabindex="0" class="allowances collapse collapse-arrow bg-base-100 border border-base-200 shadow-sm group">
                    <div class="collapse-title font-bold min-h-0 p-3 flex justify-between items-center group-hover:bg-base-200/50 transition-colors">
                        <span class="text-sm">View Itemized Allowances</span>
                    </div>
                    <div class="collapse-content text-sm space-y-2 pt-2 border-t border-base-200 bg-base-50">
                        <div class="flex justify-between items-center pt-2"><span class="opacity-80">PERA</span><span class="font-bold">₱ {moneyFormat(allowance.pera.toFixed(2))}</span></div>
                        <div class="flex justify-between items-center"><span class="opacity-80">Hazard Pay</span><span class="font-bold">₱ {moneyFormat(allowance.hazard.toFixed(2))}</span></div>
                        <div class="flex justify-between items-center"><span class="opacity-80">Quarter Allowance</span><span class="font-bold">₱ {moneyFormat(allowance.quarter.toFixed(2))}</span></div>
                        <div class="flex justify-between items-center"><span class="opacity-80">Clothing Allowance</span><span class="font-bold">₱ {moneyFormat(allowance.clothing.toFixed(2))}</span></div>
                        <div class="flex justify-between items-center"><span class="opacity-80">Laundry Allowance</span><span class="font-bold">₱ {moneyFormat(allowance.laundry.toFixed(2))}</span></div>
                    </div>
                </div>
            </div>

            <div class="col-span-1 md:col-span-2 divider m-0 border-base-300"></div>

            <div class="col-span-1 md:col-span-2 flex justify-between items-center p-2 mb-2">
                <span class="font-sans font-bold text-sm sm:text-base text-base-content/90">Total Allowances + BP + LP</span>
                <span class="font-bold text-lg">₱ {moneyFormat(total.toFixed(2))}</span>
            </div>

            <div class="flex justify-between items-center mt-2 border-b border-base-300/50 pb-2">
                <span class="font-sans text-xs sm:text-sm text-base-content/70">Bonus ÷ 12 months</span>
                <span class="font-bold">₱ {moneyFormat(allowance.bonus.toFixed(2))}</span>
            </div>
            
            <div class="flex justify-between items-center mt-2 border-b border-base-300/50 pb-2">
                <span class="font-sans text-xs sm:text-sm text-base-content/70">Subsistence (₱ 150 × 30d)</span>
                <span class="font-bold">₱ {moneyFormat(allowance.subsistence.toFixed(2))}</span>
            </div>
        </div>
    </div>

    <div class="xl:w-1/3 flex flex-col gap-6 h-fit">
        <div class="card bg-accent text-accent-content shadow-lg shadow-accent/30 relative overflow-hidden">
            <div class="absolute -right-4 -top-4 opacity-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-32 h-32"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div class="card-body p-6 sm:p-8 z-10 flex flex-col items-start gap-4">
                <div class="w-full">
                    <h3 class="text-sm font-bold uppercase tracking-wider opacity-90 mb-1 border-b border-accent-content/20 pb-2">Target Monthly SFA</h3>
                    <div class="mt-4 text-3xl font-mono font-bold drop-shadow-sm break-all">
                        ₱ {moneyFormat(specialFinancialAssistanceClaim.toFixed(2))}
                    </div>
                </div>
            </div>
        </div>

        <div class="card bg-primary text-primary-content shadow-lg shadow-primary/30 relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <div class="card-body p-6 sm:p-8 justify-center z-10">
                <h3 class="text-sm font-bold uppercase tracking-wider opacity-90 mb-1">Total SFA Claim</h3>
                <div class="text-xs font-mono opacity-80 mb-2 border-b border-primary-content/20 pb-2">Target Value × 6 months</div>
                <div class="text-4xl lg:text-5xl font-mono font-extrabold drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)] mt-2 break-all">
                    ₱ {moneyFormat((specialFinancialAssistanceClaim*6).toFixed(2))}
                </div>
            </div>
        </div>
    </div>
</div>

<div tabindex="0" class="collapse collapse-arrow border border-info/30 bg-info/5 text-base-content rounded-xl shadow-sm mb-8">
    <input type="checkbox" /> 
    <div class="collapse-title text-sm sm:text-base font-semibold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-info mr-3"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        RESO # 2001-01 Section 17.1
    </div>
    <div class="collapse-content">
        <blockquote class="italic text-justify font-medium text-sm text-base-content/80 pt-3 border-t border-info/20 leading-relaxed">
            The average of six (6) months of base and longevity pay including 
            all allowances and bonuses during the last twelve (12) months 
            immediately preceding the death or permanent incapacity of 
            uniformed personnel. The same benefits shall be computed for those 
            who have served less than twelve (12) months and the payment 
            shall come from the expected salary, allowances and bonuses of the 
            deceased or incapacitated personnel for the next six (6) months after 
            his death or permanent incapacity.
        </blockquote>
    </div>
</div>