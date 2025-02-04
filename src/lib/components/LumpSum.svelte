<script lang="ts">
    import {YearsInSvc, HighestSalaryReceived} from './shared.svelte.js';
    interface TotalRating{
        year:number,
        month:number,
        day:number,
        total:number
    }

    let totalRate:TotalRating = {year:YearsInSvc.total.y*2.5,month:YearsInSvc.total.m/12*2.5,day:YearsInSvc.total.d/360*2.5,total:0};
    totalRate.total = totalRate.year + totalRate.month + totalRate.day;
    let computation ={pension:HighestSalaryReceived.hsr*totalRate.total/100,lumpsum:0};
    computation.lumpsum = parseFloat(computation.pension.toFixed(2)) * 36; 

    function moneyFormat(a:string):string{
		return a.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
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
        <span>{YearsInSvc.total.m} months x 2.5%</span>
    </div>
    <div class="p-1"> = </div>
    <div class="p-1 text-right">
        <span>{totalRate.month.toFixed(5)} %</span>
    </div>
    <div class="p-1">
        <span>{YearsInSvc.total.d} days x 2.5%</span>
    </div>
    <div class="p-1"> = </div>
    <div class="p-1 text-right">
        <span>{totalRate.day.toFixed(5)} %</span>
    </div>
    <div class="p-1">
        <span>{YearsInSvc.total.d} days x 2.5%</span>
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
        <span>LUMP SUM</span>
    </div>
    <div class="p-1 font-bold"> = </div>
    <div class="p-1 text-right font-bold">
        <span>₱ {moneyFormat(computation.lumpsum.toFixed(2))} </span>
    </div>
</div>

  
  