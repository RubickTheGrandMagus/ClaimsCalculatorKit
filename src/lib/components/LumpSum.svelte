<script lang="ts">
    import {YearsInSvc, HighestSalaryReceived, moneyFormat} from './shared.svelte.js';
    interface TotalRating{
        year:number,
        month:number,
        day:number,
        total:number
    }

    let totalRate:TotalRating = {year:YearsInSvc.total.y*2.5,month:YearsInSvc.total.m/12*2.5,day:YearsInSvc.total.d/360*2.5,total:0};
    totalRate.total = totalRate.year + totalRate.month + totalRate.day;
    totalRate.total = (totalRate.total>90)? 90:totalRate.total;
    let computation ={pension:HighestSalaryReceived.hsr*totalRate.total/100,lumpsum:0};
    computation.lumpsum = parseFloat(computation.pension.toFixed(2)) * 36; 
</script>
<h2 class="card-title">Calculate 3 year Lump Sum</h2>
<div class="grid grid-cols-[2fr,auto,1fr]">
    <div class="p-1">
        <span>{YearsInSvc.total.y} years x 2.5%</span>
    </div>
    <div class="p-1"> = </div>
    <div class="p-1 text-right">
        <span>{totalRate.year.toFixed(5)} %</span>
    </div>
    <div class="p-1">
        <span>{YearsInSvc.total.m} months /12 x 2.5%</span>
    </div>
    <div class="p-1"> = </div>
    <div class="p-1 text-right">
        <span>{totalRate.month.toFixed(5)} %</span>
    </div>
    <div class="p-1">
        <span>{YearsInSvc.total.d} days /360 x 2.5%</span>
    </div>
    <div class="p-1"> = </div>
    <div class="p-1 text-right">
        <span>{totalRate.day.toFixed(5)} %</span>
    </div>
    <div class="p-1 font-bold">
        <span>TOTAL RATE</span>
    </div>
    <div class="p-1 font-bold"> = </div>
    <div class="p-1 text-right font-bold">
        <span>{totalRate.total.toFixed(5)} %</span>
    </div>
    <div class="p-1">
        <span>₱ {moneyFormat(HighestSalaryReceived.hsr.toFixed(2))} x {totalRate.total.toFixed(5)}</span>
    </div>
    <div class="p-1"> = </div>
    <div class="p-1 text-right">
        <span>₱ {moneyFormat(computation.pension.toFixed(2))} </span>
    </div>
    <div class="p-1 font-bold">
        <span>MONTHLY PENSION</span>
    </div>
    <div class="p-1 font-bold"> = </div>
    <div class="p-1 text-right font-bold">
        <span>₱ {moneyFormat(computation.pension.toFixed(2))} </span>
    </div>
    <div class="p-1 font-bold">
        <span>36 MONTHS LUMP SUM</span>
    </div>
    <div class="p-1 font-bold"> = </div>
    <div class="p-1 text-right font-bold">
        <span>₱ {moneyFormat(computation.lumpsum.toFixed(2))} </span>
    </div>
</div>

<div tabindex="0" class="collapse collapse-plus border-base-300 bg-base-200 border">
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
        DILG ACT of 1990 Section 75
    </div>
    <div class="collapse-content text-justify">
        <blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-700">
        Monthly retirement pay shall be fifty percent (50%) of the base pay and longevity pay of the retired grade in case of twenty (20) years of active service, increasing by two and one-half percent (2.5%) for every year of active service rendered beyond twenty (20) years to a maximum of ninety percent (90%) for thirty-six (36) years of active service and over.
        </blockquote>
    </div>
  </div>
  
  