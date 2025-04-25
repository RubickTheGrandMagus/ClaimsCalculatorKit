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
<h2 class="card-title">Calculate Special Financial Assistance</h2>
<p class="italic text-xs text-justify text-gray-400">Note: This Special Benefit is only applicable to Uniformed Personnel who died in firefighting.</p>
    <div class="grid grid-cols-[auto,auto,2fr]">
        <div class="p-1 ">
            <span>Basepay - {HighestSalaryReceived.rank}</span>
        </div>
        <div class="p-1 "> = </div>
        <div class="p-1 text-right ">
            <span>₱ {moneyFormat(HighestSalaryReceived.bp.toFixed(2))}</span>
        </div>
        <div class="p-1 ">
            <span>Longevity Pay [{HighestSalaryReceived.pagi}]</span>
        </div>
        <div class="p-1 "> = </div>
        <div class="p-1 text-right ">
            <span>₱ {moneyFormat(HighestSalaryReceived.lp.toFixed(2))}</span>
        </div>
        <div class="p-1 col-span-3">
            <div tabindex="0" class="allowances collapse collapse-arrow bg-base-100 border border-base-300 w-80 p-1">
                <div class="collapse-title font-bold min-h-0 p-3">See Allowances</div>
                <div class="collapse-content text-sm grid grid-cols-[auto,auto,2fr]">
                    <div class="p-1 ">
                        <span>PERA</span>
                    </div>
                    <div class="p-1 "> = </div>
                    <div class="p-1 text-right ">
                        <span>₱ {moneyFormat(allowance.pera.toFixed(2))}</span>
                    </div>
                    <div class="p-1 ">
                        <span>Hazard Pay</span>
                    </div>
                    <div class="p-1 "> = </div>
                    <div class="p-1 text-right ">
                        <span>₱ {moneyFormat(allowance.hazard.toFixed(2))}</span>
                    </div>
                    <div class="p-1 ">
                        <span>Quarter Allowance</span>
                    </div>
                    <div class="p-1 "> = </div>
                    <div class="p-1 text-right ">
                        <span>₱ {moneyFormat(allowance.quarter.toFixed(2))}</span>
                    </div>
                    <div class="p-1 ">
                        <span>Clothing Allowance</span>
                    </div>
                    <div class="p-1 "> = </div>
                    <div class="p-1 text-right ">
                        <span>₱ {moneyFormat(allowance.clothing.toFixed(2))}</span>
                    </div>
                    <div class="p-1 ">
                        <span>Laundry Allowance</span>
                    </div>
                    <div class="p-1 "> = </div>
                    <div class="p-1 text-right ">
                        <span>₱ {moneyFormat(allowance.laundry.toFixed(2))}</span>
                    </div>
                </div>
              </div>
        </div>
        <div class="p-1 font-bold">
            <span>Total</span>
        </div>
        <div class="p-1 font-bold"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat(total.toFixed(2))}</span>
        </div>
        <div class="p-1">
            <span>Bonus / 12 months</span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right">
            <span>₱ {moneyFormat(allowance.bonus.toFixed(2))}</span>
        </div>
        <div class="p-1">
            <span>Subsistence Allowance <br> (₱ 150 * 30 days)</span>
        </div>
        <div class="p-1"> = </div>
        <div class="p-1 text-right">
            <span>₱ {moneyFormat(allowance.subsistence.toFixed(2))}</span>
        </div>
        <div class="p-1 font-bold">
            <span>Total SFA Claim <br> (₱ {moneyFormat(specialFinancialAssistanceClaim.toFixed(2))} * 6 months)</span>
        </div>
        <div class="p-1 font-bold"> = </div>
        <div class="p-1 text-right font-bold">
            <span>₱ {moneyFormat((specialFinancialAssistanceClaim*6).toFixed(2))}</span>
        </div>
    </div>
    <div tabindex="0" class="collapse collapse-plus border-base-300 bg-base-200 border w-80">
        <div class="collapse-title text-xl font-medium flex items-center">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="h-6 w-6 shrink-0 stroke-current mr-2">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
                RESO # 2001-01 Section 17.1
        </div>
        <div class="collapse-content text-justify">
            <blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-700">
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
  
  <style>
    .collapse-title::after {
        top:1.5rem;
    }
  </style>