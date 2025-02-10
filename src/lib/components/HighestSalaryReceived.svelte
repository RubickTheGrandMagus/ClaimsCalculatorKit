<script lang="ts">
    import {YearsInSvc, HighestSalaryReceived, moneyFormat} from './shared.svelte.js';

    interface SalaryMatrix{
        rank:string,
        basepay:number
    }

    interface LongPayMatrix{
        pagi:number,
        rate:number
    }

    interface CalculateHSR{
        rank:string,
        retrank:string,
        bp:number,
        pagi:number,
        lp:number,
        hsr:number
    }

    const salaryGrade:SalaryMatrix[]=[
        {rank:"FO1",basepay:29668},
        {rank:"FO2",basepay:30867},
        {rank:"FO3",basepay:32114},
        {rank:"SFO1",basepay:33411},
        {rank:"SFO2",basepay:34079},
        {rank:"SFO3",basepay:34761},
        {rank:"SFO4",basepay:38366},
        {rank:"FINSP",basepay:49528},
        {rank:"FSINSP",basepay:56582},
        {rank:"FCINSP",basepay:62555},
        {rank:"FSUPT",basepay:71313},
        {rank:"FSSUPT",basepay:80583},
        {rank:"FCSUPT",basepay:91058},
        {rank:"FDIR",basepay:102896}
    ];

    let longevityPay:LongPayMatrix[]=[
        {pagi:5,rate:0.5},
        {pagi:4,rate:0.4641},
        {pagi:3,rate:0.331},
        {pagi:2,rate:0.21},
        {pagi:1,rate:0.1}
    ];

    let retiree:CalculateHSR = $state({
        rank:(HighestSalaryReceived.rank!="")? HighestSalaryReceived.rank:"",
        retrank:(HighestSalaryReceived.retrank!="")? HighestSalaryReceived.retrank:"Select Your Rank",
        bp:(HighestSalaryReceived.bp!=0)? HighestSalaryReceived.bp:0,
        pagi:(HighestSalaryReceived.pagi!=0)? HighestSalaryReceived.pagi:Math.floor(YearsInSvc.otherService.bfp.years/5),
        lp:(HighestSalaryReceived.lp!=0)? HighestSalaryReceived.lp:0,
        hsr:(HighestSalaryReceived.hsr!=0)? HighestSalaryReceived.hsr:0
    });
    let rankHigher:boolean = $state((retiree.retrank=="Select Your Rank")? false:true);

    function computeHSR(){
        let index = salaryGrade.findIndex(t=>t.rank == retiree.rank);
        let index2 = longevityPay.findIndex(t=>t.pagi == retiree.pagi);
        if(rankHigher && index<salaryGrade.length-1 && retiree.rank!="Your current rank"){
            index +=1;
        }

        retiree.retrank = salaryGrade[index].rank;
        retiree.bp = salaryGrade[index].basepay;
        retiree.lp = salaryGrade[index].basepay * longevityPay[index2].rate;
        retiree.hsr = retiree.bp + retiree.lp;

        HighestSalaryReceived.rank = retiree.rank;
        HighestSalaryReceived.retrank = retiree.retrank;
        HighestSalaryReceived.bp = retiree.bp;
        HighestSalaryReceived.pagi = retiree.pagi;
        HighestSalaryReceived.lp = retiree.lp;
        HighestSalaryReceived.hsr = retiree.hsr;
    }

</script>
<h2 class="card-title">Calculate Highest Salary Received</h2>
<label for="rank" class="label flex items-center gap-2">Rank:
    <select id="rank" class="select select-bordered select-sm w-full max-w-xs" bind:value={retiree.rank} onchange={()=>computeHSR()}>
        <option disabled selected>Your current rank</option>
        {#each salaryGrade as salary}
            {#if salary.rank != "FDIR"}
                <option value={salary.rank}>{salary.rank}</option>
            {/if}
        {/each}
    </select>
</label>
<label for="rank" class="label">
    <input type="checkbox" class="toggle toggle-success" bind:checked={rankHigher} onchange={()=>computeHSR()}/>
    {(rankHigher)? "with one rank higher":"without one rank higher"}
</label>
<label class="label font-bold" for="retrank">
    <span>Retired Rank:</span>
    <span>{retiree.retrank}</span>
</label>
<label class="label" for="basepay">
    <span>Base Pay:</span>
    <span>₱ {moneyFormat(retiree.bp.toFixed(2))}</span>
</label>
<label class="label" for="longpay">
    <span>Long Pay [ {retiree.pagi} ]:</span>
    <span>₱ {moneyFormat(retiree.lp.toFixed(2))}</span>
</label>
<label class="label" for="hsr">
    <span>Highest Salary Received:</span>
    <span>₱ {moneyFormat(retiree.hsr.toFixed(2))}</span>
</label>