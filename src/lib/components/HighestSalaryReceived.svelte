<script lang="ts">
    interface SalaryMatrix{
        rank:string,
        basepay:number
    }

    let salaryGrade:SalaryMatrix[]=[
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

    let rankHigher:boolean = $state(false);

</script>
<h2 class="card-title">Calculate Highest Salary Received</h2>
<label for="rank" class="flex items-center gap-2">Rank:
    <select id="rank" class="select select-bordered w-full max-w-xs">
        <option disabled selected>Your current rank</option>
        {#each salaryGrade as salary}
            <option value={salary.basepay}>{salary.rank}</option>
        {/each}
    </select>
</label>
<label for="rank" class="flex items-center gap-2">
    <input type="checkbox" class="toggle toggle-success" bind:checked={rankHigher} />
    {(rankHigher)? "with one rank higher":"without one rank higher"}
</label>