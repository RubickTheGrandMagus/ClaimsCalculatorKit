<script>
	let claimType = "gratuity";

	//Calculate years in service
		let gapInSvc = false; let gapD = {gap1:{y1:1998,m1:11,d1:16,y2:2008,m2:1,d2:1},gap2:{y1:2008,m1:2,d1:2,y2:2016,m2:12,d2:13},gap3:{y1:2018,m1:3,d1:26,y2:2020,m2:5,d2:26}};
		let dor = {y:0,m:0,d:0}; let des = {y:0,m:0,d:0}; let birth = '1990-05-27'; let retType = "";
		const yearsInSvc =(a,b)=>{ //a is date entered; b is date retired
			a = new Date(a); b = new Date(b);
			let d1 = {yr:a.getFullYear(),mos:a.getMonth()+1,days:a.getDate()};
			let d2 = {yr:b.getFullYear(),mos:b.getMonth()+1,days:b.getDate()};
			let diff = {y:0,m:0,d:0};
			let output = {y:0,m:0,d:0};
			
			diff.d = d2.days-d1.days; diff.m = d2.mos-d1.mos; diff.y = d2.yr-d1.yr;
			output.y = (diff.m<0)? (diff.y-1):diff.y;
			output.m = (diff.m<0)? (((diff.d<0)? diff.m-1:diff.m)+12):((diff.d<0)? diff.m-1:diff.m);
			output.d = (diff.d<0)? (diff.d+30):diff.d;
			
			if(diff.y<0) return {year:`invalid`};
			
			return {years:output.y,months:output.m,days:output.d}
		}
		const gapInService = a =>{
			let b,c,d; 
			b = yearsInSvc(`${a.gap1.y1}-${a.gap1.m1}-${a.gap1.d1}`,`${a.gap1.y2}-${a.gap1.m2}-${a.gap1.d2}`);
			c = yearsInSvc(`${a.gap2.y1}-${a.gap2.m1}-${a.gap2.d1}`,`${a.gap2.y2}-${a.gap2.m2}-${a.gap2.d2}`);
			d = yearsInSvc(`${a.gap3.y1}-${a.gap3.m1}-${a.gap3.d1}`,`${a.gap3.y2}-${a.gap3.m2}-${a.gap3.d2}`);

			if(isNaN(b.years)) b = {years:0,months:0,days:0}
			if(isNaN(c.years)) c = {years:0,months:0,days:0}
			if(isNaN(d.years)) d = {years:0,months:0,days:0}

			let sum = {y:0,m:{t:0,r:0},d:{t:0,r:0}};
			sum.d.t = b.days + c.days + d.days; sum.d.r = (sum.d.t>=30)? (sum.d.t%30):sum.d.t;
			sum.m.t = b.months + c.months + d.months + Math.floor(sum.d.t/30); sum.m.r = (sum.m.t>=12)? (sum.m.t%12):sum.m.t;
			sum.y = b.years + c.years + d.years + Math.floor(sum.m.t/12);

			return {years:sum.y,months:sum.m.r,days:sum.d.r};
		}
		const valiDate = a =>{
			let b = yearsInSvc(a.dob,`${a.dor.y}-${a.dor.m}-${a.dor.d}`);
			let c = yearsInSvc(a.dob,`${a.des.y}-${a.des.m}-${a.des.d}`);
			let d = yearsInSvc(`${a.des.y}-${a.des.m}-${a.des.d}`,`${a.dor.y}-${a.dor.m}-${a.dor.d}`);
			let f = {dorDays:((b.years*12+b.months)*30+b.days),dobDays56:(56*12*30),dobDays60:(60*12*30)};
			
			if(isNaN(c.years) || c.years<0) return {err:true,msg:"Invalid Date!"}
			if(c.years<18 || c.years>35) return {err:true,msg:`Your age [${c.years}] doesn't qualify!`}
			if(f.dorDays>f.dobDays56 && a.type=="com56") return {err:true,msg:`Your above compulsory retirement. [${b.years}]`}
			if(f.dorDays>f.dobDays60 && a.type=="com60") return {err:true,msg:`Your above compulsory retirement. [${b.years}]`}
			if(d.years<20) return {err:true,msg:"Years in service is below optional retirement"}
			
			return {err:false,msg:""}
		}
		const changeDate = () =>{
			if(retType=="opt") return dor = {y:des.y+20,m:des.m,d:des.d}
			let a = new Date(birth);
			if(retType=="com56") return dor = {y:a.getFullYear()+56,m:a.getMonth()+1,d:a.getDate()}
			if(retType=="com60") return dor = {y:a.getFullYear()+60,m:a.getMonth()+1,d:a.getDate()}
		}
		$:gapinsvc = gapInService(gapD);
		$:yrsinsvc = yearsInSvc(`${des.y}-${des.m}-${des.d}`,`${dor.y}-${dor.m}-${dor.d}`);
		$:errorMsg = valiDate({dob:birth,des:des,dor:dor,type:retType});
	//end of function
	
	//calculate highest salary received
		let ranks = ["FO1","FO2","FO3","SFO1","SFO2","SFO3","SFO4","INSP","SINSP","CINSP","SUPT","SSUPT","CSUPT","DIR"];
		let selectedrank = "FO1";
		let rankup = false;
		let salaryTable = [{rank:"FO1",salary:29668},{rank:"FO2",salary:30867},{rank:"FO3",salary:32114},{rank:"SFO1",salary:33411},{rank:"SFO2",salary:34079},{rank:"SFO3",salary:34761},{rank:"SFO4",salary:38366},{rank:"INSP",salary:49528},{rank:"SINSP",salary:56582},{rank:"CINSP",salary:62555},{rank:"SUPT",salary:71313},{rank:"SSUPT",salary:80583},{rank:"CSUPT",salary:91058},{rank:"DIR",salary:102896}];
	
		const highestSalaryRcvd = (rank,yrs,plus1)=>{
				let output = {bp:0,pagi:0,lp:0,hsr:0}; let multiplier = 0; let index = ranks.findIndex(t=>t==rank);
				if(plus1) rank = ranks[index+1];
					
				output.bp = salaryTable.filter(t=>t.rank == rank)[0].salary;
				output.pagi = (Math.floor(yrs/5)>5)? 5:Math.floor(yrs/5);
				switch(output.pagi){
					case 5: multiplier = 0.5; break;
					case 4: multiplier = 0.4641; break;
					case 3: multiplier = 0.331; break;
					case 2: multiplier = 0.21; break;
					case 1: multiplier = 0.1; break;
					default: multiplier = 0; break;
				}
				output.lp = output.bp * multiplier;
				output.hsr = output.bp + output.lp;
				
			  return {basepay:output.bp.toFixed(2),pagi:output.pagi,longpay:output.lp.toFixed(2),hsr:output.hsr.toFixed(2),rank:rank}
		}
		$:hsr = highestSalaryRcvd(selectedrank,(gapInSvc)? gapinsvc.years:yrsinsvc.years,rankup);
	//end of function
	
	//function for computation of total rate
		const computeTotalRate = a =>{
			let total = parseFloat((a.years*2.5).toFixed(5)) + parseFloat(((a.months*2.5)/12).toFixed(5)) + parseFloat(((a.days*2.5)/360).toFixed(5));
			return {rateYr:(a.years*2.5),rateMos:((a.months*2.5)/12),rateDays:((a.days*2.5)/360),rateTotal:total}
		}
		$:computetotalrate = computeTotalRate((gapInSvc)? gapinsvc:yearsInSvc(`${des.y}-${des.m}-${des.d}`,`${dor.y}-${dor.m}-${dor.d}`));
	//end of function
	
	//Function for monthly pension & lumpsum
		const monthlyPension = (a,b)=>{
			a =  parseFloat(a); b = parseFloat(b);
			return (a*b)/100; 
		}
		$:pension = monthlyPension(hsr.hsr,computetotalrate.rateTotal);
		$:lumpsum =  parseFloat(monthlyPension(hsr.hsr,computetotalrate.rateTotal).toFixed(2))*36;
	//end of function
	
	//Format money with comma
		const money = a =>{
				return a.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		}
	//end of function
		
	//leave credits for terminal
		let leave = {vl:0,evl:0,esl:0};
		const leaveTotal = a =>{
			let total = (a.vl-a.evl)+(a.vl-a.esl);
			return {totalVL:(a.vl-a.evl),totalSL:(a.vl-a.esl),total:total};
		}
		$:computeleave = leaveTotal(leave);
	//end of variables
</script>

<input type="radio" value="gratuity" bind:group={claimType}> Gratuity 
<input type="radio" value="terminal" bind:group={claimType}> Terminal
<br/>

<hr/> 
<h4>I. CREDITABLE YEARS IN SERVICE</h4>
Gap in Service? <input type="checkbox" bind:checked={gapInSvc}>
<table>
    <thead>
        <tr>
            <th></th><th>Years</th><th>Months</th><th>Days</th>
        </tr>
    </thead>
    <tbody>
        {#if gapInSvc}
            <tr>
                <td style="font-weight:bold;" colspan="4">1st Service</td>
            </tr>
            <tr>
                <td>Out Service</td><td><input class="dateInputs" type="number" bind:value={gapD.gap1.y2}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap1.m2}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap1.d2}></td>
            </tr>
            <tr>
                <td>In Service</td><td><input class="dateInputs" type="number" bind:value={gapD.gap1.y1}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap1.m1}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap1.d1}></td>
            </tr>
            <tr class="gapYearsTotal">
                <td>Total</td><td>{yearsInSvc(`${gapD.gap1.y1}-${gapD.gap1.m1}-${gapD.gap1.d1}`,`${gapD.gap1.y2}-${gapD.gap1.m2}-${gapD.gap1.d2}`).years}</td><td>{yearsInSvc(`${gapD.gap1.y1}-${gapD.gap1.m1}-${gapD.gap1.d1}`,`${gapD.gap1.y2}-${gapD.gap1.m2}-${gapD.gap1.d2}`).months}</td><td>{yearsInSvc(`${gapD.gap1.y1}-${gapD.gap1.m1}-${gapD.gap1.d1}`,`${gapD.gap1.y2}-${gapD.gap1.m2}-${gapD.gap1.d2}`).days}</td>
            </tr>
            <tr>
                <td style="font-weight:bold;" colspan="4">2nd Service</td>
            </tr>
            <tr>
                <td>Out Service</td><td><input class="dateInputs" type="number" bind:value={gapD.gap2.y2}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap2.m2}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap2.d2}></td>
            </tr>
            <tr>
                <td>In Service</td><td><input class="dateInputs" type="number" bind:value={gapD.gap2.y1}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap2.m1}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap2.d1}></td>
            </tr>
            <tr class="gapYearsTotal">
                <td>Total</td><td>{yearsInSvc(`${gapD.gap2.y1}-${gapD.gap2.m1}-${gapD.gap2.d1}`,`${gapD.gap2.y2}-${gapD.gap2.m2}-${gapD.gap2.d2}`).years}</td><td>{yearsInSvc(`${gapD.gap2.y1}-${gapD.gap2.m1}-${gapD.gap2.d1}`,`${gapD.gap2.y2}-${gapD.gap2.m2}-${gapD.gap2.d2}`).months}</td><td>{yearsInSvc(`${gapD.gap2.y1}-${gapD.gap2.m1}-${gapD.gap2.d1}`,`${gapD.gap2.y2}-${gapD.gap2.m2}-${gapD.gap2.d2}`).days}</td>
            </tr>
            <tr>
                <td style="font-weight:bold;" colspan="4">3rd Service</td>
            </tr>
            <tr>
                <td>Out Service</td><td><input class="dateInputs" type="number" bind:value={gapD.gap3.y2}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap3.m2}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap3.d2}></td>
            </tr>
            <tr>
                <td>In Service</td><td><input class="dateInputs" type="number" bind:value={gapD.gap3.y1}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap3.m1}></td><td><input class="dateInputs" type="number" bind:value={gapD.gap3.d1}></td>
            </tr>
            <tr class="gapYearsTotal">
                <td>Total</td><td>{yearsInSvc(`${gapD.gap3.y1}-${gapD.gap3.m1}-${gapD.gap3.d1}`,`${gapD.gap3.y2}-${gapD.gap3.m2}-${gapD.gap3.d2}`).years}</td><td>{yearsInSvc(`${gapD.gap3.y1}-${gapD.gap3.m1}-${gapD.gap3.d1}`,`${gapD.gap3.y2}-${gapD.gap3.m2}-${gapD.gap3.d2}`).months}</td><td>{yearsInSvc(`${gapD.gap3.y1}-${gapD.gap3.m1}-${gapD.gap3.d1}`,`${gapD.gap3.y2}-${gapD.gap3.m2}-${gapD.gap3.d2}`).days}</td>
            </tr>
            <tr>
                <td>Total Years in Service</td><td class="dateInputCell"><b>{gapinsvc.years}</b></td><td class="dateInputCell"><b>{gapinsvc.months}</b></td><td class="dateInputCell"><b>{gapinsvc.days}</b></td>
            </tr>
        {:else}
            <tr>
                <td>Date of Retirement</td><td><input class="dateInputs" type="number" bind:value={dor.y}></td><td><input class="dateInputs" type="number" bind:value={dor.m}></td><td><input class="dateInputs" type="number" bind:value={dor.d}></td>
            </tr>
            <tr>
                <td>Date Entered Service</td><td><input class="dateInputs" type="number" bind:value={des.y}></td><td><input class="dateInputs" type="number" bind:value={des.m}></td><td><input class="dateInputs" type="number" bind:value={des.d}></td>
            </tr>
            <tr>
                <td>Total Years in Service</td><td class="dateInputCell"><b>{yrsinsvc.years || '0'}</b></td><td class="dateInputCell"><b>{yrsinsvc.months || '0'}</b></td><td class="dateInputCell"><b>{yrsinsvc.days || '0'}</b></td>
            </tr>
        {/if}
    </tbody>
</table>
Date of Birth <input type="date" bind:value={birth}/> <br>
{#if !gapInSvc}
	Type of Retirement
	<select bind:value={retType} on:change={()=>changeDate()}>
		<option value="">Select</option>
		<option value="opt">Optional</option>
		<option value="com56">Compulsory 56</option>
		<option value="com60">Compulsory 60</option>
	</select> <br/>
	{#if errorMsg.err}
		<i style="font-size: small;color:red;">{errorMsg.msg}</i>
	{/if}
{/if}
<hr>

<h4>
	II. HIGHEST SALARY RECEIVED
</h4>
Rank: 
<select bind:value={selectedrank}>
	{#each ranks as rank}
		{#if rank!="DIR"}
			<option>{rank}</option>
		{/if}
	{/each}
</select>
	with one rank higher? <input type="checkbox" bind:checked={rankup}/> <br/>
	<b>Retired Rank <u>{hsr.rank}</u></b>
	<table>
        <tbody>
            <tr>
                <td>Base Pay: </td> <td>₱ {money(hsr.basepay)}</td>		
            </tr>
            <tr>
                <td>[{hsr.pagi || 0}]Long Pay: </td><td>₱ {money(hsr.longpay)}</td>
            </tr>
            <tr style="">
                <td>Highest Salary Received:</td><td>₱ {money(hsr.hsr)}</td>
            </tr>
        </tbody>
	</table>
<hr/>

{#if claimType=="gratuity"}
<h4>
	III. COMPUTATION OF TOTAL RATE
</h4>
<table>
    <tbody>
        <tr>
            <td style="text-align:center;font-weight:bold;border-bottom:1px solid black;">{((gapInSvc)? gapinsvc.years:yrsinsvc.years) || 0}</td><td>yrs X 2.5%</td><td>=</td><td style="text-align:right;font-weight:bold;border-bottom:1px solid black;">{computetotalrate.rateYr.toFixed(5)} %</td>
        </tr>
        <tr>
            <td style="text-align:center;font-weight:bold;border-bottom:1px solid black;">{((gapInSvc)? gapinsvc.months:yrsinsvc.months) || 0}</td><td>mos/12 x 2.5%</td><td>=</td><td style="text-align:right;font-weight:bold;border-bottom:1px solid black;">{computetotalrate.rateMos.toFixed(5)} %</td>
        </tr>
        <tr>
            <td style="text-align:center;font-weight:bold;border-bottom:1px solid black;">{((gapInSvc)? gapinsvc.days:yrsinsvc.days) || 0}</td><td>days/360 x 2.5%</td><td>=</td><td style="text-align:right;font-weight:bold;border-bottom:1px solid black;">{computetotalrate.rateDays.toFixed(5)} %</td>
        </tr>
        <tr>
            <td colspan="3" style="text-align:right">TOTAL RATE</td><td style="text-align:right;font-weight:bold;border-bottom:1px solid black;">{computetotalrate.rateTotal.toFixed(5)} %</td>
        </tr>
    </tbody>
</table>
<hr/>

<h4>
	IV. MONTHLY PENSION (Total Salary x Total Rate)
</h4>
<p>
	<strong>₱ {money(hsr.hsr)}</strong> X <strong>{computetotalrate.rateTotal.toFixed(5)} %</strong> = <strong>₱ {money(pension.toFixed(2))}</strong>
</p>
<hr/>
<h4>
	V. THREE YEAR LUMP SUM (Monthly Pension x 36 mos)	
</h4>
<p>
	<strong>₱ {money(pension.toFixed(2))}</strong> X <strong>36 months</strong> = <strong>₱ {money(lumpsum.toFixed(2))}</strong>
</p>
{:else}

<h4>
	III. COMPUTATION OF LEAVE CREDITS	
</h4>
<table style="border-spacing:10px">
    <tbody>
        <tr style="text-align:center">
            <th></th><th>EARNED</th><th>ENJOYED</th><th>TOTAL</th>
        </tr>			
        <tr>
            <td style="font-weight:bold">VL/ML</td><td style="border-bottom:1px solid black;text-align:right"><input class="leaveInputs" type="number" bind:value={leave.vl}/></td><td style="border-bottom:1px solid black;text-align:center"><input class="leaveInputs" type="number" bind:value={leave.evl}/></td><td style="border-bottom:1px solid black;text-align:right">{computeleave.totalVL.toFixed(3)}</td>
        </tr>
        <tr>
            <td style="font-weight:bold">SL</td><td style="border-bottom:1px solid black;text-align:right;padding-right:20px;">{leave.vl}</td><td style="border-bottom:1px solid black;text-align:center"><input class="leaveInputs" type="number" bind:value={leave.esl}/></td><td style="border-bottom:1px solid black;text-align:right">{computeleave.totalSL.toFixed(3)}</td>
        </tr>
        <tr>
            <td style="font-weight:bold">TOTAL</td><td style="border-bottom:1px solid black;text-align:right;padding-right:20px;">{(leave.vl*2).toFixed(3)}</td><td style="border-bottom:1px solid black;text-align:center">{(leave.evl+leave.esl).toFixed(3)}</td><td style="border-bottom:1px solid black;text-align:right">{computeleave.total.toFixed(3)}</td>
        </tr>
        <tr>
            <td colspan="4">(Days exclusives Saturdays, Sundays and Holidays)</td>
        </tr>
    </tbody>
</table>
<p>
	Total Leave Benefits = <b>₱ {money(hsr.hsr)}</b> x <b>{computeleave.total.toFixed(3)}</b> x <b>0.0481927</b> = <b>₱ {money((parseFloat(hsr.hsr)*computeleave.total*0.0481927).toFixed(2))}</b>
</p>
{/if}
<span>Copyright ITCU 7 - Retirements Claims Calculator v1.5</span> 
<style>
	.dateInputs{
		width:70px;
		text-align:center;
	}
	.dateInputCell{
		text-align:center;
		border-top:1px solid black;
	}
	.leaveInputs{
		width:100px;
		text-align:right;
		border:0;
		background-color:green;
		color:white;
	}
	span{
		font-size: x-small;
	}
	.gapYearsTotal td:not(:first-child){
		text-align: center;
		font-size: smaller;
		font-weight: bold;
	}
</style>