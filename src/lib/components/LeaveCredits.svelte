<script lang="ts">
	import { compileModule } from 'svelte/compiler';
    import { YearsInSvc, HighestSalaryReceived, moneyFormat} from './shared.svelte.js';

    interface LeaveCredits{
        year:number,
        month:number,
        day:number,
        slvl:number,
        tlc:number,
        cf:number,
        computation:number
    }
    
    let enjoyedSLVL:number = $state(0);
    let computation:LeaveCredits = $state({
        year:YearsInSvc.total.y*15,
        month:YearsInSvc.total.m/12*15,
        day:YearsInSvc.total.d/360*15,
        slvl:0,
        tlc:0,
        cf:0.0481927,
        computation:0
    });

    computation.slvl = (computation.year + computation.month + computation.day)*2;
    computation.computation = computation.tlc*computation.cf * HighestSalaryReceived.hsr;

</script>
<h2 class="card-title">Calculate Terminal Leave Claim</h2>
<div class="grid grid-cols-[1fr,auto,auto]">
    <div class="p-1">
        <span>Highest Salary Received</span>
    </div> 
    <div class="p-1"> = </div> 
    <div class="p-1 text-right">
        <span>₱ {moneyFormat(HighestSalaryReceived.hsr.toFixed(2))}</span>
    </div>
    <div class="p-1">
        <span>{YearsInSvc.total.y} years x 15 days</span>
    </div> 
    <div class="p-1"> = </div> 
    <div class="p-1 text-right">
        <span>{computation.year.toFixed(3)}</span>
    </div>
    <div class="p-1">
        <span>{YearsInSvc.total.m} months / 12 x 15 days</span>
    </div> 
    <div class="p-1"> = </div> 
    <div class="p-1 text-right">
        <span>{computation.month.toFixed(3)}</span>
    </div>
    <div class="p-1">
        <span>{YearsInSvc.total.d} days / 360 x 15 days</span>
    </div> 
    <div class="p-1"> = </div> 
    <div class="p-1 text-right">
        <span>{computation.day.toFixed(3)}</span>
    </div>
    <div class="p-1">
        <span>Total Earned VL & SL </span>
    </div> 
    <div class="p-1"> = </div> 
    <div class="p-1 text-right">
        <span>{computation.slvl.toFixed(3)}</span>
    </div>
    <div class="p-1">
        <span>Total Enjoyed VL & SL </span>
    </div> 
    <div class="p-1"> = </div> 
    <div class="p-1 text-right">
            <input type="number" min="0" max="{computation.slvl}" class="w-16 input input-sm input-bordered text-right" bind:value={enjoyedSLVL}
            onchange={()=>{computation.tlc = computation.slvl- enjoyedSLVL;}}
            >
    </div>
</div>