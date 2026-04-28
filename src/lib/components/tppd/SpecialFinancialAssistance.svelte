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
        allowance.bonus = (HighestSalaryReceived.bp+5000)/12;
        allowance.subsistence = 4500;
    }
    let total:number = allowance.pera + allowance.hazard + allowance.quarter + allowance.clothing + allowance.laundry + HighestSalaryReceived.hsr;

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
<div class="flex items-center justify-between mb-8 pb-4 border-b border-base-200">
    <div>
        <h2 class="text-2xl font-extrabold text-primary flex items-center gap-3 drop-shadow-sm uppercase tracking-wider">
            Special Financial Assistance
        </h2>
        <p class="text-base-content/60 text-sm mt-1">Calculate the special financial assistance applicable for firefighting operations.</p>
    </div>
</div>

<div class="alert bg-base-100 shadow-sm border border-info/20 rounded-xl mb-6 flex items-start p-5">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <div class="flex-1 ml-3">
        <h3 class="font-bold text-base-content m-0 text-sm">Note</h3>
        <p class="text-xs text-base-content/80 mt-1">This Special Benefit is only applicable for firefighting operations.</p>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-6">
    <div class="flex flex-col gap-6">
        <div class="bg-base-200 p-6 rounded-2xl shadow-inner border border-base-300 flex flex-col gap-4">
            <div class="flex justify-between items-center py-2 border-b border-base-300/50">
                <span class="text-sm font-bold uppercase text-base-content/70">Basepay - {HighestSalaryReceived.rank}</span>
                <span class="font-mono text-lg font-bold">₱ {moneyFormat(HighestSalaryReceived.bp.toFixed(2))}</span>
            </div>
            
            <div class="flex justify-between items-center py-2 border-b border-base-300/50">
                <span class="text-sm font-bold uppercase text-base-content/70">Longevity Pay [{HighestSalaryReceived.pagi}]</span>
                <span class="font-mono text-lg font-bold">₱ {moneyFormat(HighestSalaryReceived.lp.toFixed(2))}</span>
            </div>

            <div class="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm rounded-xl mt-2 allowances">
                <input type="checkbox" /> 
                <div class="collapse-title text-sm font-bold uppercase tracking-wider text-base-content/80 py-3">
                    See Allowances Breakdown
                </div>
                <div class="collapse-content pt-0 border-t border-base-200">
                    <div class="flex flex-col gap-2 mt-4 text-sm">
                        <div class="flex justify-between items-center"><span class="text-base-content/70">PERA</span><span class="font-mono font-medium">₱ {moneyFormat(allowance.pera.toFixed(2))}</span></div>
                        <div class="flex justify-between items-center"><span class="text-base-content/70">Hazard Pay</span><span class="font-mono font-medium">₱ {moneyFormat(allowance.hazard.toFixed(2))}</span></div>
                        <div class="flex justify-between items-center"><span class="text-base-content/70">Quarter Allowance</span><span class="font-mono font-medium">₱ {moneyFormat(allowance.quarter.toFixed(2))}</span></div>
                        <div class="flex justify-between items-center"><span class="text-base-content/70">Clothing Allowance</span><span class="font-mono font-medium">₱ {moneyFormat(allowance.clothing.toFixed(2))}</span></div>
                        <div class="flex justify-between items-center"><span class="text-base-content/70">Laundry Allowance</span><span class="font-mono font-medium">₱ {moneyFormat(allowance.laundry.toFixed(2))}</span></div>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center mt-2 pt-3 border-t-2 border-base-300/80">
                <span class="text-sm font-black uppercase text-base-content/80">Sub-Total</span>
                <span class="font-mono text-xl font-bold text-base-content">₱ {moneyFormat(total.toFixed(2))}</span>
            </div>
        </div>

        <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-200 mt-2 rounded-2xl shadow-sm">
            <div class="collapse-title text-sm font-bold uppercase py-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 shrink-0 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                RESO # 2001-01 Section 17.1
            </div>
            <div class="collapse-content text-justify text-sm">
                <div class="bg-base-100 p-4 rounded-xl border-l-4 border-primary italic text-base-content/80 leading-relaxed shadow-inner">
                    The average of six (6) months of base and longevity pay including 
                    all allowances and bonuses during the last twelve (12) months 
                    immediately preceding the death or permanent incapacity of 
                    uniformed personnel. The same benefits shall be computed for those 
                    who have served less than twelve (12) months and the payment 
                    shall come from the expected salary, allowances and bonuses of the 
                    deceased or incapacitated personnel for the next six (6) months after 
                    his death or permanent incapacity.
                </div>
            </div>
        </div>
    </div>

    <div class="relative bg-primary/5 p-6 sm:p-8 rounded-2xl border border-primary/20 shadow-lg flex flex-col gap-6 overflow-hidden max-w-xl self-start sticky top-6">
        <div class="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-64 h-64"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>

        <div class="bg-base-100 p-5 rounded-xl shadow-sm border border-base-200">
            <span class="text-xs font-bold uppercase text-base-content/60 tracking-wider mb-2 block">Monthly Additional</span>
            <div class="flex flex-col gap-3">
                <div class="flex justify-between items-center group">
                    <span class="text-sm font-medium text-base-content/80 group-hover:text-primary transition-colors">Bonus ÷ 12 months</span>
                    <span class="font-mono font-bold group-hover:text-primary transition-colors">₱ {moneyFormat(allowance.bonus.toFixed(2))}</span>
                </div>
                <div class="flex justify-between items-center group">
                    <span class="text-sm font-medium text-base-content/80 group-hover:text-primary transition-colors">Subsistence (₱150 × 30 days)</span>
                    <span class="font-mono font-bold group-hover:text-primary transition-colors">₱ {moneyFormat(allowance.subsistence.toFixed(2))}</span>
                </div>
            </div>
        </div>

        <div class="bg-base-100 p-5 rounded-xl shadow-sm border border-base-200">
            <span class="text-xs font-bold uppercase text-base-content/60 tracking-wider mb-1 block">Expected Monthly Calculation</span>
            <div class="flex justify-between items-end mt-2">
                <span class="text-xs text-base-content/50 max-w-[50%]">Total + Bonus + Subsistence</span>
                <span class="font-mono text-xl font-bold">₱ {moneyFormat(specialFinancialAssistanceClaim.toFixed(2))}</span>
            </div>
        </div>

        <div class="mt-4 pt-4 border-t-2 border-primary/20 flex flex-col items-end relative z-10">
            <span class="text-xs font-bold uppercase tracking-widest text-primary/70 mb-1">Total SFA Claim (Monthly × 6 months)</span>
            <div class="text-3xl sm:text-4xl lg:text-5xl font-mono font-black text-primary drop-shadow-sm whitespace-nowrap break-all">
                ₱ {moneyFormat((specialFinancialAssistanceClaim*6).toFixed(2))}
            </div>
        </div>
    </div>
</div>