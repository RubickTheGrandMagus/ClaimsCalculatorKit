<script>
	import { onMount, onDestroy } from 'svelte';

	/** @type {HTMLElement} */
	let vantaContainer;
	/** @type {any} */
	let vantaEffect;

	onMount(async () => {
		/** @param {string} src */
		const loadScript = (src) =>
			new Promise((resolve, reject) => {
				if (document.querySelector(`script[src="${src}"]`)) return resolve(undefined);
				const script = document.createElement('script');
				script.src = src;
				script.onload = () => resolve(undefined);
				script.onerror = reject;
				document.head.appendChild(script);
			});

		try {
			await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
			await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js');

			// @ts-ignore
			if (window.VANTA && window.VANTA.DOTS) {
				// @ts-ignore
				vantaEffect = window.VANTA.DOTS({
					el: vantaContainer,
					mouseControls: true,
					touchControls: true,
					gyroControls: false,
					minHeight: 200.0,
					minWidth: 200.0,
					scale: 1.0,
					scaleMobile: 1.0,
					color: 0x0ea5e9, // Tailwind sky-500
					color2: 0x8b5cf6, // Tailwind violet-500
					backgroundColor: 0xffffff,
					backgroundAlpha: 0.0, // Transparent to seamlessly integrate with themes
					size: 3.5,
					spacing: 35.0
				});
			}
		} catch (e) {
			console.error('Failed to load Vanta.js', e);
		}
	});

	onDestroy(() => {
		if (vantaEffect) vantaEffect.destroy();
	});

	let claimType = 'gratuity';

	//Calculate years in service
	let gapInSvc = false;
	let gapD = {
		gap1: { y1: 1998, m1: 11, d1: 16, y2: 2008, m2: 1, d2: 1 },
		gap2: { y1: 2008, m1: 2, d1: 2, y2: 2016, m2: 12, d2: 13 },
		gap3: { y1: 2018, m1: 3, d1: 26, y2: 2020, m2: 5, d2: 26 }
	};
	let dor = { y: 0, m: 0, d: 0 };
	let des = { y: 0, m: 0, d: 0 };
	let birth = '1990-05-27';
	let retType = '';
	const yearsInSvc = (a, b) => {
		//a is date entered; b is date retired
		a = new Date(a);
		b = new Date(b);
		let d1 = { yr: a.getFullYear(), mos: a.getMonth() + 1, days: a.getDate() };
		let d2 = { yr: b.getFullYear(), mos: b.getMonth() + 1, days: b.getDate() };
		let diff = { y: 0, m: 0, d: 0 };
		let output = { y: 0, m: 0, d: 0 };

		diff.d = d2.days - d1.days;
		diff.m = d2.mos - d1.mos;
		diff.y = d2.yr - d1.yr;
		output.y = diff.m < 0 ? diff.y - 1 : diff.y;
		output.m =
			diff.m < 0 ? (diff.d < 0 ? diff.m - 1 : diff.m) + 12 : diff.d < 0 ? diff.m - 1 : diff.m;
		output.d = diff.d < 0 ? diff.d + 30 : diff.d;

		if (diff.y < 0) return { year: `invalid` };

		return { years: output.y, months: output.m, days: output.d };
	};
	const gapInService = (a) => {
		let b, c, d;
		b = yearsInSvc(
			`${a.gap1.y1}-${a.gap1.m1}-${a.gap1.d1}`,
			`${a.gap1.y2}-${a.gap1.m2}-${a.gap1.d2}`
		);
		c = yearsInSvc(
			`${a.gap2.y1}-${a.gap2.m1}-${a.gap2.d1}`,
			`${a.gap2.y2}-${a.gap2.m2}-${a.gap2.d2}`
		);
		d = yearsInSvc(
			`${a.gap3.y1}-${a.gap3.m1}-${a.gap3.d1}`,
			`${a.gap3.y2}-${a.gap3.m2}-${a.gap3.d2}`
		);

		if (isNaN(b.years)) b = { years: 0, months: 0, days: 0 };
		if (isNaN(c.years)) c = { years: 0, months: 0, days: 0 };
		if (isNaN(d.years)) d = { years: 0, months: 0, days: 0 };

		let sum = { y: 0, m: { t: 0, r: 0 }, d: { t: 0, r: 0 } };
		sum.d.t = b.days + c.days + d.days;
		sum.d.r = sum.d.t >= 30 ? sum.d.t % 30 : sum.d.t;
		sum.m.t = b.months + c.months + d.months + Math.floor(sum.d.t / 30);
		sum.m.r = sum.m.t >= 12 ? sum.m.t % 12 : sum.m.t;
		sum.y = b.years + c.years + d.years + Math.floor(sum.m.t / 12);

		return { years: sum.y, months: sum.m.r, days: sum.d.r };
	};
	const valiDate = (a) => {
		let b = yearsInSvc(a.dob, `${a.dor.y}-${a.dor.m}-${a.dor.d}`);
		let c = yearsInSvc(a.dob, `${a.des.y}-${a.des.m}-${a.des.d}`);
		let d = yearsInSvc(`${a.des.y}-${a.des.m}-${a.des.d}`, `${a.dor.y}-${a.dor.m}-${a.dor.d}`);
		let f = {
			dorDays: (b.years * 12 + b.months) * 30 + b.days,
			dobDays56: 56 * 12 * 30,
			dobDays60: 60 * 12 * 30
		};

		if (isNaN(c.years) || c.years < 0) return { err: true, msg: 'Invalid Date!' };
		if (c.years < 18 || c.years > 35)
			return { err: true, msg: `Your age [${c.years}] doesn't qualify!` };
		if (f.dorDays > f.dobDays56 && a.type == 'com56')
			return { err: true, msg: `Your above compulsory retirement. [${b.years}]` };
		if (f.dorDays > f.dobDays60 && a.type == 'com60')
			return { err: true, msg: `Your above compulsory retirement. [${b.years}]` };
		if (d.years < 20) return { err: true, msg: 'Years in service is below optional retirement' };

		return { err: false, msg: '' };
	};
	const changeDate = () => {
		if (retType == 'opt') return (dor = { y: des.y + 20, m: des.m, d: des.d });
		let a = new Date(birth);
		if (retType == 'com56')
			return (dor = { y: a.getFullYear() + 56, m: a.getMonth() + 1, d: a.getDate() });
		if (retType == 'com60')
			return (dor = { y: a.getFullYear() + 60, m: a.getMonth() + 1, d: a.getDate() });
	};
	$: gapinsvc = gapInService(gapD);
	$: yrsinsvc = yearsInSvc(`${des.y}-${des.m}-${des.d}`, `${dor.y}-${dor.m}-${dor.d}`);
	$: errorMsg = valiDate({ dob: birth, des: des, dor: dor, type: retType });
	//end of function

	//calculate highest salary received
	let ranks = [
		'FO1',
		'FO2',
		'FO3',
		'SFO1',
		'SFO2',
		'SFO3',
		'SFO4',
		'INSP',
		'SINSP',
		'CINSP',
		'SUPT',
		'SSUPT',
		'CSUPT',
		'DIR'
	];
	let selectedrank = 'FO1';
	let rankup = false;
	let salaryTable = [
		{ rank: 'FO1', salary: 29668 },
		{ rank: 'FO2', salary: 30867 },
		{ rank: 'FO3', salary: 32114 },
		{ rank: 'SFO1', salary: 33411 },
		{ rank: 'SFO2', salary: 34079 },
		{ rank: 'SFO3', salary: 34761 },
		{ rank: 'SFO4', salary: 38366 },
		{ rank: 'INSP', salary: 49528 },
		{ rank: 'SINSP', salary: 56582 },
		{ rank: 'CINSP', salary: 62555 },
		{ rank: 'SUPT', salary: 71313 },
		{ rank: 'SSUPT', salary: 80583 },
		{ rank: 'CSUPT', salary: 91058 },
		{ rank: 'DIR', salary: 102896 }
	];

	const highestSalaryRcvd = (rank, yrs, plus1) => {
		let output = { bp: 0, pagi: 0, lp: 0, hsr: 0 };
		let multiplier = 0;
		let index = ranks.findIndex((t) => t == rank);
		if (plus1) rank = ranks[index + 1];

		output.bp = salaryTable.filter((t) => t.rank == rank)[0].salary;
		output.pagi = Math.floor(yrs / 5) > 5 ? 5 : Math.floor(yrs / 5);
		switch (output.pagi) {
			case 5:
				multiplier = 0.5;
				break;
			case 4:
				multiplier = 0.4641;
				break;
			case 3:
				multiplier = 0.331;
				break;
			case 2:
				multiplier = 0.21;
				break;
			case 1:
				multiplier = 0.1;
				break;
			default:
				multiplier = 0;
				break;
		}
		output.lp = output.bp * multiplier;
		output.hsr = output.bp + output.lp;

		return {
			basepay: output.bp.toFixed(2),
			pagi: output.pagi,
			longpay: output.lp.toFixed(2),
			hsr: output.hsr.toFixed(2),
			rank: rank
		};
	};
	$: hsr = highestSalaryRcvd(selectedrank, gapInSvc ? gapinsvc.years : yrsinsvc.years, rankup);
	//end of function

	//function for computation of total rate
	const computeTotalRate = (a) => {
		let total =
			parseFloat((a.years * 2.5).toFixed(5)) +
			parseFloat(((a.months * 2.5) / 12).toFixed(5)) +
			parseFloat(((a.days * 2.5) / 360).toFixed(5));
		return {
			rateYr: a.years * 2.5,
			rateMos: (a.months * 2.5) / 12,
			rateDays: (a.days * 2.5) / 360,
			rateTotal: total
		};
	};
	$: computetotalrate = computeTotalRate(
		gapInSvc ? gapinsvc : yearsInSvc(`${des.y}-${des.m}-${des.d}`, `${dor.y}-${dor.m}-${dor.d}`)
	);
	//end of function

	//Function for monthly pension & lumpsum
	const monthlyPension = (a, b) => {
		a = parseFloat(a);
		b = parseFloat(b);
		return (a * b) / 100;
	};
	$: pension = monthlyPension(hsr.hsr, computetotalrate.rateTotal);
	$: lumpsum = parseFloat(monthlyPension(hsr.hsr, computetotalrate.rateTotal).toFixed(2)) * 36;
	//end of function

	//Format money with comma
	const money = (a) => {
		return a.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};
	//end of function

	//leave credits for terminal
	let leave = { vl: 0, evl: 0, esl: 0 };
	const leaveTotal = (a) => {
		let total = a.vl - a.evl + (a.vl - a.esl);
		return { totalVL: a.vl - a.evl, totalSL: a.vl - a.esl, total: total };
	};
	$: computeleave = leaveTotal(leave);
	//end of variables
</script>

<!-- Vanta.js Background -->
<div
	bind:this={vantaContainer}
	class="pointer-events-none fixed inset-0 z-[-1] min-h-screen w-full opacity-25"
></div>

<div class="container relative mx-auto mb-16 max-w-4xl space-y-6 px-4 py-8">
	<div
		class="flex flex-col items-center justify-between rounded-xl bg-base-200 p-4 shadow-sm md:flex-row"
	>
		<h1 class="text-2xl font-bold text-primary">Claims Calculator v1.5 (Legacy)</h1>
		<div class="mt-4 flex items-center gap-4 md:mt-0">
			<label class="label cursor-pointer gap-2">
				<input type="radio" value="gratuity" class="radio radio-primary" bind:group={claimType} />
				<span class="label-text font-medium">Gratuity</span>
			</label>
			<label class="label cursor-pointer gap-2">
				<input type="radio" value="terminal" class="radio radio-secondary" bind:group={claimType} />
				<span class="label-text font-medium">Terminal</span>
			</label>
		</div>
	</div>

	<!-- Section I -->
	<div class="card border border-base-200 bg-base-100 shadow-md">
		<div class="card-body">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="card-title text-lg">I. CREDITABLE YEARS IN SERVICE</h2>
				<label class="label cursor-pointer gap-2 rounded-lg bg-base-200 px-3 py-1">
					<span class="label-text font-semibold">Gap in Service?</span>
					<input type="checkbox" class="toggle toggle-primary" bind:checked={gapInSvc} />
				</label>
			</div>

			<div class="overflow-x-auto">
				<table class="table table-sm w-full md:table-md">
					<thead>
						<tr class="bg-base-200 text-base-content">
							<th>Period</th>
							<th class="text-center">Years</th>
							<th class="text-center">Months</th>
							<th class="text-center">Days</th>
						</tr>
					</thead>
					<tbody>
						{#if gapInSvc}
							<tr class="bg-base-100"
								><td colspan="4" class="border-b-2 font-bold italic text-primary">1st Service</td
								></tr
							>
							<tr>
								<td>Out Service</td>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap1.y2}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap1.m2}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap1.d2}
									/></td
								>
							</tr>
							<tr>
								<td>In Service</td>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap1.y1}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap1.m1}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap1.d1}
									/></td
								>
							</tr>
							<tr class="bg-base-200/50 font-medium">
								<td class="text-right">Total:</td>
								<td class="text-center text-primary"
									>{yearsInSvc(
										`${gapD.gap1.y1}-${gapD.gap1.m1}-${gapD.gap1.d1}`,
										`${gapD.gap1.y2}-${gapD.gap1.m2}-${gapD.gap1.d2}`
									).years}</td
								>
								<td class="text-center text-primary"
									>{yearsInSvc(
										`${gapD.gap1.y1}-${gapD.gap1.m1}-${gapD.gap1.d1}`,
										`${gapD.gap1.y2}-${gapD.gap1.m2}-${gapD.gap1.d2}`
									).months}</td
								>
								<td class="text-center text-primary"
									>{yearsInSvc(
										`${gapD.gap1.y1}-${gapD.gap1.m1}-${gapD.gap1.d1}`,
										`${gapD.gap1.y2}-${gapD.gap1.m2}-${gapD.gap1.d2}`
									).days}</td
								>
							</tr>

							<tr class="bg-base-100"
								><td colspan="4" class="border-b-2 font-bold italic text-primary">2nd Service</td
								></tr
							>
							<tr>
								<td>Out Service</td>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap2.y2}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap2.m2}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap2.d2}
									/></td
								>
							</tr>
							<tr>
								<td>In Service</td>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap2.y1}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap2.m1}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap2.d1}
									/></td
								>
							</tr>
							<tr class="bg-base-200/50 font-medium">
								<td class="text-right">Total:</td>
								<td class="text-center text-primary"
									>{yearsInSvc(
										`${gapD.gap2.y1}-${gapD.gap2.m1}-${gapD.gap2.d1}`,
										`${gapD.gap2.y2}-${gapD.gap2.m2}-${gapD.gap2.d2}`
									).years}</td
								>
								<td class="text-center text-primary"
									>{yearsInSvc(
										`${gapD.gap2.y1}-${gapD.gap2.m1}-${gapD.gap2.d1}`,
										`${gapD.gap2.y2}-${gapD.gap2.m2}-${gapD.gap2.d2}`
									).months}</td
								>
								<td class="text-center text-primary"
									>{yearsInSvc(
										`${gapD.gap2.y1}-${gapD.gap2.m1}-${gapD.gap2.d1}`,
										`${gapD.gap2.y2}-${gapD.gap2.m2}-${gapD.gap2.d2}`
									).days}</td
								>
							</tr>

							<tr class="bg-base-100"
								><td colspan="4" class="border-b-2 font-bold italic text-primary">3rd Service</td
								></tr
							>
							<tr>
								<td>Out Service</td>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap3.y2}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap3.m2}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap3.d2}
									/></td
								>
							</tr>
							<tr>
								<td>In Service</td>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap3.y1}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap3.m1}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={gapD.gap3.d1}
									/></td
								>
							</tr>
							<tr class="bg-base-200/50 border-b-2 font-medium">
								<td class="text-right">Total:</td>
								<td class="text-center text-primary"
									>{yearsInSvc(
										`${gapD.gap3.y1}-${gapD.gap3.m1}-${gapD.gap3.d1}`,
										`${gapD.gap3.y2}-${gapD.gap3.m2}-${gapD.gap3.d2}`
									).years}</td
								>
								<td class="text-center text-primary"
									>{yearsInSvc(
										`${gapD.gap3.y1}-${gapD.gap3.m1}-${gapD.gap3.d1}`,
										`${gapD.gap3.y2}-${gapD.gap3.m2}-${gapD.gap3.d2}`
									).months}</td
								>
								<td class="text-center text-primary"
									>{yearsInSvc(
										`${gapD.gap3.y1}-${gapD.gap3.m1}-${gapD.gap3.d1}`,
										`${gapD.gap3.y2}-${gapD.gap3.m2}-${gapD.gap3.d2}`
									).days}</td
								>
							</tr>

							<tr class="bg-primary/10">
								<td class="font-bold">Total Years in Service</td>
								<td class="text-center text-lg font-bold text-primary">{gapinsvc.years}</td>
								<td class="text-center text-lg font-bold text-primary">{gapinsvc.months}</td>
								<td class="text-center text-lg font-bold text-primary">{gapinsvc.days}</td>
							</tr>
						{:else}
							<tr>
								<td class="font-medium">Date of Retirement</td>
								<td
									><input
										class="input-bordered input mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={dor.y}
										placeholder="YYYY"
									/></td
								>
								<td
									><input
										class="input-bordered input mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={dor.m}
										placeholder="MM"
									/></td
								>
								<td
									><input
										class="input-bordered input mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={dor.d}
										placeholder="DD"
									/></td
								>
							</tr>
							<tr>
								<td class="font-medium">Date Entered Service</td>
								<td
									><input
										class="input-bordered input mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={des.y}
										placeholder="YYYY"
									/></td
								>
								<td
									><input
										class="input-bordered input mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={des.m}
										placeholder="MM"
									/></td
								>
								<td
									><input
										class="input-bordered input mx-auto block w-full max-w-[80px] text-center"
										type="number"
										bind:value={des.d}
										placeholder="DD"
									/></td
								>
							</tr>
							<tr class="bg-primary/10">
								<td class="font-bold">Total Years in Service</td>
								<td class="text-center text-lg font-bold text-primary">{yrsinsvc.years || '0'}</td>
								<td class="text-center text-lg font-bold text-primary">{yrsinsvc.months || '0'}</td>
								<td class="text-center text-lg font-bold text-primary">{yrsinsvc.days || '0'}</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>

			<div class="mt-6 flex flex-col gap-6 rounded-lg bg-base-200 p-4 md:flex-row">
				<label class="form-control w-full md:max-w-xs">
					<div class="label"><span class="label-text font-bold">Date of Birth</span></div>
					<input type="date" class="input-bordered input w-full" bind:value={birth} />
				</label>

				{#if !gapInSvc}
					<label class="form-control w-full md:max-w-xs">
						<div class="label"><span class="label-text font-bold">Type of Retirement</span></div>
						<select
							class="select-bordered select w-full"
							bind:value={retType}
							on:change={() => changeDate()}
						>
							<option value="">Select</option>
							<option value="opt">Optional</option>
							<option value="com56">Compulsory 56</option>
							<option value="com60">Compulsory 60</option>
						</select>
						{#if errorMsg.err}
							<div class="label">
								<span class="label-text-alt font-medium text-error">{errorMsg.msg}</span>
							</div>
						{/if}
					</label>
				{/if}
			</div>
		</div>
	</div>

	<!-- Section II -->
	<div class="card border border-base-200 bg-base-100 shadow-md">
		<div class="card-body">
			<h2 class="card-title mb-4 text-lg">II. HIGHEST SALARY RECEIVED</h2>

			<div class="mb-6 flex flex-col items-end gap-6 rounded-lg bg-base-200 p-4 md:flex-row">
				<label class="form-control w-full md:max-w-xs">
					<div class="label"><span class="label-text font-bold">Rank</span></div>
					<select class="select-bordered select w-full" bind:value={selectedrank}>
						{#each ranks as rank}
							{#if rank != 'DIR'}
								<option>{rank}</option>
							{/if}
						{/each}
					</select>
				</label>

				<label class="label h-12 cursor-pointer gap-3">
					<span class="label-text font-medium">With one rank higher?</span>
					<input type="checkbox" class="checkbox checkbox-primary" bind:checked={rankup} />
				</label>
			</div>

			<div
				class="flex flex-col items-center justify-between rounded-t-lg bg-primary px-4 py-3 text-primary-content md:flex-row"
			>
				<span class="text-lg font-semibold">Retired Rank:</span>
				<span class="text-2xl font-bold underline decoration-2">{hsr.rank}</span>
			</div>
			<div class="overflow-x-auto rounded-b-lg border-x border-b border-base-200">
				<table class="table w-full">
					<tbody>
						<tr>
							<td class="text-base-content/80 font-medium">Base Pay:</td>
							<td class="text-right font-mono text-lg">₱ {money(hsr.basepay)}</td>
						</tr>
						<tr>
							<td class="text-base-content/80 font-medium">[{hsr.pagi || 0}] Long Pay:</td>
							<td class="text-right font-mono text-lg">₱ {money(hsr.longpay)}</td>
						</tr>
						<tr class="bg-base-200">
							<td class="text-lg font-bold">Highest Salary Received:</td>
							<td class="text-right font-mono text-xl font-bold text-primary">₱ {money(hsr.hsr)}</td
							>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Section III / IV / V Based on Claim Type -->
	{#if claimType == 'gratuity'}
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<!-- Rate Computation -->
			<div class="card border border-base-200 bg-base-100 shadow-md">
				<div class="card-body">
					<h2 class="card-title mb-4 text-lg">III. COMPUTATION OF TOTAL RATE</h2>
					<div class="overflow-x-auto">
						<table class="table table-sm w-full">
							<tbody>
								<tr>
									<td class="w-1/4 border-b border-base-300 text-center font-bold"
										>{(gapInSvc ? gapinsvc.years : yrsinsvc.years) || 0}</td
									>
									<td class="text-base-content/80">yrs X 2.5%</td>
									<td>=</td>
									<td class="border-b border-base-300 text-right font-mono font-bold text-info"
										>{computetotalrate.rateYr.toFixed(5)} %</td
									>
								</tr>
								<tr>
									<td class="border-b border-base-300 text-center font-bold"
										>{(gapInSvc ? gapinsvc.months : yrsinsvc.months) || 0}</td
									>
									<td class="text-base-content/80">mos/12 x 2.5%</td>
									<td>=</td>
									<td class="border-b border-base-300 text-right font-mono font-bold text-info"
										>{computetotalrate.rateMos.toFixed(5)} %</td
									>
								</tr>
								<tr>
									<td class="border-b border-base-300 text-center font-bold"
										>{(gapInSvc ? gapinsvc.days : yrsinsvc.days) || 0}</td
									>
									<td class="text-base-content/80">days/360 x 2.5%</td>
									<td>=</td>
									<td class="border-b border-base-300 text-right font-mono font-bold text-info"
										>{computetotalrate.rateDays.toFixed(5)} %</td
									>
								</tr>
								<tr class="bg-base-200">
									<td colspan="3" class="text-right font-bold">TOTAL RATE</td>
									<td class="text-right font-mono text-lg font-extrabold text-primary"
										>{computetotalrate.rateTotal.toFixed(5)} %</td
									>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- Pension and Lump Sum -->
			<div class="flex flex-col gap-6">
				<div class="card border border-base-200 bg-base-100 shadow-md">
					<div class="card-body">
						<h2 class="card-title mb-2 text-sm opacity-70">IV. MONTHLY PENSION</h2>
						<p class="text-base-content/70 mb-2 text-xs">Total Salary x Total Rate</p>
						<div
							class="flex flex-wrap items-center gap-2 overflow-x-auto rounded-lg bg-base-200 p-3 font-mono text-sm"
						>
							<span>₱ {money(hsr.hsr)}</span>
							<span class="text-base-content/50">X</span>
							<span>{computetotalrate.rateTotal.toFixed(5)} %</span>
							<span class="text-base-content/50">=</span>
							<span class="whitespace-nowrap text-base font-bold text-info"
								>₱ {money(pension.toFixed(2))}</span
							>
						</div>
					</div>
				</div>

				<div
					class="card animate-pulse bg-primary text-primary-content shadow-lg"
					style="animation-duration: 3s;"
				>
					<div class="card-body">
						<h2 class="card-title mb-2 text-sm opacity-90">V. THREE YEAR LUMP SUM</h2>
						<p class="text-primary-content/70 mb-2 text-xs">Monthly Pension x 36 mos</p>
						<div
							class="bg-primary-focus/30 flex flex-wrap items-center gap-2 overflow-x-auto rounded-lg p-3 font-mono text-sm"
						>
							<span>₱ {money(pension.toFixed(2))}</span>
							<span class="text-primary-content/50">X</span>
							<span>36 months</span>
							<span class="text-primary-content/50">=</span>
							<span class="whitespace-nowrap text-2xl font-bold">₱ {money(lumpsum.toFixed(2))}</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="card border border-base-200 bg-base-100 shadow-md">
			<div class="card-body">
				<h2 class="card-title mb-4 text-lg">III. COMPUTATION OF LEAVE CREDITS</h2>
				<div class="overflow-x-auto">
					<table class="table w-full">
						<thead>
							<tr class="bg-base-200">
								<th>Type</th>
								<th class="text-center">EARNED</th>
								<th class="text-center">ENJOYED</th>
								<th class="text-right">TOTAL</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="font-bold">VL/ML</td>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[100px] text-right font-mono"
										type="number"
										bind:value={leave.vl}
									/></td
								>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[100px] text-center font-mono"
										type="number"
										bind:value={leave.evl}
									/></td
								>
								<td class="text-right font-mono font-bold text-info"
									>{computeleave.totalVL.toFixed(3)}</td
								>
							</tr>
							<tr>
								<td class="font-bold">SL</td>
								<td class="bg-base-200/40 pr-6 text-right font-mono">{leave.vl}</td>
								<td
									><input
										class="input-bordered input input-sm mx-auto block w-full max-w-[100px] text-center font-mono"
										type="number"
										bind:value={leave.esl}
									/></td
								>
								<td class="text-right font-mono font-bold text-info"
									>{computeleave.totalSL.toFixed(3)}</td
								>
							</tr>
							<tr class="bg-primary/10 border-primary/20 border-t-2">
								<td class="font-extrabold text-primary">TOTAL</td>
								<td class="pr-6 text-right font-mono">{(leave.vl * 2).toFixed(3)}</td>
								<td class="text-base-content/80 text-center font-mono"
									>{(leave.evl + leave.esl).toFixed(3)}</td
								>
								<td class="text-right font-mono font-extrabold text-primary"
									>{computeleave.total.toFixed(3)}</td
								>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="text-base-content/60 mt-2 text-center text-xs italic">
					(Days exclusives Saturdays, Sundays and Holidays)
				</p>

				<div
					class="bg-success/20 border-success/30 alert mt-6 flex flex-col items-center justify-between border text-success-content shadow-sm sm:flex-row"
				>
					<div>
						<h3 class="text-lg font-bold text-success">Total Leave Benefits</h3>
						<div class="mt-1 font-mono text-xs opacity-80">
							₱ {money(hsr.hsr)} x {computeleave.total.toFixed(3)} x 0.0481927
						</div>
					</div>
					<div
						class="mt-2 font-mono text-3xl font-extrabold leading-none text-success drop-shadow-sm sm:mt-0"
					>
						₱ {money((parseFloat(hsr.hsr) * computeleave.total * 0.0481927).toFixed(2))}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
